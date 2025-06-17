<!doctype html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../css/dark_mode.css">
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP1 - Oefening 6</title>
</head>

<body>
    <?php if (!empty($error)): ?>
        <div style="color: red;">
            <p><?= htmlspecialchars($error) ?></p>
        </div>
    <?php endif; ?>

    <form action="index_process.php" method="post">
        <p><label for="name">Wat is je naam?: </label><input type="text" name="name" id="name"></p>
        <p><label for="age">Wat is je leeftijd?: </label><input type="number" name="age" id="age"></p>
        <p><input type="submit" name="submit" value="verzenden"></p>
    </form>
    <p><a href="../..">ga terug</a></p>
</body>

</html>