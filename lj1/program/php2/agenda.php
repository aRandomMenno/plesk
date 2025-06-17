<?php

require "config.php";

$error = null;

try {
    $query = "select * from crud_agenda";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $result = $stmt->fetchAll();
    $amountOfRows = count($result);

} catch (PDOException $e) {
    error_log("Database query failed: " . $e->getMessage());
    $error = "Er is een fout opgetreden bij het ophalen van de agenda items. Probeer het later opnieuw.";
    $result = [];
    $amountOfRows = 0;
}

include_once "views/agenda_view.php";
