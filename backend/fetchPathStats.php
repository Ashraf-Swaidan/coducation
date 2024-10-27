<?php
include('db_connection.php');

// Get path ID from request
$pathId = $_GET['pathId'];

// Fetch number of students
$queryStudents = "SELECT COUNT(*) AS numStudents FROM student_paths WHERE path_id = ?";
$stmtStudents = $conn->prepare($queryStudents);
$stmtStudents->bind_param("i", $pathId);
$stmtStudents->execute();
$resultStudents = $stmtStudents->get_result();
$rowStudents = $resultStudents->fetch_assoc();
$numStudents = $rowStudents['numStudents'];

// Fetch number of mentors
$queryMentors = "SELECT COUNT(*) AS numMentors FROM mentor_paths WHERE path_id = ?";
$stmtMentors = $conn->prepare($queryMentors);
$stmtMentors->bind_param("i", $pathId);
$stmtMentors->execute();
$resultMentors = $stmtMentors->get_result();
$rowMentors = $resultMentors->fetch_assoc();
$numMentors = $rowMentors['numMentors'];

// Fetch number of courses
$queryCourses = "SELECT COUNT(*) AS numCourses FROM courses WHERE path_id = ?";
$stmtCourses = $conn->prepare($queryCourses);
$stmtCourses->bind_param("i", $pathId);
$stmtCourses->execute();
$resultCourses = $stmtCourses->get_result();
$rowCourses = $resultCourses->fetch_assoc();
$numCourses = $rowCourses['numCourses'];

// Combine the data
$pathStats = [
    'numStudents' => $numStudents,
    'numMentors' => $numMentors,
    'numCourses' => $numCourses
];

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($pathStats);
?>
