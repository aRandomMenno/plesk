<?php

require_once "config.php";
require_once "tools/helpers.php";

$id = $_GET["id"] ?? null;
$fout = null;

if (!$id || !is_numeric($id)) {
    header("Location: scores.php");
    exit;
}

if ($_POST) {
    // Validate input
    $name = trim($_POST["name"] ?? "");
    $score = $_POST["score"] ?? "";
    $robot = isset($_POST["robot"]) ? 1 : 0;
    
    // Basic validation
    if (empty($name)) {
        $fout = "Naam is verplicht.";
    } elseif (!is_numeric($score) || $score < 0) {
        $fout = "Score moet een geldig getal zijn.";
    } else {
        try {
            $query = "UPDATE game_scores SET name = :name, score = :score, robot = :robot WHERE id = :id";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(":name", $name);
            $stmt->bindParam(":score", $score, PDO::PARAM_INT);
            $stmt->bindParam(":robot", $robot, PDO::PARAM_INT);
            $stmt->bindParam(":id", $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                $fout = "De game score kon niet worden bijgewerkt. Mogelijk bestaat deze niet meer.";
            } else {
                header("Location: scores.php");
                exit;
            }
        } catch (PDOException $e) {
            error_log("Update failed: " . $e->getMessage());
            $fout = "Er is een fout opgetreden bij het bijwerken van de game score. Probeer het opnieuw.";
        }
    }
}

try {
    $query = "SELECT * FROM game_scores WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();

    $game_score = $stmt->fetch();

    if (!$game_score) {
        header("Location: scores.php");
        exit;
    }

} catch (PDOException $e) {
    error_log("Select query failed: " . $e->getMessage());
    $fout = "Er is een fout opgetreden bij het ophalen van de game score.";
}

include_once "views/edit_view.php";