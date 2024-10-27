<?php
// Include the database connection script
require_once 'db_connection.php';

$json_data = file_get_contents('php://input');

// Decode the JSON data into an associative array
$data = json_decode($json_data, true);

// Get the form data from the request
$email = $data['email'];
$password = $data['password'];

// Check if the user exists in the students table
$sql = "SELECT * FROM students WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Generate a token
        $token = bin2hex(random_bytes(16));
        
        // Store the token in the database
        $sql = "UPDATE students SET token = ? WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $token, $email);
        $stmt->execute();
        
        $response = ['success' => true, 'token' => $token, 'user_id' => $user['student_id']];
    } else {
        $response = ['success' => false, 'message' => 'Invalid credentials'];
    }
} else {
    // Check if the user exists in the mentors table
    $sql = "SELECT * FROM mentors WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Generate a token
            $token = bin2hex(random_bytes(16));
            
            // Store the token in the database
            $sql = "UPDATE mentors SET token = ? WHERE email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $token, $email);
            $stmt->execute();
            
            $response = ['success' => true, 'token' => $token, 'user_id' => $user['mentor_id']];
        } else {
            $response = ['success' => false, 'message' => 'Invalid credentials'];
        }
    } else {
        $response = ['success' => false, 'message' => 'User not found'];
    }
}

echo json_encode($response);
?>