<?php

$errors = [];
$email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$age = filter_var(trim($_POST["age"] ?? ""), FILTER_SANITIZE_NUMBER_INT);
$name = strip_tags(htmlspecialchars(trim($_POST["name"] ?? "")));
$phoneNumber = preg_replace('/[^0-9+\s\-()]/', '', trim($_POST["tel"] ?? ""));
$birthday = trim($_POST["date"] ?? "");
$password = trim($_POST["password"] ?? "");
$bio = strip_tags(htmlspecialchars(trim($_POST["bio"] ?? "")));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (empty($name)) {
        $errors["name"] = "Naam is een verplicht veld!";
    }

    if (empty($email)) {
        $errors["email"] = "Email is een verplicht veld!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Email is geen geldig email!";
    }

    if (empty($age)) {
        $errors["age"] = "Leeftijd is een verplicht veld!";
    } else if (!is_numeric($age)) {
        $errors["age"] = "Leeftijd moet een getal zijn!";
    } else if ($age <= 17) {
        $errors["age"] = "Je moet 18+ plus zijn!";
    } else if ($age >= 101) {
        $errors["age"] = "Je mag niet ouder dan 100 jaar zijn!";
    }

    if (empty($phoneNumber)) {
        $errors["tel"] = "Telefoonnummer is een verplicht veld!";
    } else if (!preg_match('/^[0-9+\s\-()]{10,15}$/', $phoneNumber)) {
        $errors["tel"] = "Telefoonnummer is niet geldig!";
    }

    if (empty($birthday)) {
        $errors["birthday"] = "Verjaardag is een verplicht veld!";
    } else {
        $date = DateTime::createFromFormat('Y-m-d', $birthday);
        if (!$date || $date->format('Y-m-d') !== $birthday) {
            $errors["birthday"] = "Verjaardag heeft een ongeldig formaat!";
        } else {
            $birthDate = new DateTime($birthday);
            $today = new DateTime();
            $calculatedAge = $birthDate->diff($today)->y;
            
            if ($calculatedAge != $age) {
                $errors["age"] = "Leeftijd komt niet overeen met de opgegeven geboortedatum! (Berekende leeftijd: $calculatedAge)";
            }
        }
    }
    
    if (empty($password)) {
        $errors["password"] = "Wachtwoord is een verplicht veld!";
    } else if (!preg_match('/^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[^A-Za-z0-9].*[^A-Za-z0-9]).{12,}$/', $password)) {
        $missing = [];
        if (strlen($password) < 12) {
            $missing[] = "minimaal 12 tekens";
        }
        if (!preg_match('/(?:.*[A-Z].*){2,}/', $password)) {
            $missing[] = "2 hoofdletters";
        }
        if (!preg_match('/(?:.*[0-9].*){2,}/', $password)) {
            $missing[] = "2 cijfers";
        }
        if (!preg_match('/(?:.*[^A-Za-z0-9].*){2,}/', $password)) {
            $missing[] = "2 speciale tekens";
        }
        
        $errors["password"] = "Wachtwoord voldoet niet aan de vereisten! Nog nodig: " . implode(", ", $missing);
    }
    
    if (empty($bio)) {
        $errors["bio"] = "Biografie is een verplicht veld!";
    } else {
        $wordCount = str_word_count($bio);
        if ($word_count < 100) {
            $errors["bio"] = "Biografie moet minstens 100 woorden bevatten! (Nu: $word_count)";
        }
    }

    if (empty($errors)) {
        $data = [
            "creation_date" => date("Y-m-d H:i:s"),
            "name" => $name,
            "email" => $email,
            "age" => $age,
            "phoneNumber" => $phoneNumber,
            "birthday" => $birthday,
            "password" => password_hash($password, PASSWORD_DEFAULT), // HASHING FOR SECURITY!!!
            "bio" => $bio
        ];

        $dataDir = __DIR__ . "/data";
        if (!file_exists($dataDir)) {
            mkdir($dataDir, 0755, true);
        }

        $dataFile = $dataDir . "/records.txt";
        file_put_contents($dataFile, json_encode($data) . PHP_EOL, FILE_APPEND);

        include "index_process_view.php";
    } else {
        include "index.php";
    }
} else {
    $error = "Om deze pagina te gebruiken moet je het formulier invullen.";
    header("location: index.php?error=" . urlencode($error));
    exit;
}