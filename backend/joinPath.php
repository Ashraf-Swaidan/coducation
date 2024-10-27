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

// Determine which table to use based on the user type
if ($userType === 'mentor') {
    $table = 'mentor_paths';
    $columnName = 'mentor_id';
} elseif ($userType === 'student') {
    $table = 'student_paths';
    $columnName = 'student_id';
} else {
    echo json_encode(["error" => "Invalid user type"]);
    exit;
}

// Prepare and execute the SQL query to insert the relationship
$query = "INSERT INTO $table ($columnName, path_id) VALUES (?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $userId, $pathId);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to join path"]);
}
?>
