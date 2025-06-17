<?php
$error = '';
if (isset($_GET['error'])) {
    $error = $_GET['error'];
}

$success = '';
if (isset($_GET['success'])) {
    $success = $_GET['success'];
}

if (!isset($errors)) {
    $errors = [];
}

include_once "index_view.php";