<?php

require "config.php";

$id = $_GET["ID"] ?? null;
$fout = null;

if (!$id || !is_numeric($id)) {
    header("Location: agenda.php");
    exit;
}

try {
    $query = "SELECT * FROM crud_agenda WHERE ID = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    $agenda_item = $stmt->fetch();

    if (!$agenda_item) {
        header("Location: agenda.php");
        exit;
    }

} catch (PDOException $e) {
    error_log("Select query failed: " . $e->getMessage());
    $fout = "Er is een fout opgetreden bij het ophalen van het agenda item.";
}

include_once "views/agenda_item_view.php";