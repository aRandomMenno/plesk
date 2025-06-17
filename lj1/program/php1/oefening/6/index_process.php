<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $age = $_POST['age'];

    include_once("index_process_view.php");
}

else {
    $error = "Om deze pagina te gebruiken moet je het formulier invullen.";
    header('location: index.php?error=' . urlencode($error));
    exit;
}