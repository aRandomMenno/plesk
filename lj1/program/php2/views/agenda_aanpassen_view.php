<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agenda Details - <?= htmlspecialchars($agenda_item["titel"]) ?></title>
    <link href="./node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <?php
    function formateerDatumVoorInput($datum_string) {
        if (empty($datum_string)) return "";
        $datum = new DateTime($datum_string);
        return $datum->format("Y-m-d\TH:i");
    }
    ?>

    <div class="container mt-4">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h1>Agenda Details</h1>
                    <a href="agenda.php" class="btn btn-secondary">Terug naar overzicht</a>
                </div>

                <?php if (isset($fout)) { ?>
                    <div class="alert alert-danger" role="alert">
                        <strong>Fout:</strong> <?= htmlspecialchars($fout) ?>
                    </div>
                <?php } ?>

                <div class="card">
                    <div class="card-header">
                        <h5 class="card-title mb-0">Agenda Item #<?= htmlspecialchars($agenda_item["ID"]) ?></h5>
                    </div>
                    <div class="card-body">
                        <form method="POST">
                            <div class="mb-3">
                                <label for="titel" class="form-label">Titel</label>
                                <input type="text" class="form-control" id="titel" name="titel"
                                    value="<?= htmlspecialchars($agenda_item["titel"]) ?>" required
                                    maxlength="32" minlength="3">
                                <div class="form-text">3-32 karakters</div>
                                <div class="invalid-feedback">
                                    Titel moet tussen 3-32 karakters bevatten.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="omschrijving" class="form-label">Omschrijving</label>
                                <textarea class="form-control" id="omschrijving" name="omschrijving" rows="4"
                                    required maxlength="256" minlength="10"><?= htmlspecialchars($agenda_item["omschrijving"]) ?></textarea>
                                <div class="form-text">10-256 karakters</div>
                                <div class="invalid-feedback">
                                    Omschrijving moet tussen 10-256 karakters bevatten.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="tags" class="form-label">Tags</label>
                                <input type="text" class="form-control" id="tags" name="tags"
                                    value="<?= htmlspecialchars($agenda_item["tags"] ?? "") ?>"
                                    placeholder="Voer tags in, gescheiden door komma's">
                                <div class="form-text">Maximaal 5 tags, gescheiden door komma's</div>
                                <div class="invalid-feedback">
                                    Maximaal 5 tags toegestaan.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="prioriteit" class="form-label">Prioriteit</label>
                                <input type="number" class="form-control" id="prioriteit" name="prioriteit"
                                    value="<?= htmlspecialchars($agenda_item["prioriteit"] ?? "1") ?>" required min="1">
                                <div class="form-text">Geef een prioriteitsniveau op (minimaal 1).</div>
                                <div class="invalid-feedback">
                                    Prioriteit moet minimaal 1 zijn.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="status" class="form-label">Status (optioneel)</label>
                                <select class="form-control" id="status" name="status">
                                    <option value="">Selecteer status</option>
                                    <option value="aankomend" <?= ($agenda_item["status"] ?? "") === "aankomend" ? "selected" : "" ?>>Aankomend</option>
                                    <option value="bezig" <?= ($agenda_item["status"] ?? "") === "bezig" ? "selected" : "" ?>>Bezig</option>
                                    <option value="klaar" <?= ($agenda_item["status"] ?? "") === "klaar" ? "selected" : "" ?>>Klaar</option>
                                    <option value="onbekend" <?= ($agenda_item["status"] ?? "") === "onbekend" ? "selected" : "" ?>>Onbekend</option>
                                </select>
                                <div class="form-text">Kies een status voor dit agenda item</div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="begin_datum" class="form-label">Begin Datum</label>
                                        <input type="datetime-local" class="form-control" id="begin_datum"
                                            name="begin_datum"
                                            value="<?= formateerDatumVoorInput($agenda_item["begin_datum"]) ?>" required>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label for="eind_datum" class="form-label">Eind Datum</label>
                                        <input type="datetime-local" class="form-control" id="eind_datum"
                                            name="eind_datum"
                                            value="<?= formateerDatumVoorInput($agenda_item["eind_datum"]) ?>" required>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex gap-2">
                                <button type="submit" class="btn btn-primary">Opslaan</button>
                                <a href="agenda.php" class="btn btn-secondary">Annuleren</a>
                                <a href="agenda_verwijderen.php?ID=<?= $agenda_item["ID"] ?>"
                                    class="btn btn-danger ms-auto"
                                    onclick="return confirm('Weet je zeker dat je dit item wilt verwijderen?')">Verwijderen</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="./node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            const formulier = document.querySelector("form");
            const begin_datum = document.getElementById("begin_datum");
            const eind_datum = document.getElementById("eind_datum");
            const tags_input = document.getElementById("tags");
            
            function valideerDatums() {
                const begin_waarde = new Date(begin_datum.value);
                const eind_waarde = new Date(eind_datum.value);
                
                if (begin_datum.value && eind_datum.value) {
                    if (eind_waarde <= begin_waarde) {
                        eind_datum.setCustomValidity("Eind datum moet na de begin datum liggen");
                        return false;
                    }
                }
                
                eind_datum.setCustomValidity("");
                return true;
            }
            
            function valideerTags() {
                const tags = tags_input.value.trim();
                if (tags) {
                    const tag_lijst = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
                    if (tag_lijst.length > 5) {
                        tags_input.setCustomValidity("Maximaal 5 tags toegestaan");
                        return false;
                    }
                }
                
                tags_input.setCustomValidity("");
                return true;
            }
            
            begin_datum.addEventListener("change", valideerDatums);
            eind_datum.addEventListener("change", valideerDatums);
            tags_input.addEventListener("input", valideerTags);
            
            formulier.addEventListener("submit", function(e) {
                if (!valideerDatums() || !valideerTags()) {
                    e.preventDefault();
                    formulier.classList.add("was-validated");
                }
            });
            
            formulier.classList.add("needs-validation");
        });
    </script>
</body>

</html>