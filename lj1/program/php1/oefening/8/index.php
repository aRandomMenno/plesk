<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$fileName = "file.txt";

$file = fopen($fileName, "w") or die("Couldn't open file!");

if ($file === false) {
    $error = "Couldn't open file!";
    exit;
}

fwrite($file, "TEST :)\n");
fclose($file);

chmod($filename, 0660);

echo "works!";