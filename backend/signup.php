<?php
// Include the database connection script
require_once 'db_connection.php';

$json_data = file_get_contents('php://input');

// Decode the JSON data into an associative array
$data = json_decode($json_data, true);

// Get the form data from the request
$fullName = $data['fullName'];
$email = $data['email'];
$password = $data['password'];
$dateOfBirth = $data['dateOfBirth'];
$accountType = $data['accountType'];

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert the user data into the appropriate table based on the account type
if ($accountType === 'student') {
    $sql = "INSERT INTO students (full_name, email, password, date_of_birth) VALUES (?, ?, ?, ?)";
} else {
    $sql = "INSERT INTO mentors (full_name, email, password, date_of_birth) VALUES (?, ?, ?, ?)";
}

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $fullName, $email, $hashedPassword, $dateOfBirth);

if ($stmt->execute()) {
    $response = ['success' => true, 'message' => 'User registered successfully'];
} else {
    $response = ['success' => false, 'message' => 'Error registering user'];
}

echo json_encode($response);
?>