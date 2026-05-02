<?php
header("Content-Type: application/json");

$students = [
    [
        "name" => "Aninda",
        "id" => "20-12345-1",
        "department" => "CNCS",
        "cgpa" => 3.86
    ],
    [
        "name" => "Nolok",
        "id" => "20-12346-1",
        "department" => "BBA",
        "cgpa" => 3.90
    ],
    [
        "name" => "Juie",
        "id" => "20-12347-1",
        "department" => "PHA",
        "cgpa" => 3.60
    ]
];

echo json_encode($students);
?>