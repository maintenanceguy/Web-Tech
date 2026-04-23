<?php
session_start();

if (!isset($_SESSION['user'])) {
    header("Location: s_html.php");
    exit();
}

$user = $_SESSION['user'];
?>

<h2>Welcome, <?php echo $user; ?></h2>

<?php
if (isset($_COOKIE['last_login'])) {
    echo "Last login: " . $_COOKIE['last_login'];
}
?>

<br><br>
<a href="logout.php">Logout</a>