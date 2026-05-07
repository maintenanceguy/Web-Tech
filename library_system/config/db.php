<?php
// config/db.php - Database Connection (Procedural MySQL)

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'university_library');

function getConnection() {
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if (!$conn) {
        die(json_encode([
            'success' => false,
            'message' => 'Database connection failed: ' . mysqli_connect_error()
        ]));
    }

    return $conn;
}
