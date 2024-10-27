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

// Handle file uploads
$courseImage = $_FILES['image'];
$courseSubImage = $_FILES['subImage'];

$imagePath = '';
$subImagePath = '';

if ($courseImage['error'] === UPLOAD_ERR_OK) {
    $imagePath = 'uploads/course_drafts/' . basename($courseImage['name']);
    move_uploaded_file($courseImage['tmp_name'], $imagePath);
}

if ($courseSubImage['error'] === UPLOAD_ERR_OK) {
    $subImagePath = 'uploads/course_drafts/' . basename($courseSubImage['name']);
    move_uploaded_file($courseSubImage['tmp_name'], $subImagePath);
}

$data = json_decode($_POST['data'], true);

$draft_id = $data['draft_id'];
$courseData = $data['courseData'];
$prerequisites = $data['prerequisites'];
$totalMods = $data['modules'];

$title = $courseData['title'];
$description = $courseData['description'];
$mentor_id = $courseData['mentor_id'];

// Update course draft
$query = "UPDATE course_drafts SET title = ?, description = ?, image = ?, subImage = ? WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("sssii", $title, $description, $imagePath, $subImagePath, $draft_id);
$stmt->execute();

// Clear existing draft prerequisites
$query = "DELETE FROM draft_prerequisites WHERE draft_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $draft_id);
$stmt->execute();

// Insert new prerequisites
foreach ($prerequisites as $pre) {
    $title = $pre['title'];
    $description = $pre['description'];
    $query = "INSERT INTO draft_prerequisites (draft_id, title, description) VALUES (?, ?, ?)";
    $stmt->prepare($query);
    $stmt->bind_param("iss", $draft_id, $title, $description);
    $stmt->execute();
}

// Clear existing modules, lessons, and sections
$query = "DELETE FROM draft_sections WHERE lesson_id IN (SELECT id FROM draft_lessons WHERE module_id IN (SELECT id FROM draft_modules WHERE draft_id = ?))";
$stmt->prepare($query);
$stmt->bind_param("i", $draft_id);
$stmt->execute();

$query = "DELETE FROM draft_lessons WHERE module_id IN (SELECT id FROM draft_modules WHERE draft_id = ?)";
$stmt->prepare($query);
$stmt->bind_param("i", $draft_id);
$stmt->execute();

$query = "DELETE FROM draft_modules WHERE draft_id = ?";
$stmt->prepare($query);
$stmt->bind_param("i", $draft_id);
$stmt->execute();

// Insert new modules, lessons, and sections
foreach ($totalMods as $mod) {
    $moduleTitle = $mod['title'];
    $query = "INSERT INTO draft_modules (draft_id, title) VALUES (?, ?)";
    $stmt->prepare($query);
    $stmt->bind_param("is", $draft_id, $moduleTitle);
    $stmt->execute();
    $module_id = $stmt->insert_id;

    foreach ($mod['lessons'] as $lesson) {
        $lessonTitle = $lesson['title'];
        $query = "INSERT INTO draft_lessons (module_id, title) VALUES (?, ?)";
        $stmt->prepare($query);
        $stmt->bind_param("is", $module_id, $lessonTitle);
        $stmt->execute();
        $lesson_id = $stmt->insert_id;

        foreach ($lesson['sections'] as $section) {
            $sectionTitle = $section['title'];
            $sectionType = $section['type'];
            $sectionContent = $section['content'];
            if ($section['type'] === 'video') {
                $videoFile = $_FILES['videoFile']; // Assuming you have a form field for uploading the video file

                if ($videoFile['error'] === UPLOAD_ERR_OK) {
                    $videoFileName = uniqid() . '-' . basename($videoFile['name']);
                    move_uploaded_file($videoFile['tmp_name'], 'uploads/videos/' . $videoFileName);

                    // Update the video URL in the $section array
                    $section['video_url'] = 'uploads/videos/' . $videoFileName;
                }
            }

                    $sectionVideoUrl = isset($section['video_url']) ? $section['video_url'] : null; // Get the video URL if available
                    $query = "INSERT INTO draft_sections (lesson_id, title, type, content, video_url) VALUES (?, ?, ?, ?, ?)";
                    $stmt = $conn->prepare($query);
                    $stmt->bind_param("issss", $lesson_id, $sectionTitle, $sectionType, $sectionContent, $sectionVideoUrl);
                    $stmt->execute();
        }
    }
}

echo json_encode(["message" => "Draft updated successfully"]);
?>
