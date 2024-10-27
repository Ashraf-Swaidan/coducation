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

if (isset($_GET['draftId'])) {
    // Sanitize the draftId parameter to prevent SQL injection
    $draftId = intval($_GET['draftId']); // Convert to int to sanitize
    
    // Prepare and execute the SQL query to fetch draft data based on draft ID
    $query = "SELECT * FROM drafts WHERE draft_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $draftId);
    $stmt->execute();
    $result = $stmt->get_result();
    $draftData = $result->fetch_assoc();

    if ($draftData) {
        // Fetch prerequisites
        $query = "SELECT * FROM draft_prerequisites WHERE draft_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $draftId);
        $stmt->execute();
        $result = $stmt->get_result();
        $prerequisites = $result->fetch_all(MYSQLI_ASSOC);

        // Fetch modules, lessons, and sections
        $query = "SELECT * FROM draft_modules WHERE draft_id = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $draftId);
        $stmt->execute();
        $result = $stmt->get_result();
        $modules = $result->fetch_all(MYSQLI_ASSOC);

        foreach ($modules as &$module) {
            $moduleId = $module['module_id'];

            // Fetch lessons for the module
            $query = "SELECT * FROM draft_lessons WHERE module_id = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $moduleId);
            $stmt->execute();
            $result = $stmt->get_result();
            $lessons = $result->fetch_all(MYSQLI_ASSOC);

            foreach ($lessons as &$lesson) {
                $lessonId = $lesson['lesson_id'];

                // Fetch sections for the lesson
                $query = "SELECT * FROM draft_sections WHERE lesson_id = ?";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("i", $lessonId);
                $stmt->execute();
                $result = $stmt->get_result();
                $sections = $result->fetch_all(MYSQLI_ASSOC);

                $lesson['sections'] = $sections;
            }

            $module['lessons'] = $lessons;
        }

        // Combine all data into a single response array
        $response = [
            'draft' => $draftData,
            'prerequisites' => $prerequisites,
            'modules' => $modules
        ];

        // Return the combined data as a JSON response
        echo json_encode($response);
    } else {
        // If draft data is not found, return a 404 error response
        http_response_code(404);
        echo json_encode(["message" => "Draft not found."]);
    }
} else {
    // If draftId parameter is not set, return a 400 Bad Request response
    http_response_code(400);
    echo json_encode(["message" => "Missing draftId parameter."]);
}
?>
