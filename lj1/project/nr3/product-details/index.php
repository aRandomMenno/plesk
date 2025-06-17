<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include 'index_process.php';
} else {
    include 'index_view.php';
}