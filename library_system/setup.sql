CREATE DATABASE IF NOT EXISTS university_library;

USE university_library;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    availability ENUM('available', 'borrowed') NOT NULL DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, category, availability) VALUES
('Introduction to Algorithms', 'Thomas H. Cormen', 'Computer Science', 'available'),
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'borrowed'),
('Calculus: Early Transcendentals', 'James Stewart', 'Mathematics', 'available'),
('A Brief History of Time', 'Stephen Hawking', 'Science', 'available'),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'borrowed');
