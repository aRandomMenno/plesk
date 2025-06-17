<!doctype html>
<html lang="en">

<head>
	<link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="../../css/dark_mode.css">
	<meta charset="UTF-8">
	<meta name="viewport"
		content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>PHP1 - Oefening 7</title>
</head>

<body>
	<?php if (!empty($error)): ?>
		<div style="color: red;">
			<p><?= htmlspecialchars($error) ?></p>
		</div>
	<?php endif; ?>

	<?php if (!empty($errors)): ?>
		<ul style="color: red;">
			<?php foreach ($errors as $field => $errorMsg) { ?>
				<li><?= htmlspecialchars($errorMsg) ?></li>
			<?php } ?>
		</ul>
	<?php endif; ?>

	<form id="userForm" action="index_process.php" method="post" novalidate>
		<p>
			<label for="name">Wat is je naam?: </label>
			<input type="text" name="name" id="name" required>
		</p>
		<p>
			<label for="age">Wat is je leeftijd?: </label>
			<input type="number" name="age" id="age" required min="1" max="100">
		</p>
		<p>
			<label for="email">Wat is je E-mailadres?: </label>
			<input type="email" name="email" id="email" required>
		</p>
		<p>
			<label for="tel">Wat is je telefoon nummer?: </label>
			<input type="tel" name="tel" id="tel" required pattern="^[0-9+\s\-()]{10,15}$">
		</p>
		<p>
			<label for="date">Wat je geboortedatum?:</label>
			<input type="date" name="date" id="date" required>
		</p>
		<p>
			<label for="password">Stel een wachtwoord in:</label>
			<input type="password" name="password" id="password" required minlength="12"
				pattern="^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[^A-Za-z0-9].*[^A-Za-z0-9]).{12,}$"
				title="Password must be at least 12 characters long and contain at least 2 uppercase letters, 2 numbers, and 2 special characters">
		</p>
		<p>
			<label for="bio">Stel een biografie in: (min 100 woorden)</label><br>
			<textarea name="bio" id="bio" cols="50" rows="5" required></textarea>
			<span class="error" id="bioError"></span>
		</p>
		<p>
			<input type="submit" name="submit" value="verzenden">
		</p>
	</form>
	<p><a href="../..">ga terug</a></p>
	<script src="./js/bio_word_count.js"></script>
</body>

</html>