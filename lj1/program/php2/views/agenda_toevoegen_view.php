<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuw Agenda Item Toevoegen</title>
    <link href="./node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1>Nieuw Agenda Item Toevoegen</h1>
                    <a href="agenda.php" class="btn btn-secondary">Terug naar overzicht</a>
                </div>

                <?php if (isset($error)) { ?>
                <div class="alert alert-danger" role="alert">
                    <strong>Fout:</strong> <?= htmlspecialchars($error) ?>
                </div>
                <?php } ?>

                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Nieuw Agenda Item</h5>
                    </div>
                    <div class="card-body">
                        <form method="POST">
                            <div class="mb-3">
                                <label for="titel" class="form-label">Titel</label>
                                <input type="text" class="form-control" id="titel" name="titel"
                                    value="<?= htmlspecialchars($_POST["titel"] ?? "") ?>" required>
                            </div>

                            <div class="mb-3">
                                <label for="omschrijving" class="form-label">Omschrijving</label>
                                <textarea class="form-control" id="omschrijving" name="omschrijving" rows="4"
                                    required><?= htmlspecialchars($_POST["omschrijving"] ?? "") ?></textarea>
                            </div>

                            <div class="mb-3">
                                <label for="tags" class="form-label">Tags</label>
                                <input type="text" class="form-control" id="tags" name="tags"
                                    value="<?= htmlspecialchars($_POST["tags"] ?? "") ?>"
                                    placeholder="Voer tags in, gescheiden door komma's">
                                <div class="form-text">Voorbeeld: werk, belangrijk, meeting</div>
                            </div>

                            <div class="mb-3">
                                <label for="prioriteit" class="form-label">Prioriteit</label>
                                <input type="number" class="form-control" id="prioriteit" name="prioriteit"
                                    value="<?= htmlspecialchars($_POST["prioriteit"] ?? "1") ?>" required min="1">
                                <div class="form-text">Geef een prioriteitsniveau op (bijv. 1 voor hoog).</div>
                            </div>

                            <div class="mb-3">
                                <label for="status" class="form-label">Status (optioneel)</label>
                                <textarea class="form-control" id="status" name="status" rows="2"
                                    placeholder="Korte notitie over de status"><?= htmlspecialchars($_POST["status"] ?? "") ?></textarea>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="begin_datum" class="form-label">Begin Datum</label>
                                        <input type="datetime-local" class="form-control" id="begin_datum"
                                            name="begin_datum"
                                            value="<?= htmlspecialchars($_POST["begin_datum"] ?? "") ?>" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="eind_datum" class="form-label">Eind Datum</label>
                                        <input type="datetime-local" class="form-control" id="eind_datum"
                                            name="eind_datum"
                                            value="<?= htmlspecialchars($_POST["eind_datum"] ?? "") ?>" required>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-success">Agenda Item Toevoegen</button>
                                <a href="agenda.php" class="btn btn-secondary">Annuleren</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="./node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
</body>

</html>
