<?php
$totalGrade = 0;
$grade_count = 0;

foreach ($classesGrades as $subject => $grade) {
    if (!empty($grade)) {
        $totalGrade += $grade;
        $grade_count++;
    }
}

$averageGrade = ($grade_count > 0) ? round($totalGrade / $grade_count, 1) : 0;
$grade_color = $averageGrade >= 5.5 ? 'green' : 'red';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../css/dark_mode.css">
    <link rel="stylesheet" href="css/styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultaten</title>
</head>

<body>
    <div class="student-card">
        <div class="student-info">
            <h1>Student Resultaten</h1>
            <p><strong>Naam:</strong> <?= htmlspecialchars($name); ?></p>
            <p><strong>Studentnummer:</strong> <?= htmlspecialchars($student_number); ?></p>
            <p><strong>Klas:</strong> <?= htmlspecialchars($class); ?></p>
        </div>

        <h2>Vakken en cijfers</h2>
        <table class="grades-table">
            <thead>
                <tr>
                    <th>Vak</th>
                    <th>Cijfer</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($classesGrades as $subject => $grade): ?>
                    <?php if (!empty($subject)): ?>
                        <tr>
                            <td><?= htmlspecialchars($subject); ?></td>
                            <td><?= htmlspecialchars($grade); ?></td>
                        </tr>
                    <?php endif; ?>
                <?php endforeach; ?>
            </tbody>
        </table>

        <div class="average">
            <p>
                Gemiddeld cijfer: <span class="grade-<?= $grade_color; ?>"><?= $averageGrade; ?></span>
            </p>
        </div>
    </div>

    <a href="." class="back-link">Ga terug naar het formulier</a>
    <a href="../.." class="back-link" id="hoofdmenu">Ga terug naar het hoofdmenu</a>
</body>

</html>