<?php
include('db_connection.php');
include('auth.php');

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
    echo json_encode(["message" => "Unauthorized"]);
    exit();
}

// Check if draft_id is provided
if (!isset($_GET['draft_id'])) {
    echo json_encode(["error" => "Draft ID is missing"]);
    exit;
}

$draft_id = $_GET['draft_id'];

// Delete draft from the database
$query = "DELETE FROM drafts WHERE draft_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $draft_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Draft deleted successfully"]);
} else {
    echo json_encode(["error" => "Failed to delete draft"]);
}

?>
