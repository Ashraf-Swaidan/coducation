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

$courseId = $_GET['courseId'];

$modulesQuery = "
    SELECT * FROM modules WHERE course_id = $courseId
";

$modulesResult = $conn->query($modulesQuery);
$modules = [];

while ($module = $modulesResult->fetch_assoc()) {
    $moduleId = $module['module_id'];

    $lessonsQuery = "
        SELECT * FROM lessons WHERE module_id = $moduleId
    ";

    $lessonsResult = $conn->query($lessonsQuery);
    $lessons = [];

    while ($lesson = $lessonsResult->fetch_assoc()) {
        $lessonId = $lesson['lesson_id'];

        $sectionsQuery = "
            SELECT * FROM sections WHERE lesson_id = $lessonId
        ";

        $sectionsResult = $conn->query($sectionsQuery);
        $sections = [];

        while ($section = $sectionsResult->fetch_assoc()) {
            $sections[] = $section;
        }

        $lesson['sections'] = $sections;
        $lessons[] = $lesson;
    }

    $module['lessons'] = $lessons;
    $modules[] = $module;
}

echo json_encode($modules);
?>
