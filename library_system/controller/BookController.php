<?php
// controllers/BookController.php - Controller Layer

require_once __DIR__ . '/../models/BookModel.php';

// ─── HANDLE GET ALL BOOKS ─────────────────────────────────────────────────────
function handleGetAllBooks() {
    $books = getAllBooks();
    echo json_encode(['success' => true, 'data' => $books]);
}

// ─── HANDLE GET SINGLE BOOK ───────────────────────────────────────────────────
function handleGetBook($id) {
    if (empty($id)) {
        echo json_encode(['success' => false, 'message' => 'Book ID is required.']);
        return;
    }

    $book = getBookById($id);

    if ($book) {
        echo json_encode(['success' => true, 'data' => $book]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Book not found.']);
    }
}

// ─── HANDLE ADD BOOK ──────────────────────────────────────────────────────────
function handleAddBook($data) {
    $title        = trim($data['title']        ?? '');
    $author       = trim($data['author']       ?? '');
    $category     = trim($data['category']     ?? '');
    $availability = trim($data['availability'] ?? 'available');

    // Simple validation
    if (empty($title) || empty($author) || empty($category)) {
        echo json_encode(['success' => false, 'message' => 'Title, Author, and Category are required.']);
        return;
    }

    if (!in_array($availability, ['available', 'borrowed'])) {
        $availability = 'available';
    }

    $result = insertBook($title, $author, $category, $availability);

    if ($result['success']) {
        echo json_encode(['success' => true, 'message' => 'Book added successfully!', 'id' => $result['id']]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add book. Please try again.']);
    }
}

// ─── HANDLE UPDATE BOOK ───────────────────────────────────────────────────────
function handleUpdateBook($data) {
    $id           = trim($data['id']           ?? '');
    $title        = trim($data['title']        ?? '');
    $author       = trim($data['author']       ?? '');
    $category     = trim($data['category']     ?? '');
    $availability = trim($data['availability'] ?? 'available');

    if (empty($id) || empty($title) || empty($author) || empty($category)) {
        echo json_encode(['success' => false, 'message' => 'All fields including Book ID are required.']);
        return;
    }

    if (!in_array($availability, ['available', 'borrowed'])) {
        $availability = 'available';
    }

    $result = updateBook($id, $title, $author, $category, $availability);

    if ($result['success']) {
        echo json_encode(['success' => true, 'message' => 'Book updated successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update book. Please try again.']);
    }
}

// ─── HANDLE DELETE BOOK ───────────────────────────────────────────────────────
function handleDeleteBook($id) {
    if (empty($id)) {
        echo json_encode(['success' => false, 'message' => 'Book ID is required.']);
        return;
    }

    $result = deleteBook($id);

    if ($result['success']) {
        echo json_encode(['success' => true, 'message' => 'Book deleted successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete book. Please try again.']);
    }
}
