<?php

require "config.php";

$fout = null;

try {
    $query = "select * from crud_agenda";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $resultaat = $stmt->fetchAll();
    $aantal_rijen = count($resultaat);

} catch (PDOException $e) {
    error_log("Database query failed: " . $e->getMessage());
    $fout = "Er is een fout opgetreden bij het ophalen van de agenda items. Probeer het later opnieuw.";
    $resultaat = [];
    $aantal_rijen = 0;
}

include_once "views/agenda_view.php";
