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

// Get pathId from URL params
$pathId = $_GET['pathId'];

// Fetch path details from database
$query = "SELECT * FROM paths WHERE path_id = $pathId";
$result = mysqli_query($conn, $query);

if (!$result) {
    http_response_code(500);
    echo json_encode(array("message" => "Internal Server Error"));
    exit();
}

$pathData = mysqli_fetch_assoc($result);

// Fetch related data from other tables
// Benefits
$queryBenefits = "SELECT * FROM benefits WHERE path_id = $pathId";
$resultBenefits = mysqli_query($conn, $queryBenefits);
$benefits = [];
while($row = mysqli_fetch_assoc($resultBenefits)){
    $benefits[] = $row;
}

// Objectives
$queryObjectives = "SELECT * FROM objectives WHERE path_id = $pathId";
$resultObjectives = mysqli_query($conn, $queryObjectives);
$objectives = [];
while ($row = mysqli_fetch_assoc($resultObjectives)) {
    $objectives[] = $row;
}

$queryChallenges = "SELECT * FROM challenges WHERE path_id = $pathId";
$resultChallenges = mysqli_query($conn, $queryChallenges);
$challenges = [];
while ($row = mysqli_fetch_assoc($resultChallenges)) {
    $challenges[] = $row;
}

// Curriculum
$queryCurriculum = "SELECT * FROM curriculum WHERE path_id = $pathId";
$resultCurriculum = mysqli_query($conn, $queryCurriculum);
$curriculum = [];
while ($row = mysqli_fetch_assoc($resultCurriculum)) {
    $curriculum[] = $row;
}

// Key Features
$queryKeyFeatures = "SELECT * FROM key_features WHERE path_id = $pathId";
$resultKeyFeatures = mysqli_query($conn, $queryKeyFeatures);
$keyFeatures = [];
while ($row = mysqli_fetch_assoc($resultKeyFeatures)) {
    $keyFeatures[] = $row;
}

$queryCourses = "SELECT * FROM courses WHERE path_id = $pathId";
$resultCourses = mysqli_query($conn, $queryCourses);
$courses = [];
while($row = mysqli_fetch_assoc($resultCourses)){
    $courses[] = $row;
}



// Combine all data into one array
$responseData = array(
    "pathHeader" => $pathData,
    "benefits" => $benefits,
    "objectives" => $objectives,
    "challenges" => $challenges,
    "curriculum" => $curriculum,
    "keyFeatures" => $keyFeatures,
    "courses" => $courses
);

// Return data as JSON
http_response_code(200);
echo json_encode($responseData);
?>
