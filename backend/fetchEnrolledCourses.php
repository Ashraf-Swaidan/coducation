
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

$userId = $_GET['userId'];

// Fetch all course_ids where student_id equals userId
$query = "SELECT course_id FROM student_courses WHERE student_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$courseIds = [];
while ($row = $result->fetch_assoc()) {
    $courseIds[] = $row['course_id'];
}

if (empty($courseIds)) {
    echo json_encode([]);
    exit;
}

$courseIdList = implode(',', $courseIds);

// Fetch mentor_id and full_name for each course
$query = "
    SELECT 
        c.course_id, 
        c.mentor_id, 
        m.full_name, 
        title,
        rating,
        image_1,
        path_id,
        (SELECT COUNT(*) FROM student_courses sc WHERE sc.course_id = c.course_id) AS num_students 
    FROM 
        courses c 
    JOIN 
        mentors m 
    ON 
        c.mentor_id = m.mentor_id 
    WHERE 
        c.course_id IN ($courseIdList)";

$result = mysqli_query($conn, $query);

$enrolledCourses = [];
while ($row = mysqli_fetch_assoc($result)) {
    $enrolledCourses[] = [
        'course_id' => $row['course_id'],
        'courseImg' => $row['image_1'],
        'title' => $row['title'],
        'rating' => $row['rating'],
        'mentor_id' => $row['mentor_id'],
        'path_id' => $row['path_id'],
        'mentor_name' => $row['full_name'],
        'num_students' => $row['num_students']
    ];
}

// Return the enrolled courses details as JSON
header('Content-Type: application/json');
echo json_encode($enrolledCourses);
?>
