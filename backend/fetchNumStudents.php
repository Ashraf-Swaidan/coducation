<?php

include('db_connection.php'); // Include your database connection file

// Get course IDs from URL params
$courseIds = $_GET['courseIds'];

// Split the course IDs into an array
$courseIdArray = explode(',', $courseIds);

// Initialize an array to store the number of students enrolled for each course
$numStudents = array();

// Query to count the number of students enrolled in each course
foreach ($courseIdArray as $courseId) {
    $query = "SELECT COUNT(*) AS num_students FROM student_courses WHERE course_id = $courseId";
    $result = mysqli_query($conn, $query);

    // Check if query executed successfully
    if ($result) {
        // Fetch the number of students enrolled for the current course
        $row = mysqli_fetch_assoc($result);
        $numStudents[$courseId] = $row['num_students'];
    }
}

// Return the number of students enrolled for each course as JSON
echo json_encode($numStudents);

?>