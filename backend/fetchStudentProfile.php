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

// Get student ID from URL params
$studentId = $_GET['userId'];

// Fetch student profile from database
$query = "SELECT * FROM students WHERE student_id = $studentId";
$result = mysqli_query($conn, $query);

if (!$result) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error"));
    exit();
}

$studentData = mysqli_fetch_assoc($result);

// Fetch student's enrolled courses
$queryCourses = "SELECT c.* FROM courses c JOIN student_courses sc ON c.course_id = sc.course_id WHERE sc.student_id = $studentId";
$resultCourses = mysqli_query($conn, $queryCourses);
$courses = [];
while ($row = mysqli_fetch_assoc($resultCourses)) {
    $courses[] = $row;
}

// Combine student data with enrolled courses
$responseData = array(
    "studentData" => $studentData,
    "courses" => $courses
);

// Return data as JSON
http_response_code(200);
echo json_encode($responseData);
?>
