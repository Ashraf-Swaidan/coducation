<?php
include ('db_connection.php');
include ('auth.php');

$headers = getallheaders();
if (!array_key_exists('Authorization', $headers)) {
    echo json_encode(["error" => "Authorization header is missing"]);
    exit;
}

if (substr($headers['Authorization'], 0, 7) !== 'Bearer ') {
    echo json_encode(["error" => "Bearer keyword is missing"]);
    exit;
}

$token = trim(substr($headers['Authorization'], 7));

if (!validateToken($token, $conn)) {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized"));
    exit();
}

$mentorIds = $_GET['mentorIds'];
$mentorIdArray = explode(',', $mentorIds);
$mentors = array();

$query = "SELECT mentor_id, full_name, profile_picture FROM mentors WHERE mentor_id IN (" . implode(',', $mentorIdArray) . ")";
$result = mysqli_query($conn, $query);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $mentors[$row['mentor_id']] = array(
            'fullName' => $row['full_name'],
            'profilePicture' => $row['profile_picture']
        );
    }
}

foreach ($mentorIdArray as $mentorId) {
    // Fetch courses created by the mentor
    $queryCourses = "SELECT title FROM courses WHERE mentor_id = $mentorId";
    $resultCourses = mysqli_query($conn, $queryCourses);
    $courses = array();

    if ($resultCourses) {
        while ($row = mysqli_fetch_assoc($resultCourses)) {
            $courses[] = $row['title'];
        }
    }
    $mentors[$mentorId]['coursesCreated'] = $courses;

    // Fetch the number of students taught by the mentor
    $queryStudents = "SELECT COUNT(*) AS num_students FROM student_courses WHERE course_id IN (SELECT course_id FROM courses WHERE mentor_id = $mentorId)";
    $resultStudents = mysqli_query($conn, $queryStudents);
    $numStudents = 0;

    if ($resultStudents) {
        $row = mysqli_fetch_assoc($resultStudents);
        $numStudents = $row['num_students'];
    }
    $mentors[$mentorId]['studentsTaught'] = $numStudents;

    // Fetch paths joined by the mentor
    $queryPaths = "SELECT path_id FROM mentor_paths WHERE mentor_id = $mentorId";
    $resultPaths = mysqli_query($conn, $queryPaths);
    $paths = array();

    if ($resultPaths) {
        while ($row = mysqli_fetch_assoc($resultPaths)) {
            $paths[] = $row['path_id'];
        }
    }
    $mentors[$mentorId]['pathsJoined'] = $paths;
}

header('Content-Type: application/json');
echo json_encode($mentors);
?>
