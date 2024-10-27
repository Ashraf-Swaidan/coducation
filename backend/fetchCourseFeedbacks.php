<?php

include('db_connection.php'); // Include your database connection file

// Get course IDs from URL params
$courseIds = $_GET['courseIds'];

// Split the course IDs into an array
$courseIdArray = explode(',', $courseIds);

// Initialize an array to store feedbacks for each course
$feedbacks = [];

// Query to fetch feedbacks for each course
foreach ($courseIdArray as $courseId) {
    $query = "SELECT * FROM feedbacks WHERE course_id = $courseId";
    $result = mysqli_query($conn, $query);

    // Check if query executed successfully
    if ($result) {
        $courseFeedbacks = [];
        while ($row = mysqli_fetch_assoc($result)) {
            // Construct feedback object
            $feedback = array(
                "id" => $row['id'],
                "student_id" => $row['student_id'],
                "created_at" => $row['created_at'],
                "comment" => $row['comment']
            );
            // Add feedback object to the array for this course
            $courseFeedbacks[] = $feedback;
        }
        // Assign the feedbacks to the corresponding course ID
        $feedbacks[$courseId] = $courseFeedbacks;
    }
}

// Return feedbacks for each course as JSON
echo json_encode($feedbacks);

?>
