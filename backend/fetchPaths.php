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

// Fetch paths from database
$query = "SELECT * FROM paths";
$result = mysqli_query($conn, $query);

if (!$result) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error"));
    exit();
}

$paths = array();
while ($row = mysqli_fetch_assoc($result)) {
    $paths[] = $row;
}

// Return paths as JSON
http_response_code(200);
echo json_encode($paths);
?>
