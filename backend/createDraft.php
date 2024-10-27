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


// Handle file uploads for course image
$imageName = '';
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imageName = uniqid() . '-' . basename($_FILES['image']['name']);
    move_uploaded_file($_FILES['image']['tmp_name'], 'uploads/course_drafts/' . $imageName);
}

// Handle file uploads for course sub image
$subImageName = '';
if (isset($_FILES['subImage']) && $_FILES['subImage']['error'] === UPLOAD_ERR_OK) {
    $subImageName = uniqid() . '-' . basename($_FILES['subImage']['name']);
    move_uploaded_file($_FILES['subImage']['tmp_name'], 'uploads/course_drafts/' . $subImageName);
}

$courseData = json_decode($_POST['courseData'], true);
$prerequisites = json_decode($_POST['prerequisites'], true);
$totalMods = json_decode($_POST['totalMods'], true);

$title = $courseData['title'];
$description = $courseData['description'];
$mentor_id = $courseData['userId'];
$path_id = $courseData['pathId']; // Assuming path_id is provided in courseData

// Insert into drafts table
$query = "INSERT INTO drafts (title, description, image_1, image_2, path_id, mentor_id) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssssii", $title, $description, $imageName, $subImageName, $path_id, $mentor_id);
$stmt->execute();
$draft_id = $stmt->insert_id;

// Insert prerequisites
foreach ($prerequisites as $pre) {
    $title = $pre['title'];
    $description = $pre['description'];
    $query = "INSERT INTO draft_prerequisites (draft_id, title, description) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iss", $draft_id, $title, $description);
    $stmt->execute();
}

// Insert modules, lessons, and sections
foreach ($totalMods as $mod) {
    $moduleTitle = $mod['title'];
    $query = "INSERT INTO draft_modules (draft_id, title) VALUES (?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("is", $draft_id, $moduleTitle);
    $stmt->execute();
    $module_id = $stmt->insert_id;

    foreach ($mod['lessons'] as $lesson) {
        $lessonTitle = $lesson['title'];
        $query = "INSERT INTO draft_lessons (module_id, title, draft_id) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("isi", $module_id, $lessonTitle, $draft_id);
        $stmt->execute();
        $lesson_id = $stmt->insert_id;

        foreach ($lesson['sections'] as $section) {
            $sectionTitle = $section['title'];
            $sectionType = $section['type'];
            $sectionContent = $section['content'];
            
            // Handle file upload for video
            $videoFileName = '';
            $videoFileKey = 'videoFile_' . $section['section_id'];
            if (isset($_FILES[$videoFileKey]) && $_FILES[$videoFileKey]['error'] === UPLOAD_ERR_OK) {
                $videoFileName = uniqid() . '-' . basename($_FILES[$videoFileKey]['name']);
                move_uploaded_file($_FILES[$videoFileKey]['tmp_name'], 'uploads/course_drafts/' . $videoFileName);
            }
            
            $query = "INSERT INTO draft_sections (lesson_id, title, type, content, video_url, module_id, draft_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("isssssi", $lesson_id, $sectionTitle, $sectionType, $sectionContent, $videoFileName, $module_id, $draft_id);
            $stmt->execute();
        }
    }
}

var_dump($_FILES); // or print_r($_FILES);


echo json_encode(["message" => "Draft created successfully"]);
?>
