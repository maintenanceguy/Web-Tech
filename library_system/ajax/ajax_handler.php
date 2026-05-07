<?php
// ajax_handler.php - AJAX Entry Point
// All AJAX requests from the frontend are sent here.
// This file reads the 'action' parameter and calls the correct controller function.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once __DIR__ . '/controllers/BookController.php';

// Read the action from GET or POST
$action = $_REQUEST['action'] ?? '';

switch ($action) {

    // Fetch all books (GET)
    case 'get_books':
        handleGetAllBooks();
        break;

    // Fetch a single book by id (GET)
    case 'get_book':
        $id = $_GET['id'] ?? '';
        handleGetBook($id);
        break;

    // Add a new book (POST)
    case 'add_book':
        handleAddBook($_POST);
        break;

    // Update an existing book (POST)
    case 'update_book':
        handleUpdateBook($_POST);
        break;

    // Delete a book (POST)
    case 'delete_book':
        $id = $_POST['id'] ?? '';
        handleDeleteBook($id);
        break;

    // Unknown action
    default:
        echo json_encode(['success' => false, 'message' => 'Unknown action: ' . $action]);
        break;
}
