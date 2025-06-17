<!doctype html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../css/dark_mode.css">
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP1 - Oefening 4</title>
</head>

<body>
    <h2>Games die ik speel: (foreach)</h2>
    <ul>
        <?php
        foreach ($gamesList as $game) { ?>
            <li><?= $game ?></li>
        <?php }
        ?>
    </ul>
    <h2>Andere games die ik speel: (for)</h2>
    <ul>
        <?php
        for ($index = 0; $index < count($otherGamesList); $index++) { ?>
            <li><?= $otherGamesList[$index] ?></li>
        <?php }
        ?>
    </ul>
    <p><a href="../..">ga terug</a></p>
</body>

</html>