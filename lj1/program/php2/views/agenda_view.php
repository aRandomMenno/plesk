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
    function formatDate($dateString) {
        if (empty($dateString)) return "";
        $date = new DateTime($dateString);
        return $date->format("d-m-Y H:i");
    }
    ?>

    <div class="container mt-4">
        <h1 class="mb-4">Agenda Overzicht</h1>

        <?php if (isset($error)) { ?>
            <div class="alert alert-danger" role="alert">
                <strong>Fout:</strong> <?= htmlspecialchars($error) ?>
            </div>
        <?php } ?>

        <?php if ($amountOfRows > 0) { ?>
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
                        <?php foreach ($result as $row) { ?>
                            <tr>
                                <td><strong><?= htmlspecialchars($row["ID"]) ?></strong></td>
                                <td><strong><?= htmlspecialchars($row["titel"]) ?></strong></td>
                                <td><?= htmlspecialchars($row["omschrijving"]) ?></td>
                                <td><?= formatDate($row["begin_datum"]) ?></td>
                                <td><?= formatDate($row["eind_datum"]) ?></td>

                                <?php 
                                    $tags = !empty($row["tags"]) ? htmlspecialchars($row["tags"]) : "Geen tags";
                                    $seperatedTags = explode(", ", $tags);
                                    $formattedTags = array_map("trim", $seperatedTags);
                                    $formattedTags = implode(", ", $formattedTags);
                                ?>

                                <td><?= $formattedTags ?></td>
                                <td><?= htmlspecialchars($row["prioriteit"] ?? "N/A") ?></td>
                                <td><?= htmlspecialchars($row["status"] ?? "") ?></td>
                                <td>
                                    <a href="./agenda_item.php?ID=<?= $row["ID"] ?>"
                                        class="btn btn-primary btn-sm me-1">Bekijken</a>
                                    <a href="./agenda_aanpassen.php?ID=<?= $row["ID"] ?>"
                                        class="btn btn-primary btn-sm me-1">Bewerken</a>
                                    <a href="./agenda_verwijderen.php?ID=<?= $row["ID"] ?>"
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