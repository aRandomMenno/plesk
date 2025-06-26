<?php

require_once "tools/helpers.php";

?>

<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Nieuwe Score Toevoegen</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white">
                        <h2 class="card-title mb-0">
                            <i class="bi bi-plus-circle me-2"></i>
                            Nieuwe Game Score Toevoegen
                        </h2>
                    </div>
                    <div class="card-body">
                        <!-- display success message if score was added -->
                        <?php if (isset($success)) { ?>
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <i class="bi bi-check-circle me-2"></i>
                                <strong>Gelukt!</strong> <?= htmlspecialchars($success) ?>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        <?php } ?>

                        <!-- display error message if there was an issue -->
                        <?php if (isset($fout)) { ?>
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <i class="bi bi-exclamation-triangle me-2"></i>
                                <strong>Fout:</strong> <?= htmlspecialchars($fout) ?>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        <?php } ?>

                        <!-- create the form for adding new scores -->
                        <form method="POST" action="add.php" class="needs-validation" novalidate>
                            <div class="mb-3">
                                <label for="name" class="form-label">
                                    <i class="bi bi-person me-1"></i>
                                    Speler Naam *
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="name" 
                                    name="name" 
                                    value="<?= isset($name) ? htmlspecialchars($name) : "" ?>"
                                    required
                                    maxlength="100"
                                    placeholder="Voer de naam van de speler in"
                                >
                                <div class="invalid-feedback">
                                    Naam is verplicht en mag maximaal 100 karakters bevatten.
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="score" class="form-label">
                                    <i class="bi bi-trophy me-1"></i>
                                    Score *
                                </label>
                                <input 
                                    type="number" 
                                    class="form-control" 
                                    id="score" 
                                    name="score" 
                                    value="<?= isset($score) ? htmlspecialchars($score) : "" ?>"
                                    required
                                    min="0"
                                    step="1"
                                    placeholder="Voer de behaalde score in"
                                >
                                <div class="invalid-feedback">
                                    Score is verplicht en moet een positief getal zijn.
                                </div>
                            </div>

                            <div class="mb-4">
                                <div class="form-check">
                                    <input 
                                        type="checkbox" 
                                        class="form-check-input" 
                                        id="robot" 
                                        name="robot"
                                        <?= (isset($robot) && $robot) ? "checked" : "" ?>
                                    >
                                    <label class="form-check-label" for="robot">
                                        <i class="bi bi-robot me-1"></i>
                                        Dit is een robot speler
                                    </label>
                                </div>
                                <small class="form-text text-muted">
                                    Vink aan als deze score door een geautomatiseerde speler (bot) is behaald.
                                </small>
                            </div>

                            <!-- show information about auto-generated fields -->
                            <div class="alert alert-info mb-4">
                                <h6 class="alert-heading">
                                    <i class="bi bi-info-circle me-1"></i>
                                    Automatisch gegenereerde velden:
                                </h6>
                                <ul class="mb-0 small">
                                    <li><strong>UUID:</strong> Wordt automatisch en veilig gegenereerd voor unieke identificatie</li>
                                    <li><strong>Datum:</strong> Wordt automatisch ingesteld op de huidige datum en tijd</li>
                                </ul>
                            </div>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <a href="scores.php" class="btn btn-secondary me-md-2">
                                    <i class="bi bi-arrow-left me-1"></i>
                                    Terug naar overzicht
                                </a>
                                <button type="submit" class="btn btn-primary">
                                    <i class="bi bi-save me-1"></i>
                                    Score Toevoegen
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // enable Bootstrap form validation
        (function() {
            "use strict";
            window.addEventListener("load", function() {
                const forms = document.getElementsByClassName("needs-validation");
                const validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener("submit", function(event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add("was-validated");
                    }, false);
                });
            }, false);
        })();
    </script>
</body>

</html>
