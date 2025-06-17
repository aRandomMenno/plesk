<?php
session_start();

if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    header('Location: ../cart/');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'index_process.php';
} else {
    include 'index_view.php';
}

