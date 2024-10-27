
<?php
include 'db_connection.php';
include 'auth.php';
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);
$token = $data['token'];

if (validateToken($token, $conn)) {
    $response = ['valid' => true];
} else {
    $response = ['valid' => false];
}

echo json_encode($response);

?>

