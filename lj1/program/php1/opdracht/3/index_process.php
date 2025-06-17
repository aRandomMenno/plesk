<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $errors = [];

    if (empty($_POST['name'])) {
        $errors[] = "Naam is verplicht";
    }

    if (empty($_POST['studentNumber'])) {
        $errors[] = "Studentnummer is verplicht";
    } elseif (!preg_match('/^[0-9]{6}$/', $_POST['studentNumber'])) {
        $errors[] = "Studentnummer moet uit precies 6 cijfers bestaan";
    }

    if (empty($_POST['class'])) {
        $errors[] = "Klas is verplicht";
    } elseif (!preg_match('/^D[1-3][A-F][1-2]$/', $_POST['class'])) {
        $errors[] = "Klas moet het format D1-3A-F1-2 hebben";
    }

    $requiredFields = ['class_1', 'class_2', 'class_3', 'class_4'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            $errors[] = "Alle vaknamen zijn verplicht";
            break;
        }
    }

    $gradeFields = ['grade_1', 'grade_2', 'grade_3', 'grade_4'];
    foreach ($gradeFields as $field) {
        if (!isset($_POST[$field])) {
            $errors[] = "Alle cijfers zijn verplicht";
            break;
        } elseif (!is_numeric($_POST[$field])) {
            $errors[] = "Cijfers moeten numeriek zijn";
            break;
        } elseif ($_POST[$field] < 1.0 || $_POST[$field] > 10.0) {
            $errors[] = "Cijfers moeten tussen 1.0 en 10.0 liggen";
            break;
        }
    }

    $classValues = array_filter([
        $_POST['class_1'] ?? '',
        $_POST['class_2'] ?? '',
        $_POST['class_3'] ?? '',
        $_POST['class_4'] ?? '',
    ]);

    if (count($classValues) !== count(array_unique($classValues))) {
        $errors[] = "Vaknamen moeten uniek zijn";
    }

    if (!empty($errors)) {
        $errorMessage = implode("; ", $errors);
        header('location: index.php?error=' . urlencode($errorMessage));
        exit;
    }

    $name = $_POST['name'];
    $studentNumber = $_POST['studentNumber'];
    $class = $_POST['class'];

    $classesGrades = [
        $_POST['class_1'] => $_POST['grade_1'],
        $_POST['class_2'] => $_POST['grade_2'],
        $_POST['class_3'] => $_POST['grade_3'],
        $_POST['class_4'] => $_POST['grade_4'],
    ];

    $totalGrade = 0;
    $gradeCount = 0;

    foreach ($classesGrades as $subject => $grade) {
        if (!empty($grade)) {
            $totalGrade += $grade;
            $gradeCount++;
        }
    }

    $averageGrade = ($gradeCount > 0) ? round($totalGrade / $gradeCount, 1) : 0;

    $data = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'studentNumber' => $studentNumber,
        'class' => $class,
        'classesGrades' => $classesGrades,
        'averageGrade' => $averageGrade,
    ];

    $dataDir = __DIR__ . '/data';
    if (!file_exists($dataDir)) {
        mkdir($dataDir, 0755, true);
    }

    $dataFile = $dataDir . '/student_records.txt';
    file_put_contents($dataFile, json_encode($data) . PHP_EOL, FILE_APPEND);

    include_once "index_process_view.php";
} else {
    header('location: index.php');
    exit;
}
