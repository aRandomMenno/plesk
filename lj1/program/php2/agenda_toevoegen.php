<?php

require "config.php";
require "helpers/validatie.php";

$fout = null;

if ($_POST) {
    $validatie = new AgendaValidatie();
    $veilige_gegevens = $validatie->maakVeilig($_POST);
    
    if (!$validatie->valideerAgendaItem($veilige_gegevens)) {
        $fout = $validatie->getFoutenAlsString();
    } else {
        try {
            $query = "INSERT INTO crud_agenda (titel, omschrijving, begin_datum, eind_datum, tags, prioriteit, status) VALUES (:titel, :omschrijving, :begin_datum, :eind_datum, :tags, :prioriteit, :status)";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(":titel", $veilige_gegevens["titel"]);
            $stmt->bindParam(":omschrijving", $veilige_gegevens["omschrijving"]);
            $stmt->bindParam(":begin_datum", $veilige_gegevens["begin_datum"]);
            $stmt->bindParam(":eind_datum", $veilige_gegevens["eind_datum"]);
            
            $tags_waarde = $veilige_gegevens["tags"] ?? "";
            $stmt->bindParam(":tags", $tags_waarde);
            $stmt->bindParam(":prioriteit", $veilige_gegevens["prioriteit"], PDO::PARAM_INT);
            $status_waarde = $veilige_gegevens["status"] ?? "";
            $stmt->bindParam(":status", $status_waarde);
            $stmt->execute();

            header("Location: agenda.php");
            exit;
        } catch (PDOException $e) {
            error_log("Insert failed: " . $e->getMessage());
            $fout = "Er is een fout opgetreden bij het toevoegen van het agenda item. Probeer het opnieuw.";
        }
    }
}

include_once "views/agenda_toevoegen_view.php";
