<?php
// Include the database connection script
require_once 'db_connection.php';

$json_data = file_get_contents('php://input');

// Decode the JSON data into an associative array
$data = json_decode($json_data, true);

// Get the user ID and path ID from the request
$userId = $data['userId'];
$pathId = $data['pathId'];

// Check if the user is joined in the path as a student
$queryStudent = "SELECT * FROM student_paths WHERE student_id = ? AND path_id = ?";
$stmtStudent = $conn->prepare($queryStudent);
$stmtStudent->bind_param("ii", $userId, $pathId);
$stmtStudent->execute();
$resultStudent = $stmtStudent->get_result();

// Check if the user is joined in the path as a mentor
$queryMentor = "SELECT * FROM mentor_paths WHERE mentor_id = ? AND path_id = ?";
$stmtMentor = $conn->prepare($queryMentor);
$stmtMentor->bind_param("ii", $userId, $pathId);
$stmtMentor->execute();
$resultMentor = $stmtMentor->get_result();

// Check if the user is joined in the path
if ($resultStudent->num_rows > 0 || $resultMentor->num_rows > 0) {
    echo json_encode(["joined" => true]);
} else {
    echo json_encode(["joined" => false]);
}
?>