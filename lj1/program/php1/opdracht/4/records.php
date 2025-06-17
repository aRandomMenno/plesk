<?php
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

$records = [];
$dataFile = "records.txt";
if (file_exists($dataFile)) {
	$lines = file($dataFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
	foreach ($lines as $line) {
		$data = explode(",", $line);
		if (count($data) >= 9) {
			$records[] = [
				'voornaam' => $data[0],
				'tussenvoegsel' => $data[1],
				'achternaam' => $data[2],
				'email' => $data[3],
				'telefoonNummer' => $data[4],
				'straatnaam' => $data[5],
				'huisnummer' => $data[6],
				'bsn' => $data[7],
				'vacature' => $data[8]
			];
		}
	}
}

include_once 'records_view.php';