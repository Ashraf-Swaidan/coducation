
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

$courseId = $_GET['courseId'];
$userId = $_GET['userId'];


$courseNumStudentsQuery = "SELECT * FROM student_courses WHERE course_id = $courseId and student_id = $userId" ;
$courseNumStudentsResult = mysqli_query($conn, $courseNumStudentsQuery);

echo json_encode(mysqli_fetch_assoc($courseNumStudentsResult)
);
?>
