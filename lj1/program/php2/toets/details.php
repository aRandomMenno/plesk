<?php

require_once "config.php";
require_once "tools/helpers.php";

$id = $_GET["id"] ?? null;
$fout = null;

if (!$id || !is_numeric($id)) {
    header("Location: scores.php");
    exit;
}

try {
    $query = "SELECT * FROM game_scores WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    $detailed_data = $stmt->fetch();

    if (!$detailed_data) {
        header("Location: scores.php");
        exit;
    }

} catch (PDOException $e) {
    error_log("Select query failed: " . $e->getMessage());
    $fout = "Er is een fout opgetreden bij het ophalen van de game score.";
}

include_once "views/details_view.php";