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

// Check if mentor_id parameter exists
if (!isset($_GET['userId'])) {
    echo json_encode(["error" => "userId parameter is missing"]);
    exit;
}

$mentor_id = $_GET['userId'];

$query = "SELECT * FROM drafts WHERE mentor_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $mentor_id);
$stmt->execute();
$result = $stmt->get_result();
$drafts = [];

while ($row = $result->fetch_assoc()) {
    $drafts[] = $row;
}

echo json_encode($drafts);
?>
