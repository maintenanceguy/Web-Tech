<?php
// models/BookModel.php - Model Layer (All DB operations)

require_once __DIR__ . '/../config/db.php';

// ─── GET ALL BOOKS ────────────────────────────────────────────────────────────
function getAllBooks() {
    $conn = getConnection();
    $result = mysqli_query($conn, "SELECT * FROM books ORDER BY created_at DESC");

    $books = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $books[] = $row;
    }

    mysqli_close($conn);
    return $books;
}

// ─── GET SINGLE BOOK BY ID ────────────────────────────────────────────────────
function getBookById($id) {
    $conn = getConnection();
    $id   = mysqli_real_escape_string($conn, $id);

    $result = mysqli_query($conn, "SELECT * FROM books WHERE id = '$id' LIMIT 1");
    $book   = mysqli_fetch_assoc($result);

    mysqli_close($conn);
    return $book;
}

// ─── INSERT NEW BOOK ──────────────────────────────────────────────────────────
function insertBook($title, $author, $category, $availability) {
    $conn         = getConnection();
    $title        = mysqli_real_escape_string($conn, $title);
    $author       = mysqli_real_escape_string($conn, $author);
    $category     = mysqli_real_escape_string($conn, $category);
    $availability = mysqli_real_escape_string($conn, $availability);

    $sql = "INSERT INTO books (title, author, category, availability)
            VALUES ('$title', '$author', '$category', '$availability')";

    $success = mysqli_query($conn, $sql);
    $insertId = $success ? mysqli_insert_id($conn) : null;

    mysqli_close($conn);
    return ['success' => $success, 'id' => $insertId];
}

// ─── UPDATE EXISTING BOOK ─────────────────────────────────────────────────────
function updateBook($id, $title, $author, $category, $availability) {
    $conn         = getConnection();
    $id           = mysqli_real_escape_string($conn, $id);
    $title        = mysqli_real_escape_string($conn, $title);
    $author       = mysqli_real_escape_string($conn, $author);
    $category     = mysqli_real_escape_string($conn, $category);
    $availability = mysqli_real_escape_string($conn, $availability);

    $sql = "UPDATE books
            SET title='$title', author='$author', category='$category', availability='$availability'
            WHERE id='$id'";

    $success = mysqli_query($conn, $sql);

    mysqli_close($conn);
    return ['success' => $success, 'affected' => mysqli_affected_rows($conn)];
}

// ─── DELETE A BOOK ────────────────────────────────────────────────────────────
function deleteBook($id) {
    $conn = getConnection();
    $id   = mysqli_real_escape_string($conn, $id);

    $sql     = "DELETE FROM books WHERE id='$id'";
    $success = mysqli_query($conn, $sql);

    mysqli_close($conn);
    return ['success' => $success];
}
