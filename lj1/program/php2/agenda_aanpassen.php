<?php

require "config.php";
require "helpers/validatie.php";

$id = $_GET["ID"] ?? null;
$fout = null;

if (!$id || !is_numeric($id)) {
    header("Location: agenda.php");
    exit;
}

if ($_POST) {
    $validatie = new AgendaValidatie();
    $veilige_gegevens = $validatie->maakVeilig($_POST);
    
    if (!$validatie->valideerAgendaItem($veilige_gegevens)) {
        $fout = $validatie->getFoutenAlsString();
    } else {
        try {
            $query = "UPDATE crud_agenda SET titel = :titel, omschrijving = :omschrijving, begin_datum = :begin_datum, eind_datum = :eind_datum, tags = :tags, prioriteit = :prioriteit, status = :status WHERE ID = :id";
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
            $stmt->bindParam(":id", $id);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                $fout = "Het agenda item kon niet worden bijgewerkt. Mogelijk bestaat het niet meer.";
            } else {
                header("Location: agenda.php");
                exit;
            }
        } catch (PDOException $e) {
            error_log("Update failed: " . $e->getMessage());
            $fout = "Er is een fout opgetreden bij het bijwerken van het agenda item. Probeer het opnieuw.";
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
    $fout = "Er is een fout opgetreden bij het ophalen van het agenda item.";
}

include_once "views/agenda_aanpassen_view.php";