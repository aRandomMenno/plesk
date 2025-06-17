<?php
session_start();

$errors = $_SESSION['errors'] ?? [];
unset($_SESSION['errors']);

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

include_once "index_view.php";