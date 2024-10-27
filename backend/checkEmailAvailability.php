<?php

// Include the database connection file
include_once 'db_connection.php';

// Get the JSON data sent in the request body
$json_data = file_get_contents('php://input');

// Decode the JSON data into an associative array
$data = json_decode($json_data, true);

// Check if data is not empty
if (!empty($data) && isset($data['email'])) {
    // Extract email from the decoded data
    $email = $data['email'];

    // Prepare and execute the SQL query to check if email exists in students table
    $stmt_students = $conn->prepare("SELECT COUNT(*) FROM students WHERE email = ?");
    $stmt_students->bind_param("s", $email);
    $stmt_students->execute();
    $stmt_students->bind_result($count_students);
    $stmt_students->fetch();
    $stmt_students->close();

    // Prepare and execute the SQL query to check if email exists in mentors table
    $stmt_mentors = $conn->prepare("SELECT COUNT(*) FROM mentors WHERE email = ?");
    $stmt_mentors->bind_param("s", $email);
    $stmt_mentors->execute();
    $stmt_mentors->bind_result($count_mentors);
    $stmt_mentors->fetch();
    $stmt_mentors->close();

    // Check if email exists in either students or mentors table
    $email_available = ($count_students === 0 && $count_mentors === 0);

    // Return JSON response indicating email availability
    $response = array('available' => $email_available);
    echo json_encode($response);
} else {
    // No email provided
    $response = array('error' => 'No email provided');
    echo json_encode($response);
}

?>
