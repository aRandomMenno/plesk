<?php
session_start();

$vacatures = [
    "afwasser" => "Afwasser (m/v)",
    "vakkenvuller" => "Vakkenvuller (m/v)",
    "kassamedewerker" => "Kassamedewerker (m/v)",
    "schoonmaker" => "Schoonmaker (m/v)",
    "barmedewerker" => "Barmewerker (m/v)",
    "pizzabezorger" => "Pizzabezorger (m/v)",
    "orderpicker" => "Orderpicker (m/v)",
    "verkoopmedewerker" => "Verkoopmedewerker (m/v)",
    "telefoniste" => "Telefoniste (m/v)",
    "administratief medewerker" => "Administratief medewerker (m/v)",
    "stagiair" => "Stagiair (m/v)"
];
$errors = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $voornaam = strip_tags(htmlspecialchars(trim($_POST["voornaam"] ?? "")));
    $achternaam = strip_tags(htmlspecialchars(trim($_POST["achternaam"] ?? "")));
    $tussenvoegsel = strip_tags(htmlspecialchars(trim($_POST["tussenvoegsel"] ?? "")));
    $email = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
    $telefoonNummer = strip_tags(htmlspecialchars(trim($_POST["telefoonNummer"] ?? "")));
    $straatnaam = strip_tags(htmlspecialchars(trim($_POST["straatnaam"] ?? "")));
    $huisnummer = strip_tags(htmlspecialchars(trim($_POST["huisnummer"] ?? "")));
    $bsn = strip_tags(htmlspecialchars(trim($_POST["bsn"] ?? "")));
    $vacature = strip_tags(htmlspecialchars(trim($_POST["vacature"] ?? "")));

    if (empty($voornaam)) {
        $errors['voornaam'] = "Voornaam is verplicht!";
    } elseif (strlen($voornaam) > 31) {
        $errors['voornaam'] = "Voornaam mag niet langer zijn dan 31 tekens!";
    }
    if (empty($achternaam)) {
        $errors['achternaam'] = "Achternaam is verplicht!";
    } elseif (strlen($achternaam) > 31) {
        $errors['achternaam'] = "Achternaam mag niet langer zijn dan 50 tekens!";
    }
    if (empty($email)) {
        $errors['email'] = "E-mail is verplicht!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Ongeldig e-mailadres!";
    }
    if (empty($telefoonNummer)) {
        $errors['telefoonNummer'] = "Telefoonnummer is verplicht!";
    } elseif (!preg_match('/^[0-9]{10}$/', preg_replace('/[^0-9]/', '', $telefoonNummer))) {
        $errors['telefoonNummer'] = "Ongeldig telefoonnummer!";
    }
    if (empty($straatnaam)) {
        $errors['straatnaam'] = "Straatnaam is verplicht!";
    }
    if (empty($huisnummer)) {
        $errors['huisnummer'] = "Huisnummer is verplicht!";
    }
    if (empty($bsn)) {
        $errors['bsn'] = "BSN is verplicht!";
    } elseif (!preg_match('/^[0-9]{9}$/', $bsn) || !checkBSN($bsn)) {
        $errors['bsn'] = "Ongeldig BSN nummer!";
    }
    if (empty($vacature)) {
        $errors['vacature'] = "Vacature is verplicht!";
    } elseif (!isset($vacatures[$vacature])) {
        $errors['vacature'] = "Ongeldige vacature!";
    }

    if (empty($errors)) {
        $data = [
            "voornaam" => $voornaam,
            "tussenvoegsel" => $tussenvoegsel,
            "achternaam" => $achternaam,
            "email" => $email,
            "telefoonNummer" => $telefoonNummer,
            "straatnaam" => $straatnaam,
            "huisnummer" => $huisnummer,
            "bsn" => $bsn,
            "vacature" => $vacature
        ];

        $dataFile = "records.txt";
        $file = fopen($dataFile, "a");
        if ($file) {
            $dataString = implode(",", $data) . "\n";
            fwrite($file, $dataString);
            fclose($file);

            include_once "index_process_view.php";
        } else {
            $errors[] = "Kon niet schrijven naar bestand!";
        }
    } else {
        $_SESSION['errors'] = $errors;
        header('Location: index.php');
        exit();
    }
} else {
    $error = "Vul het formulier in om gebruik te maken van deze pagina!";
    header('location: index.php?error=' . urlencode($error));
}

function checkBSN($bsn)
{
    $bsn = preg_replace('/[^0-9]/', '', $bsn);
    $length = strlen($bsn);
    if ($length !== 9) {
        return false;
    }

    $sum = 0;
    for ($i = 0; $i < 8; $i++) {
        $sum += intval($bsn[$i]) * (9 - $i);
    }
    $sum -= intval($bsn[8]);
    $result = ($sum % 11 === 0 && $sum !== 0);
    file_put_contents('bsn_debug.txt', "Sum: $sum, Result: " . ($result ? "valid" : "invalid") . "\n", FILE_APPEND);

    return $result;
}