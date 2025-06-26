<?php

require_once "config.php";

$fout = null;

try {
    $query = "select * from game_scores order by score desc";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $data = $stmt->fetchAll();
    $aantal_rijen = count($data);
} catch (PDOException $e) {
    error_log("Database query failed: " . $e->getMessage());
    $fout = "Er is een fout opgetreden bij het ophalen van de agenda items. Probeer het later opnieuw.";
    $data = [];
    $aantal_rijen = 0;
}

include_once "views/scores_view.php";