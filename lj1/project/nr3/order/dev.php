<?php
session_start();

if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
	header('Location: ../cart/');
	exit;
}

$subtotal = 0;
$shippingCost = 4.95;

foreach ($_SESSION['cart'] as $item) {
    $subtotal += $item['price'] * $item['quantity'];
}

$total = $subtotal + $shippingCost;

$subtotalFormatted = number_format($subtotal, 2, ',', '.');
$shippingFormatted = number_format($shippingCost, 2, ',', '.');
$totalFormatted = number_format($total, 2, ',', '.');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>LeafLoom - Betaling</title>
		<link rel="stylesheet" href="../assets/css/styles.css">
		<link rel="stylesheet" href="../assets/css/animations.css">
		<link rel="stylesheet" href="../assets/css/order.css">
		<link rel="stylesheet" href="../assets/css/responsive.css">
		<!-- <style>
			.error-message {
				color: #BC4749;
				font-size: 0.8rem;
				margin-top: 5px;
			}
			.input-error {
				border-color: #BC4749 !important;
			}
		</style> -->
	</head>
	<body>
		<header>
			<div class="header-items">
				<div class="hamburger-menu">
					<div class="hamburger-icon">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div class="header-links">
					<a href="#">Over ons</a>
					<a href="#">Contact</a>
					<a href="#">Inloggen</a>
					<a href="#">Registreren</a>
				</div>
			</div>
			<a href="..">Home</a>
			<div class="cart-logo">
				<a href="../cart/">
					<img src="../assets/img/cart.svg" class="cart" alt="Winkelwagentje">
				</a>
				<a href="..">
					<img src="../assets/logo.png" class="logo" alt="Logo">
				</a>
			</div>
		</header>

		<nav>
			<div class="nav-dropdown-toggle">
				<span>Categorieën</span>
				<i class="fas fa-chevron-down"></i>
			</div>
			<div class="nav-links">
				<a href="#kamerplanten">Kamerplanten</a>
				<a href="#Tuinplanten">Tuinplanten</a>
				<a href="#Grote-planten">Grote planten</a>
				<a href="#Kleine-planten">Kleine planten</a>
			</div>
		</nav>
		<section class="order-container">
			<div class="order-header">
				<h1>Aflevergegevens</h1>
				<p>Vul je gegevens in om je bestelling af te ronden.</p>
				<?php if (isset($errors)): ?>
					<p><strong>Controleer je gegevens. Er zijn fouten gevonden.</strong></p>
				<?php else: ?>

					<p></p>
				<?php endif; ?>
				<!-- <p><strong>Controleer je gegevens. Er zijn fouten gevonden.</strong></p> -->
			</div>
			<form id="payment-form" class="payment-form" method="post" action="index.php">
				<div class="form-group">
					<h2>Persoonlijke gegevens</h2>
					<div class="form-row">
						<div class="form-field">
							<label for="firstName">Voornaam *</label>
							<input type="text" id="firstName" name="firstName" 
								class="<?= isset($errors['firstName']) ? 'input-error' : '' ?>"
								value="<?= htmlspecialchars($_POST['firstName'] ?? '') ?>">
							<?php if (isset($errors['firstName'])): ?>
								<div class="error-message"><?= $errors['firstName'] ?></div>
							<?php endif; ?>
						</div>
						<div class="form-field">
							<label for="lastName">Achternaam *</label>
							<input type="text" id="lastName" name="lastName"
								class="<?= isset($errors['lastName']) ? 'input-error' : '' ?>"
								value="<?= htmlspecialchars($_POST['lastName'] ?? '') ?>">
							<?php if (isset($errors['lastName'])): ?>
								<div class="error-message"><?= $errors['lastName'] ?></div>
							<?php endif; ?>
						</div>
					</div>
					<div class="form-row">
						<div class="form-field">
							<label for="email">E-mailadres *</label>
							<input type="text" id="email" name="email"
								class="<?= isset($errors['email']) ? 'input-error' : '' ?>"
								value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
							<?php if (isset($errors['email'])): ?>
								<div class="error-message"><?= $errors['email'] ?></div>
							<?php endif; ?>
						</div>
						<div class="form-field">
							<label for="text">Telefoonnummer</label>
							<input type="text" id="phone" name="phone" pattern="[0-9]{10}"
								value="<?= htmlspecialchars($_POST['phone'] ?? '') ?>">
							<small>Optioneel, alleen cijfers (10 tekens)</small>
						</div>
					</div>
				</div>
				
				<div class="form-group">
					<h2>Adresgegevens</h2>
					<div class="form-row">
						<div class="form-field full-width">
							<label for="streetAddress">Straat en huisnummer *</label>
							<input type="text" id="streetAddress" name="streetAddress"
								class="<?= isset($errors['streetAddress']) ? 'input-error' : '' ?>"
								value="<?= htmlspecialchars($_POST['streetAddress'] ?? '') ?>">
							<?php if (isset($errors['streetAddress'])): ?>
								<div class="error-message"><?= $errors['streetAddress'] ?></div>
							<?php endif; ?>
						</div>
					</div>
					<div class="form-row">
						<div class="form-field">
							<label for="postalCode">Postcode *</label>
							<input type="text" id="postalCode" name="postalCode" pattern="[0-9]{4}\s?[A-Za-z]{2}"
								class="<?= isset($errors['postalCode']) ? 'input-error' : '' ?>"
								value="<?= htmlspecialchars($_POST['postalCode'] ?? '') ?>">
							<?php if (isset($errors['postalCode'])): ?>
								<div class="error-message"><?= $errors['postalCode'] ?></div>
							<?php endif; ?>
							<small>Bijvoorbeeld: 1234 AB</small>
						</div>
						<div class="form-field">
							<label for="city">Plaats *</label>
							<input type="text" id="city" name="city"
								class="<?= isset($errors['city']) ? 'input-error' : '' ?>"
								value="<?= htmlspecialchars($_POST['city'] ?? '') ?>">
							<?php if (isset($errors['city'])): ?>
								<div class="error-message"><?= $errors['city'] ?></div>
							<?php endif; ?>
						</div>
					</div>
				</div>
				
				<div class="form-group payment-methods">
					<h2>Betaalmethode</h2>
					<div class="payment-options">
						<div class="payment-option">
							<input type="radio" id="ideal" name="paymentMethod" value="ideal" 
								<?= (!isset($_POST['paymentMethod']) || $_POST['paymentMethod'] === 'ideal') ? 'checked' : '' ?>>
							<label for="ideal">iDEAL</label>
						</div>
						<div class="payment-option">
							<input type="radio" id="creditcard" name="paymentMethod" value="creditcard"
								<?= (isset($_POST['paymentMethod']) && $_POST['paymentMethod'] === 'creditcard') ? 'checked' : '' ?>>
							<label for="creditcard">Creditcard</label>
						</div>
						<div class="payment-option">
							<input type="radio" id="paypal" name="paymentMethod" value="paypal"
								<?= (isset($_POST['paymentMethod']) && $_POST['paymentMethod'] === 'paypal') ? 'checked' : '' ?>>
							<label for="paypal">PayPal</label>
						</div>
					</div>
					<?php if (isset($errors['paymentMethod'])): ?>
						<div class="error-message"><?= $errors['paymentMethod'] ?></div>
					<?php endif; ?>
				</div>
				
				<div class="order-summary">
					<h2>Besteloverzicht</h2>
					<?php foreach ($_SESSION['cart'] as $productId => $item): ?>
						<div class="summary-line">
							<span><?= htmlspecialchars($item['name']) ?> (<?= $item['quantity'] ?>x)</span>
							<span>€<?= number_format($item['price'] * $item['quantity'], 2, ',', '.') ?></span>
						</div>
					<?php endforeach; ?>
					<div class="summary-line">
						<span>Subtotaal:</span>
						<span>€<?= $subtotalFormatted ?></span>
					</div>
					<div class="summary-line">
						<span>Verzendkosten:</span>
						<span>€<?= $shippingFormatted ?></span>
					</div>
					<div class="summary-line total">
						<span>Totaal te betalen:</span>
						<span>€<?= $totalFormatted ?></span>
					</div>
				</div>
				
				<div class="form-actions">
					<button type="button" class="back-button" onclick="window.location.href='../cart/';">Terug naar winkelwagen</button>
					<button type="submit" class="submit-button">Bestelling plaatsen</button>
				</div>
				
				<div class="form-notice">
					<p>Velden met een * zijn verplicht</p>
				</div>
			</form>
		</section>
	</body>
	<script src="../assets/js/loading.js"></script>
	<script src="../assets/js/dropdown.js"></script>
</html>