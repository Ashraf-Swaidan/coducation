<?php
require 'db_connection.php'; // Adjust path as necessary
$postData = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $courseId = $postData['courseId'] ?? null;
    $userId = $postData['userId'] ?? null;


    if ($courseId && $userId) {
        $sql = "DELETE FROM student_courses WHERE course_id = ? AND student_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $courseId, $userId);

        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to leave course']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid input']);
    }
}

$conn->close();
?>
