<!doctype html>
<html lang="en">

<head>
	<link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="../../css/dark_mode.css">
	<link rel="stylesheet" href="./css/styles.css">
	<meta charset="UTF-8">
	<meta name="viewport"
		content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>PHP1 - Opdracht 4</title>
</head>

<body>
	<fieldset>
		<legend>Opdracht 4 - Solicitatie pagina</legend>
		<form action="index_process.php" method="post">
			<p>
				<label for="voornaam">Uw voornaam:</label>
				<input type="text" name="voornaam" id="voornaam" placeholder="Jan" minlength="2" maxlength="31"
					required>
				<span <?php if (!isset($errors['voornaam'])) { ?> class="hidden" <?php } ?> style="color: red;">
					<?= $errors['voornaam'] ?>
				</span>
			<p>
				<label for="achternaam">Uw achternaam:</label>
				<input type="text" name="achternaam" id="achternaam" minlength="2" maxlength="31" placeholder="Doorn"
					required>
				<span <?php if (!isset($errors['achternaam'])) { ?> class="hidden" <?php } ?> style="color: red;">
					<?= $errors['achternaam'] ?>
				</span>
			</p>
			<p>
				<label for="tussenvoegsel">Uw tussenvoegsel:</label>
				<input type="text" name="tussenvoegsel" id="tussenvoegsel" placeholder="van" maxlength="11">
				<span <?php if (!isset($errors['tussenvoegsel'])) { ?> class="hidden" <?php } ?> style="color: red;">
					<?= $errors['tussenvoegsel'] ?>
				</span>
			</p>
			<p>
				<label for="email">Uw e-mailadres:</label>
				<input type="email" name="email" id="email" placeholder="mail@domain.com"
					pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" maxlength="63" required>
				<span <?php if (!isset($errors['email'])) { ?> class="hidden" <?php } ?> style="color: red;">
					<?= $errors['email'] ?>
				</span>
			</p>
			<p>
				<label for="telefoonNummer">Uw telefoonnummer:</label>
				<input type="tel" name="telefoonNummer" id="telefoonNummer" placeholder="0612345678"
					pattern="^(06|01|07)[0-9]{8}$"
					title="Voer een geldig Nederlands telefoonnummer in (10 cijfers, beginnend met 06, 01 of 07)"
					required>
				<span <?php if (!isset($errors['telefoonNummer'])) { ?> class="hidden" <?php } ?> style="color: red;">
					<?= $errors['telefoonNummer'] ?>
				</span>
			</p>
			<p>
				<label for="straatnaam">Uw straatnaam:</label>
				<input type="text" name="straatnaam" id="straatnaam" placeholder="Straatnaam" maxlength="63" required>
				<span <?php if (!isset($errors['straatnaam'])) { ?> class="hidden" <?php } ?> style="color: red;">
					<?= $errors['straatnaam'] ?>
				</span>
			</p>
			<p>
				<label for="huisnummer">Uw huisnummer:</label>
				<input type="text" name="huisnummer" id="huisnummer" placeholder="123" pattern="[0-9]{1,5}"
					title="Voer een huisnummer in (alleen cijfers)" required>
				<span <?php if (!isset($errors['huisnummer'])) { ?> class="hidden" <?php } ?>
					styrequiredle="color: red;">
					<?= $errors['huisnummer'] ?>
				</span>
			</p>
			<p>
				<label for="bsn">Uw BSN-nummer</label>
				<input type="text" name="bsn" id="bsn" placeholder="123456789" pattern="[0-9]{9}" minlength="9"
					maxlength="9" title="Een BSN bestaat uit 9 cijfers" required>
				<span>
					<strong>LET OP: </strong> Dit is een oefening, vul hier niet je echte BSN in!
					<strong>TIP: </strong> Een BSN is deelbaar door 11 en is 9 cijfers lang.
				</span>
				<span <?php if (!isset($errors['bsn'])) { ?> class="hidden" <?php } ?> style="color: red;">
					<?= $errors['bsn'] ?>
				</span>
			</p>
			<p>
				<label for="vacature">Selecteer een vacature:</label>
				<select name="vacature" id="vacature" required>
					<option value="" disabled selected>-- Kies een vacature --</option>
					<?php foreach ($vacatures as $key => $value) { ?>
						<option value="<?= $key ?>"> <?= $value ?> </option>
					<?php } ?>
				</select>
				<span <?php if (!isset($errors['vacature'])) { ?> class="hidden" <?php } ?> style="color: red;">
					<?= $errors['vacature'] ?>
				</span>
			</p>

			<input type="submit" value="verzenden">
		</form>
	</fieldset>
	<p><a href="records.php">Bekijk de ingediend sollicitaties</a></p>
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