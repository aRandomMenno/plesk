<!doctype html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../css/dark_mode.css">
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP1 - Oefening 7</title>
</head>

<body>
    <h2>Informatie</h2>
    <ul>
        <?php foreach ($data as $key => $value): ?>
            <li><strong><?= htmlspecialchars(ucfirst($key)) ?>:</strong>
                <?= $key === "password" ? "[HIDDEN]" : htmlspecialchars($value) ?></li>
        <?php endforeach; ?>
    </ul>
</body>

</html>