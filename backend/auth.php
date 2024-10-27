<?php
function validateToken($token, $conn) {
    // Query the database to check if the token exists and belongs to a registered user

    $sql = "SELECT * FROM students WHERE token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        return true;
    } else {
        // Check mentors table as well
        $sql = "SELECT * FROM mentors WHERE token = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            return true;
        } else {
            return false;
        }
    }
}

?>