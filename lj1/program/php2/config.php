<?php

ini_set("display_errors", 1);
error_reporting(E_ALL);

$db = "program1_agenda.sqlite";

try {
    $pdo = new PDO("sqlite:$db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    die("Er is een probleem met de database verbinding. Probeer het later opnieuw.");
}
