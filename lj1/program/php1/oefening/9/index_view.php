<!doctype html>
<html lang="en">

<head>
    <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../../css/dark_mode.css">
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP1 - Oefening 9</title>
</head>

<body>
    <h2 class="error"><?= $error ?></h2>
    <h2 class="success"><?= $success ?></h2>
    <?php if (!empty($errors)): ?>
        <ul style="color: red;">
            <?php foreach ($errors as $field => $errorMsg) { ?>
                <li><?= htmlspecialchars($errorMsg) ?></li>
            <?php } ?>
        <?php endif; ?>
    </ul>

    <fieldset>
        <legend>Oefening 9 - Simpel invoerformulier</legend>
        <form action="index_process.php" method="post">
            <p>
                <label for="name">Uw voornaam:</label>
                <input type="text" name="name" id="name" placeholder="Jan" required>
            </p>
            <p>
                <label for="surname">Uw achternaam:</label>
                <input type="text" name="surname" id="surname" placeholder="Pieter" required>
            </p>
            <p>
                <label for="date">Uw geboortedatum:</label>
                <input type="date" name="date" id="date" required>
            </p>
            <input type="submit" value="verzenden">
        </form>
    </fieldset>
    <p><a href="../..">ga terug</a></p>
</body>

<style>
    fieldset {
        border-radius: 16px;
        border: 2px solid #1a1a1a;

    }

    @media (prefers-color-scheme: dark) {
        fieldset {
            border-radius: 16px;
            border: 2px solid #f8f8f8;
        }
    }

    legend {
        padding: 2px 12px;
        margin-left: 32px;
        font-size: 1.35em;
    }

    .success {
        color: green;
    }
</style>

</html>