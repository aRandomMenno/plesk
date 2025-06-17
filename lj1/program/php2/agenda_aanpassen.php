<?php

require "config.php";

$id = $_GET["ID"] ?? null;
$error = null;

if (!$id || !is_numeric($id)) {
    header("Location: agenda.php");
    exit;
}

if ($_POST) {
    if (empty($_POST["titel"]) || empty($_POST["omschrijving"]) || empty($_POST["begin_datum"]) || empty($_POST["eind_datum"]) || !isset($_POST["prioriteit"]) || $_POST["prioriteit"] === "") {
        $error = "Alle verplichte velden moeten worden ingevuld.";
    } else {
        try {
            $query = "UPDATE crud_agenda SET titel = :titel, omschrijving = :omschrijving, begin_datum = :begin_datum, eind_datum = :eind_datum, tags = :tags, prioriteit = :prioriteit, status = :status WHERE ID = :id";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(":titel", $_POST["titel"]);
            $stmt->bindParam(":omschrijving", $_POST["omschrijving"]);
            $stmt->bindParam(":begin_datum", $_POST["begin_datum"]);
            $stmt->bindParam(":eind_datum", $_POST["eind_datum"]);
            
            $tags_value = $_POST["tags"] ?? "";
            $stmt->bindParam(":tags", $tags_value);
            $stmt->bindParam(":prioriteit", $_POST["prioriteit"], PDO::PARAM_INT);
            $status_value = $_POST["status"] ?? "";
            $stmt->bindParam(":status", $status_value);
            $stmt->bindParam(":id", $id);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                $error = "Het agenda item kon niet worden bijgewerkt. Mogelijk bestaat het niet meer.";
            } else {
                header("Location: agenda.php");
                exit;
            }
        } catch (PDOException $e) {
            error_log("Update failed: " . $e->getMessage());
            $error = "Er is een fout opgetreden bij het bijwerken van het agenda item. Probeer het opnieuw.";
        }
    }
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
    $error = "Er is een fout opgetreden bij het ophalen van het agenda item.";
}

include_once "views/agenda_aanpassen_view.php";