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
    exit;
}

$courseId = intval($_GET['courseId']);

$courseDetailsQuery = "
    SELECT *, CAST(course_id AS UNSIGNED) AS course_id FROM courses WHERE course_id = $courseId
";

$courseDetailsResult = $conn->query($courseDetailsQuery);
$course = $courseDetailsResult->fetch_assoc();

$courseNumStudentsQuery = "SELECT COUNT(*) AS num_students FROM student_courses WHERE course_id = $courseId";
$courseNumStudentsResult = mysqli_query($conn, $courseNumStudentsQuery);

$modulesQuery = "
    SELECT *, CAST(module_id AS UNSIGNED) AS module_id, CAST(course_id AS UNSIGNED) AS course_id FROM modules WHERE course_id = $courseId
";

$modulesResult = $conn->query($modulesQuery);
$modules = [];

while ($module = $modulesResult->fetch_assoc()) {
    $moduleId = intval($module['module_id']);

    $lessonsQuery = "
        SELECT *, CAST(lesson_id AS UNSIGNED) AS lesson_id, CAST(module_id AS UNSIGNED) AS module_id, CAST(course_id AS UNSIGNED) AS course_id FROM lessons WHERE module_id = $moduleId
    ";

    $lessonsResult = $conn->query($lessonsQuery);
    $lessons = [];

    while ($lesson = $lessonsResult->fetch_assoc()) {
        $lessonId = intval($lesson['lesson_id']);

        $sectionsQuery = "
            SELECT *, CAST(section_id AS UNSIGNED) AS section_id, CAST(lesson_id AS UNSIGNED) AS lesson_id, CAST(module_id AS UNSIGNED) AS module_id, CAST(course_id AS UNSIGNED) AS course_id FROM sections WHERE lesson_id = $lessonId
        ";

        $sectionsResult = $conn->query($sectionsQuery);
        $sections = [];

        while ($section = $sectionsResult->fetch_assoc()) {
            $section['section_id'] = intval($section['section_id']);
            $section['lesson_id'] = intval($section['lesson_id']);
            $section['module_id'] = intval($section['module_id']);
            $section['course_id'] = intval($section['course_id']);
            $sections[] = $section;
        }

        $lesson['lesson_id'] = $lessonId;
        $lesson['module_id'] = intval($lesson['module_id']);
        $lesson['course_id'] = intval($lesson['course_id']);
        $lesson['sections'] = $sections;
        $lessons[] = $lesson;
    }

    $module['module_id'] = $moduleId;
    $module['course_id'] = intval($module['course_id']);
    $module['lessons'] = $lessons;
    $modules[] = $module;
}

$course['modules'] = $modules;
$course['numStudents'] = intval(mysqli_fetch_assoc($courseNumStudentsResult)['num_students']);

echo json_encode($course);
?>
