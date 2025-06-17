<!doctype html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../css/dark_mode.css">
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP1 - Opdracht 1</title>
</head>

<body>
    <h2>Hallo mijn naam is <?= $name ?>.</h2>
    <p>
        Mijn studenten nummer is <?= $stuNum ?>.
        En ik zit in klas <?= $class ?>.
    </p>
    <h3>Mijn vakken met cijfers:</h3>
    <ul>
        <?php foreach ($classGrades as $class => $grade): ?>
            <li><?= $class ?>: <?= $grade ?></li>
        <?php endforeach; ?>
    </ul>
    <p><a href="../..">ga terug</a></p>
</body>

</html>