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

$mentorIds = $_GET['mentorIds'];

// Split the mentor IDs into an array
$mentorIdArray = explode(',', $mentorIds);

// Initialize an array to store mentor details
$mentors = array();

// Query to fetch mentor details based on IDs
$query = "SELECT mentor_id, full_name FROM mentors WHERE mentor_id IN (" . implode(',', $mentorIdArray) . ")";
$result = mysqli_query($conn, $query);

// Check if query executed successfully
if ($result) {
    // Loop through the results and store mentor details in the $mentors array
    while ($row = mysqli_fetch_assoc($result)) {
        $mentors[$row['mentor_id']] = array(
            'fullName' => $row['full_name']
        );
    }
}

// Return mentor details as JSON
header('Content-Type: application/json');
echo json_encode($mentors);

?>