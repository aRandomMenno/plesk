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
        <h1 class="mb-4">Game scores overzicht</h1>

        <?php if (isset($fout)) { ?>
            <div class="alert alert-danger" role="alert">
                <strong>Fout:</strong> <?= htmlspecialchars($fout) ?>
            </div>
        <?php }
        $rank = 1;
        ?>

        <?php if ($aantal_rijen > 0) { ?>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">Rank</th>
                            <th scope="col">Naam</th>
                            <th scope="col">Score</th>
                            <th scope="col">Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($data as $rij) { ?>
                            <tr>
                                <td><?= $rank ?></td>
                                <td><strong><?= htmlspecialchars($rij["name"]) ?></strong></td>
                                <td><?= htmlspecialchars($rij["score"]) ?></td>
                                <td>
                                    <a href="./details.php?id=<?= htmlspecialchars($rij['id']) ?>"
                                        class="btn btn-info btn-sm">Details</a>
                                    <a href="./edit.php?id=<?= htmlspecialchars($rij['id']) ?>"
                                        class="btn btn-warning btn-sm">Bewerken</a>
                                </td>
                            </tr>
                            <?php $rank++;
                        } ?>
                        <tr>
                            <td colspan="9" class="text-center">
                                <a href="./add.php" class="btn btn-primary">Nieuwe score toevoegen</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        <?php } else { ?>
            <div class="alert alert-info" role="alert">
                <h4 class="alert-heading">Geen resultaten!</h4>
                <p class="mb-0">Er zijn momenteel geen game scores beschikbaar.</p>
            </div>
        <?php } ?>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>