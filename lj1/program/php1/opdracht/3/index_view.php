<!doctype html>
<html lang="en">

<head>
	<link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
	<link rel="stylesheet" href="../../css/dark_mode.css">
	<meta charset="UTF-8">
	<meta name="viewport"
		content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>PHP1 - Opdracht 3</title>
</head>

<body>
	<div id="error_message" <?php
	if ($error == '') { ?> hidden <?php }
	?>>
		<?= htmlspecialchars($error) ?>
	</div>
	<form action="index_process.php" method="POST">
		<p>
			<label for="name">Wat is je naam?: </label>
			<input type="text" name="name" id="name" required>
		</p>
		<p>
			<label for="student_number">Wat is je student nummer?: </label>
			<input type="text" name="student_number" id="student_number" required pattern="[0-9]{6}" maxlength="6"
				inputmode="numeric">
		</p>
		<p>
			<label for="class">In welke klas zit je?: </label>
			<input type="text" name="class" id="class" required pattern="D[1-3][A-F][1-2]" value="D" maxlength="4">
		</p>

		<h2><label for="courses">Voor welke 4 vakken heb je de hoogste cijfers?</label> </h2>
		<p>
			Vak: <input type="text" name="class_1" id="class_1" required>,
			gemiddeld cijfer: <input type="number" name="grade_1" id="grade_1" required step="0.1" max="10.0" min="1.0">
		</p>
		<p>
			Vak: <input type="text" name="class_2" id="class_2" required>,
			gemiddeld cijfer: <input type="number" name="grade_2" id="grade_2" required step="0.1" max="10.0" min="1.0">
		</p>
		<p>
			Vak: <input type="text" name="class_3" id="class_3" required>,
			gemiddeld cijfer: <input type="number" name="grade_3" id="grade_3" required step="0.1" max="10.0" min="1.0">
		</p>
		<p>
			Vak: <input type="text" name="class_4" id="class_4" required>,
			gemiddeld cijfer: <input type="number" name="grade_4" id="grade_4" required step="0.1" max="10.0" min="1.0">
		</p>
		<p>
			<input type="submit" name="submit" value="verzenden">
		</p>
	</form>
	<p><a href="index_records.php">Bekijk alle opgeslagen records</a></p>
	<p><a href="../..">ga terug</a></p>
</body>

</html>