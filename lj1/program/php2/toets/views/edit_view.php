<?php

require_once "tools/helpers.php";

?>

<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>PHP Score Overviews - Bewerken</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-4">
        <h1 class="mb-4">Game Score Bewerken</h1>

        <?php if (isset($fout)) { ?>
            <div class="alert alert-danger" role="alert">
                <strong>Fout:</strong> <?= htmlspecialchars($fout) ?>
            </div>
        <?php } ?>

        <?php if (isset($game_score)) { ?>
            <div class="card">
                <div class="card-body">
                    <form method="POST" action="">
                        <div class="mb-3">
                            <label for="name" class="form-label">Naam *</label>
                            <input type="text" 
                                   class="form-control" 
                                   id="name" 
                                   name="name" 
                                   value="<?= htmlspecialchars($game_score['name'] ?? '') ?>" 
                                   required>
                        </div>

                        <div class="mb-3">
                            <label for="score" class="form-label">Score *</label>
                            <input type="number" 
                                   class="form-control" 
                                   id="score" 
                                   name="score" 
                                   value="<?= htmlspecialchars($game_score['score'] ?? '') ?>" 
                                   min="0" 
                                   required>
                        </div>

                        <div class="mb-3">
                            <div class="form-check">
                                <input type="checkbox" 
                                       class="form-check-input" 
                                       id="robot" 
                                       name="robot" 
                                       value="1"
                                       <?= ($game_score['robot'] ?? false) ? 'checked' : '' ?>>
                                <label class="form-check-label" for="robot">
                                    Robot
                                </label>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">UUID (alleen-lezen)</label>
                            <input type="text" 
                                   class="form-control" 
                                   value="<?= htmlspecialchars($game_score['uuid'] ?? '') ?>" 
                                   readonly>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Ontvangen datum (alleen-lezen)</label>
                            <input type="text" 
                                   class="form-control" 
                                   value="<?= timestampToDate($game_score['received_date'] ?? 0) ?>" 
                                   readonly>
                        </div>

                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-primary">Opslaan</button>
                            <a href="./details.php?id=<?= htmlspecialchars($game_score['id']) ?>" class="btn btn-secondary">Annuleren</a>
                            <a href="./scores.php" class="btn btn-outline-secondary">Terug naar overzicht</a>
                        </div>
                    </form>
                </div>
            </div>
        <?php } else { ?>
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">Geen gegevens gevonden!</h4>
                <p class="mb-0">De game score kon niet worden gevonden.</p>
                <hr>
                <p class="mb-0">
                    <a href="./scores.php" class="btn btn-primary">Terug naar overzicht</a>
                </p>
            </div>
        <?php } ?>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>