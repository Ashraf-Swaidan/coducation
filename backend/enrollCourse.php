<?php
require 'db_connection.php'; // Adjust path as necessary

$postData = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $courseId = $postData['courseId'] ?? null;
    $userId = $postData['userId'] ?? null;

    if ($courseId && $userId) {
        $sql = "INSERT INTO student_courses (course_id, student_id) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $courseId, $userId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to enroll']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid input']);
    }
}

$conn->close();
?>
