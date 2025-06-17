<?php

$naam = "";
$nummer = "";
$error = "";

if (isset($_GET["nummer"]) && !empty($_GET["nummer"])) {
    $nummer = $_GET["nummer"];
} else {
    $error = "Je hebt de parameter 'nummer' niet in de URL.";
    header("location: index.html");
    exit();
}

if (isset($_GET["naam"]) && !empty($_GET["naam"])) {
    $naam = $_GET["naam"];
} else {
    $error = "Je hebt de parameter 'naam' niet in de URL.";
    header("location: index.html");
    exit();
}

include_once("index_process_view.php");