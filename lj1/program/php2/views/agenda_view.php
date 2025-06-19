<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Crud Agenda</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <?php
    function formateerDatum($datum_string) {
        if (empty($datum_string)) return "";
        $datum = new DateTime($datum_string);
        return $datum->format("d-m-Y H:i");
    }
    ?>

    <div class="container mt-4">
        <h1 class="mb-4">Agenda Overzicht</h1>

        <?php if (isset($fout)) { ?>
            <div class="alert alert-danger" role="alert">
                <strong>Fout:</strong> <?= htmlspecialchars($fout) ?>
            </div>
        <?php } ?>

        <?php if ($aantal_rijen > 0) { ?>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Titel</th>
                            <th scope="col">Omschrijving</th>
                            <th scope="col">Begin Datum</th>
                            <th scope="col">Eind Datum</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Prioriteit</th>
                            <th scope="col">Status</th>
                            <th scope="col">Acties</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($resultaat as $rij) { ?>
                            <tr>
                                <td><strong><?= htmlspecialchars($rij["ID"]) ?></strong></td>
                                <td><strong><?= htmlspecialchars($rij["titel"]) ?></strong></td>
                                <td><?= htmlspecialchars($rij["omschrijving"]) ?></td>
                                <td><?= formateerDatum($rij["begin_datum"]) ?></td>
                                <td><?= formateerDatum($rij["eind_datum"]) ?></td>

                                <?php 
                                    $tags = !empty($rij["tags"]) ? htmlspecialchars($rij["tags"]) : "Geen tags";
                                    $gescheiden_tags = explode(", ", $tags);
                                    $geformatteerde_tags = array_map("trim", $gescheiden_tags);
                                    $geformatteerde_tags = implode(", ", $geformatteerde_tags);
                                ?>

                                <td><?= $geformatteerde_tags ?></td>
                                <td><?= htmlspecialchars($rij["prioriteit"] ?? "N/A") ?></td>
                                <td><?= htmlspecialchars($rij["status"] ?? "") ?></td>
                                <td>
                                    <a href="./agenda_item.php?ID=<?= $rij["ID"] ?>"
                                        class="btn btn-primary btn-sm me-1">Bekijken</a>
                                    <a href="./agenda_aanpassen.php?ID=<?= $rij["ID"] ?>"
                                        class="btn btn-primary btn-sm me-1">Bewerken</a>
                                    <a href="./agenda_verwijderen.php?ID=<?= $rij["ID"] ?>"
                                        class="btn btn-danger btn-sm">Verwijderen</a>
                                </td>
                            </tr>
                        <?php } ?>
                            <tr>
                                <td colspan="9" class="text-center">
                                    <a href="./agenda_toevoegen.php" class="btn btn-success">Nieuw Agenda Item Toevoegen</a>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        <?php } else { ?>
            <div class="alert alert-info" role="alert">
                <h4 class="alert-heading">Geen resultaten!</h4>
                <p class="mb-0">Er zijn momenteel geen agenda items beschikbaar.</p>
            </div>
        <?php } ?>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>