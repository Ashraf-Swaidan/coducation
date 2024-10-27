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

// Get user ID and other details from request body
$fullName = $_POST['fullName'];
$email = $_POST['email'];
$dateOfBirth = $_POST['dateOfBirth'];
$password = $_POST['password'];
$userId = $_POST['userId'];
$userType = $_POST['userType'];

$profilePicture = $_FILES['profilePicture'] ?? null;
$profilePictureName = '';

if ($profilePicture) {
    $uploadDir = 'uploads/pfps/';
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($profilePicture['type'], $allowedTypes)) {
        echo json_encode(["error" => "Invalid file type"]);
        exit;
    }

    $profilePictureName = uniqid() . '-' . basename($profilePicture['name']);
    $uploadFile = $uploadDir . $profilePictureName;

    if (!move_uploaded_file($profilePicture['tmp_name'], $uploadFile)) {
        echo json_encode(["error" => "Error uploading file"]);
        exit;
    }
}

// Update user profile based on user type
if ($userType === 'mentor') {
    $query = "UPDATE mentors SET full_name = '$fullName', email = '$email', date_of_birth = '$dateOfBirth'";
    if (!empty($password)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $query .= ", password = '$hashedPassword'";
    }
    if ($profilePicture) {
        $query .= ", profile_picture = '$profilePictureName'";
    }
    $query .= " WHERE mentor_id = $userId";
} elseif ($userType === 'student') {
    $query = "UPDATE students SET full_name = '$fullName', email = '$email', date_of_birth = '$dateOfBirth'";
    if (!empty($password)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $query .= ", password = '$hashedPassword'";
    }
    if ($profilePicture) {
        $query .= ", profile_picture = '$profilePictureName'";
    }
    $query .= " WHERE student_id = $userId";
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Invalid user type"));
    exit();
}

// Execute the update query
if (mysqli_query($conn, $query)) {
    http_response_code(200);
    echo json_encode(array("message" => "User profile updated successfully"));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Error updating user profile"));
}
?>
