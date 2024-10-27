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

// Get mentor ID from URL params
$mentorId = $_GET['userId'];

// Fetch mentor profile from database
$query = "SELECT * FROM mentors WHERE mentor_id = $mentorId";
$result = mysqli_query($conn, $query);

if (!$result) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error"));
    exit();
}

$mentorData = mysqli_fetch_assoc($result);

// Fetch mentor's courses
$queryCourses = "SELECT * FROM courses WHERE mentor_id = $mentorId";
$resultCourses = mysqli_query($conn, $queryCourses);
$courses = [];
while ($row = mysqli_fetch_assoc($resultCourses)) {
    $courses[] = $row;
}

// Combine mentor data with courses
$responseData = array(
    "mentorData" => $mentorData,
    "courses" => $courses
);

// Return data as JSON
http_response_code(200);
echo json_encode($responseData);
?>
