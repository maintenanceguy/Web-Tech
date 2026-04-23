<?php
session_start();
include "db.php";

$email = $_POST['username']; // using same form
$password = md5($_POST['password']);

$sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) == 1) {

    $row = mysqli_fetch_assoc($result);

    $_SESSION['user'] = $row['name'];

    // COOKIE (store email for next time)
    setcookie("user_email", $email, time() + 3600);

    // COOKIE (last login time)
    setcookie("last_login", date("Y-m-d H:i:s"), time() + 3600);

    header("Location: dashboard.php");
    exit();

} else {
    echo "Invalid login";
}
?>