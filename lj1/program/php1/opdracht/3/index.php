<?php
$error = '';
if (isset($_GET['error'])) {
    $error = $_GET['error'];
}

include_once "index_view.php";