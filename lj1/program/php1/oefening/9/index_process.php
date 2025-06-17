<?php

$errors = [];
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = strip_tags(htmlspecialchars(trim($_POST["name"] ?? "")));
    $surname = strip_tags(htmlspecialchars(trim($_POST["surname"] ?? "")));;
    $birthday = trim($_POST["date"] ?? "");

    if (empty($name)) {
        $errors[] = "Voornaam is verplicht!";
    }
    if (empty($surname)) {
        $errors[] = "Achternaam is verplicht!";
    }
    if (empty($birthday)) {
        $errors[] = "Geboortedatum is verplicht!";
    } else {
        $date = DateTime::createFromFormat('Y-m-d', $birthday);
        if (!$date || $date->format('Y-m-d') !== $birthday) {
            $errors[] = "Verjaardag heeft een ongeldig formaat!";
        }
    }

    if (empty($errors)) {
        $data = [
            "name" => $name,
            "surname" => $surname,
            "birthday" => $birthday,
        ];

        $dataFile = "records.txt";
        $file = fopen($dataFile, "a");
        if ($file) {
            $data_string = $name . "," . $surname . "," . $birthday . "\n";
            fwrite($file, $data_string);
            fclose($file);
            
            $success = "Form successfully submitted!";
            header('location: index.php?success=' . urlencode($success));
            exit();
        } else {
            $errors[] = "Kon niet schrijven naar bestand!";
        }
    }
    
    if (!empty($errors)) {
        // Redirect with errors
        header('location: index.php?error=' . urlencode(implode(', ', $errors)));
        exit();
    }
}
else {
    $error = "Vul het formulier in om gebruik te maken van deze pagina!";
    header('location: index.php?error=' . urlencode($error));
}