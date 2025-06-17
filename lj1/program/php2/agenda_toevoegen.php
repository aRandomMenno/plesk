<?php

require "config.php";

$error = null;

if ($_POST) {
    if (empty($_POST["titel"]) || empty($_POST["omschrijving"]) || empty($_POST["begin_datum"]) || empty($_POST["eind_datum"]) || !isset($_POST["prioriteit"]) || $_POST["prioriteit"] === "") {
        $error = "Alle verplichte velden moeten worden ingevuld.";
    } else {
        try {
            $query = "INSERT INTO crud_agenda (titel, omschrijving, begin_datum, eind_datum, tags, prioriteit, status) VALUES (:titel, :omschrijving, :begin_datum, :eind_datum, :tags, :prioriteit, :status)";
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
            $stmt->execute();

            header("Location: agenda.php");
            exit;
        } catch (PDOException $e) {
            // $error = $e->getMessage();
            error_log("Insert failed: " . $e->getMessage());
            $error = "Er is een fout opgetreden bij het toevoegen van het agenda item. Probeer het opnieuw: " . $e->getMessage();
        }
    }
}

include_once "views/agenda_toevoegen_view.php";
