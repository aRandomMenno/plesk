<?php
$records = [];
$dataFile = __DIR__ . '/data/student_records.txt';

if (file_exists($dataFile)) {
    $lines = file($dataFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $records[] = json_decode($line, true);
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../css/dark_mode.css">
    <link rel="stylesheet" href="css/styles.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alle Studentenrecords</title>
</head>

<body>
    <div class="records-container">
        <h1>Alle Studentenrecords</h1>

        <?php if (empty($records)): ?>
            <p>Er zijn nog geen records opgeslagen.</p>
        <?php else: ?>
            <p>Totaal aantal records: <?= count($records) ?></p>

            <?php foreach ($records as $record): ?>
                <div class="record-card">
                    <div class="student-info">
                        <h2>Student: <?= htmlspecialchars($record['name']) ?></h2>
                        <p><strong>Studentnummer:</strong> <?= htmlspecialchars($record['studentNumber']) ?></p>
                        <p><strong>Klas:</strong> <?= htmlspecialchars($record['class']) ?></p>
                    </div>

                    <h3>Vakken en cijfers</h3>
                    <table class="grades-table">
                        <thead>
                            <tr>
                                <th>Vak</th>
                                <th>Cijfer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($record['classesGrades'] as $subject => $grade): ?>
                                <tr>
                                    <td><?= htmlspecialchars($subject) ?></td>
                                    <td><?= htmlspecialchars($grade) ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>

                    <div class="average">
                        <p>
                            Gemiddeld cijfer:
                            <span class="grade-<?= $record['averageGrade'] >= 5.5 ? 'green' : 'red' ?>">
                                <?= $record['averageGrade'] ?>
                            </span>
                        </p>
                    </div>

                    <div class="timestamp">
                        Opgeslagen op: <?= htmlspecialchars($record['timestamp']) ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>

        <p><a href="index.php" class="back-link">Terug naar formulier</a></p>
        <p><a href="../.." class="back-link" id="hoofdmenu">Terug naar hoofdmenu</a></p>
    </div>
</body>

</html>