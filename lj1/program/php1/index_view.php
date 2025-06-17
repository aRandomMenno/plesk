<!doctype html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/dark_mode.css">
    <title>PROGRAM1 - PHP1</title>
</head>

<body>
    <h1>Hallo en welkom bij PHP :)</h1>
    <p>
        Mijn naam is <?= $myName ?>, en ik zit in klas <?= $myClass ?>. And I am <?= $myAge ?> years old.
    </p>
    <h2>Oefeningen</h2>
    <ul>
        <?php
        for ($i = 1; $i <= $numberOfExercises; $i++): ?>
            <li><a href="oefening/<?= $i ?>/">Oefening <?= $i ?></a></li>
        <?php endfor; ?>
    </ul>

    <h2>Opdrachten</h2>
    <ul>
        <?php
        for ($i = 1; $i <= $numberOfAssignments; $i++):
            if ($i == 4) { ?>
                <li><a href="opdracht/<?= $i ?>/">Opdracht <?= $i ?> + 6</a></li>
            <?php } ?>
            <li><a href="opdracht/<?= $i ?>/">Opdracht <?= $i ?></a></li>
        <?php endfor; ?>
    </ul>
</body>

</html>