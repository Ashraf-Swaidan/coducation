<?php
// Include the database connection script
require_once 'db_connection.php';

// Get the token from the request headers
$headers = getallheaders();

// Remove the "Bearer " prefix from the token
if (!array_key_exists('Authorization', $headers)) {
    echo json_encode(["error" => "Authorization header is missing"]);
    exit;
}

if (substr($headers['Authorization'], 0, 7) !== 'Bearer ') {
    echo json_encode(["error" => "Bearer keyword is missing"]);
    exit;
}

$token = trim(substr($headers['Authorization'], 7));
if (!empty($token)) {
    // Check if the token exists in the students table
    $sql = "SELECT * FROM students WHERE token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        $response = [
            'success' => true,
            'fullName' => $user['full_name'],
            'userType' => 'student',
            'userId' => $user['student_id']
        ];
    } else {
        // Check if the token exists in the mentors table
        $sql = "SELECT * FROM mentors WHERE token = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            $response = [
                'success' => true,
                'fullName' => $user['full_name'],
                'userType' => 'mentor',
                'userId' => $user['mentor_id']
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'User not found'
            ];
        }
    }
} else {
    $response = [
        'success' => false,
        'message' => 'Token not provided',
        'tokenRec' => $token
    ];
}

echo json_encode($response);
?>
