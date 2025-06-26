<?php

require_once "tools/helpers.php";

?>

<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>PHP Score Overviews</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-4">
        <?php if (isset($fout)) { ?>
            <div class="alert alert-danger" role="alert">
                <strong>Fout:</strong> <?= htmlspecialchars($fout) ?>
            </div>
        <?php } ?>
       
        <?php if ($detailed_data) { ?>
            <h1 class="mb-4">Game details</h1>
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title"><?= htmlspecialchars($detailed_data['name']) ?></h5>
                    <p class="card-text">Score: <?= htmlspecialchars($detailed_data['score']) ?></p>
                    <p class="card-text">Datum: <?= timestampToDate($detailed_data['received_date']) ?></p>
                    <p class="card-text">UUID: <?= htmlspecialchars($detailed_data['uuid']) ?></p>
                    <p class="card-text">Robot: <?= trueOrFalse($detailed_data['robot']) ?></p>
                    <p class="card-text">
                        <a href="./scores.php" class="btn btn-primary">Terug</a>
                        <a href="./edit.php?id=<?= htmlspecialchars($detailed_data['id']) ?>"
                            class="btn btn-warning">Bewerken</a>
                    </p>
                </div>
            </div>
        <?php } ?>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>