<?php

$fileName = "visits.txt";
$visits = 1;

if (file_exists($fileName)) {
	$visits = (int) file_get_contents($fileName);
	$visits++;
}

file_put_contents($fileName, $visits);

$uniqueFileName = "unique_visits.txt";
$uniqueVisits = 1;

if (file_exists($uniqueFileName)) {
	$uniqueVisits = (int) file_get_contents($uniqueFileName);
}

$isNewVisitor = false;
if (!isset($_COOKIE['visited'])) {
	setcookie('visited', 'true', 2147483647, "/");
	$isNewVisitor = true;
}

if ($isNewVisitor) {
	$uniqueVisits++;
	file_put_contents($uniqueFileName, $uniqueVisits);
}

include_once "index_visits_view.php";