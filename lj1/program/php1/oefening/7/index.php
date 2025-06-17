<?php
$error = '';
if (isset($_GET['error'])) {
    $error = $_GET['error'];
}

if (!isset($errors)) {
    $errors = [];
}

include_once "index_view.php";