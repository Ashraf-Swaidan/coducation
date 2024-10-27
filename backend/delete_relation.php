<?php
// Include the database connection script
require_once 'db_connection.php';

$json_data = file_get_contents('php://input');

// Decode the JSON data into an associative array
$data = json_decode($json_data, true);

// Get the user ID and path ID from the request
$userId = $data['userId'];
$pathId = $data['pathId'];

// Check if the user is a mentor or a student
$userType = $data['userType'];

// Define the table name based on the user type
$tableName = ($userType === 'student') ? 'student_paths' : 'mentor_paths';

// Delete the row from the corresponding table
$query = "DELETE FROM $tableName WHERE ";
if ($userType === 'student') {
    $query .= "student_id = ? AND path_id = ?";
} else {
    $query .= "mentor_id = ? AND path_id = ?";
}

$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $userId, $pathId);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
