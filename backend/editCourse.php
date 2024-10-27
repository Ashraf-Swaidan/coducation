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
    echo json_encode(array("message" => "Unauthorized"));
    exit();
}

// Get POST data
$courseId = $_POST['courseId'];
$title = $_POST['title'];
$description = $_POST['description'];
$image1 = $_FILES['image_1'];
$image2 = $_FILES['image_2'];
$userId = $_POST['userId'];
$pathId = $_POST['pathId'];
$modules = json_decode($_POST['modules'], true);
$prerequisites = json_decode($_POST['prerequisites'], true);

// Update course details
$updateCourseQuery = "
    UPDATE courses SET 
        title = ?, 
        description = ?, 
        image_1 = ?, 
        image_2 = ? 
    WHERE course_id = ?
";

$stmt = $conn->prepare($updateCourseQuery);
$stmt->bind_param('ssssi', $title, $description, $image1['name'], $image2['name'], $courseId);
$stmt->execute();
$stmt->close();

// Update modules, lessons, and sections
foreach ($modules as $module) {
    $moduleId = $module['module_id'];
    $updateModuleQuery = "
        UPDATE modules SET 
            title = ? 
        WHERE module_id = ?
    ";

    $stmt = $conn->prepare($updateModuleQuery);
    $stmt->bind_param('si', $module['title'], $moduleId);
    $stmt->execute();
    $stmt->close();

    foreach ($module['lessons'] as $lesson) {
        $lessonId = $lesson['lesson_id'];
        $updateLessonQuery = "
            UPDATE lessons SET 
                title = ?
            WHERE lesson_id = ?
        ";

        $stmt = $conn->prepare($updateLessonQuery);
        $stmt->bind_param('si', $lesson['title'], $lessonId);
        $stmt->execute();
        $stmt->close();

        foreach ($lesson['sections'] as $section) {
            $sectionId = $section['section_id'];
            $updateSectionQuery = "
                UPDATE sections SET 
                    title = ?, 
                    content = ?, 
                    type = ? 
                WHERE section_id = ?
            ";

            $stmt = $conn->prepare($updateSectionQuery);
            $stmt->bind_param('sssi', $section['title'], $section['content'], $section['type'], $sectionId);
            $stmt->execute();
            $stmt->close();
        }
    }
}

// Update prerequisites
foreach ($prerequisites as $prerequisite) {
    $prerequisiteId = $prerequisite['prerequisites_id'];
    $updatePrerequisiteQuery = "
        UPDATE prerequisites SET 
            title = ?, 
            description = ? 
        WHERE prerequisites_id = ?
    ";

    $stmt = $conn->prepare($updatePrerequisiteQuery);
    $stmt->bind_param('ssi', $prerequisite['title'], $prerequisite['description'], $prerequisiteId);
    $stmt->execute();
    $stmt->close();
}

echo json_encode(["message" => "Course updated successfully"]);
?>
