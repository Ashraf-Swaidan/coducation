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

// Validate token
$token = trim(substr($headers['Authorization'], 7));

if (!validateToken($token, $conn)) {
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized"));
    exit();
}

// Get pathId and mentorId from URL params
$pathId = $_GET['pathId'];
$mentorId = $_GET['mentorId'];

// Fetch courses and their ratings
$queryCourses = "SELECT course_id, rating FROM courses WHERE path_id = $pathId AND mentor_id = $mentorId";
$resultCourses = mysqli_query($conn, $queryCourses);
$coursesData = [];
$totalRating = 0;
$totalCourses = 0;
while ($row = mysqli_fetch_assoc($resultCourses)) {
    $totalRating += $row['rating'];
    $totalCourses++;
    $coursesData[] = $row;
}

// Calculate average rating
$averageRating = ($totalCourses > 0) ? ($totalRating / $totalCourses) : 0;

// Fetch student enrollments for each course
$studentEnrollments = [];
foreach ($coursesData as $course) {
    $courseId = $course['course_id'];
    $queryEnrollments = "SELECT COUNT(*) AS enrollment_count FROM student_courses WHERE course_id = $courseId";
    $resultEnrollments = mysqli_query($conn, $queryEnrollments);
    $enrollmentData = mysqli_fetch_assoc($resultEnrollments);
    $studentEnrollments[$courseId] = $enrollmentData['enrollment_count'];
}

$queryCourses = "SELECT * FROM courses WHERE path_id = $pathId AND mentor_id = $mentorId";
$resultCourses = mysqli_query($conn, $queryCourses);
$courses = [];
while($row = mysqli_fetch_assoc($resultCourses)){
    $courses[] = $row;
}

// Combine all data into one array
$responseData = array(
    "averageRating" => $averageRating,
    "totalCourses" => $totalCourses,
    "studentEnrollments" => $studentEnrollments,
    "courses" => $courses
);

// Return data as JSON
http_response_code(200);
echo json_encode($responseData);
?>
