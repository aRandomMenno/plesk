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
	<style>
		table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 20px;
			margin-bottom: 30px;
		}

		th,
		td {
			padding: 12px;
			text-align: left;
			border-bottom: 1px solid #ddd;
		}

		tr:hover {
			background-color: #f1f1f1;
		}

		th {
			background-color: #4CAF50;
			color: white;
		}

		tr:nth-child(even) {
			background-color: #f2f2f2;
		}

		tr:nth-child(odd) {
			background-color: #ffffff;
		}

		@media (prefers-color-scheme: dark) {
			tr:nth-child(even) {
				background-color: #333;
			}

			tr:nth-child(odd) {
				background-color: #222;
			}

			tr:hover {
				background-color: #444;
			}

			th {
				background-color: #2e7d32;
			}
		}

		.no-records {
			text-align: center;
			padding: 20px;
			color: #777;
		}

		.back-link {
			display: block;
			margin-top: 20px;
		}
	</style>
</head>

<body>
	<h1>Alle Sollicitaties</h1>

	<?php if (empty($records)): ?>
		<p class="no-records">Er zijn nog geen sollicitaties ingediend.</p>
	<?php else: ?>
		<table>
			<thead>
				<tr>
					<th>Voornaam</th>
					<th>Tussenvoegsel</th>
					<th>Achternaam</th>
					<th>Email</th>
					<th>Telefoonnummer</th>
					<th>Straatnaam</th>
					<th>Huisnummer</th>
					<th>BSN</th>
					<th>Vacature</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ($records as $record): ?>
					<tr>
						<td><?= htmlspecialchars($record['voornaam']) ?></td>
						<td><?= htmlspecialchars($record['tussenvoegsel']) ?></td>
						<td><?= htmlspecialchars($record['achternaam']) ?></td>
						<td><?= htmlspecialchars($record['email']) ?></td>
						<td><?= htmlspecialchars($record['telefoonNummer']) ?></td>
						<td><?= htmlspecialchars($record['straatnaam']) ?></td>
						<td><?= htmlspecialchars($record['huisnummer']) ?></td>
						<td><?= htmlspecialchars($record['bsn']) ?></td>
						<td><?= isset($vacatures[$record['vacature']]) ? htmlspecialchars($vacatures[$record['vacature']]) : htmlspecialchars($record['vacature']) ?>
						</td>
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	<?php endif; ?>

	<a href="." class="back-link">Terug naar formulier</a>
</body>

</html>