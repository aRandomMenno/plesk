<?php

require_once "config.php";
require_once "tools/helpers.php";

$fout = null;
$success = null;

// handle form submission here
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // validate and sanitize input data
    $name = isset($_POST["name"]) ? trim($_POST["name"]) : "";
    $score = isset($_POST["score"]) ? trim($_POST["score"]) : "";
    $robot = isset($_POST["robot"]) ? 1 : 0;
    
    // validate required fields
    if (empty($name)) {
        $fout = "Naam is verplicht.";
    } elseif (empty($score) || !is_numeric($score)) {
        $fout = "Score moet een geldig getal zijn.";
    } elseif (intval($score) < 0) {
        $fout = "Score moet een positief getal zijn.";
    } else {
        try {
            // generate UUID and current date automatically
            $uuid = generateSecureUuid();
            $received_date = date("Y-m-d H:i:s");
            
            // validate the generated UUID for additional security
            if (!isValidUuid($uuid)) {
                throw new Exception("Generated UUID is invalid");
            }
            
            // check for duplicate UUIDs (extremely unlikely but good practice)
            $check_query = "SELECT COUNT(*) FROM game_scores WHERE uuid = ?";
            $check_stmt = $pdo->prepare($check_query);
            $check_stmt->execute([$uuid]);
            if ($check_stmt->fetchColumn() > 0) {
                // regenerate UUID if collision detected
                $uuid = generateSecureUuid();
            }
            
            // prepare and execute the insert query
            $query = "INSERT INTO game_scores (name, score, uuid, received_date, robot) VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([
                $name,
                intval($score),
                $uuid,
                $received_date,
                $robot
            ]);
            
            $success = "Score succesvol toegevoegd! UUID: " . $uuid;
            
            // clear form data after successful submission
            $name = "";
            $score = "";
            $robot = 0;
            
        } catch (PDOException $e) {
            error_log("Database insert failed: " . $e->getMessage());
            $fout = "Er is een fout opgetreden bij het toevoegen van de score. Probeer het later opnieuw.";
        } catch (Exception $e) {
            error_log("UUID generation failed: " . $e->getMessage());
            $fout = "Er is een fout opgetreden bij het genereren van veilige identifiers.";
        }
    }
}

/**
 * generate a cryptographically secure UUID v4
 * This UUID is protected against tampering through secure random generation
 */
function generateSecureUuid(): string {
    // generate 16 random bytes
    $data = random_bytes(16);
    
    // set version (4) and variant bits according to RFC 4122
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // Version 4
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // Variant bits
    
    // format as UUID string
    return sprintf(
        "%08s-%04s-%04s-%04s-%12s",
        bin2hex(substr($data, 0, 4)),
        bin2hex(substr($data, 4, 2)),
        bin2hex(substr($data, 6, 2)),
        bin2hex(substr($data, 8, 2)),
        bin2hex(substr($data, 10, 6))
    );
}

include_once "views/add_view.php";
