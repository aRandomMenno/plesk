<?php
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

if (isset($_GET['remove']) && isset($_SESSION['cart'][$_GET['remove']])) {
    unset($_SESSION['cart'][$_GET['remove']]);
    header('Location: ./');
    exit;
}

$itemCount = 0;
$subtotal = 0;

foreach ($_SESSION['cart'] as $item) {
    $itemCount += $item['quantity'];
    $subtotal += $item['price'] * $item['quantity'];
}

$subtotalFormatted = number_format($subtotal, 2, ',', '.');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>LeafLoom - Winkelmandje</title>
		<link rel="stylesheet" href="../assets/css/styles.css">
		<link rel="stylesheet" href="../assets/css/animations.css">
		<link rel="stylesheet" href="../assets/css/cart.css">
		<link rel="stylesheet" href="../assets/css/responsive.css">
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
				<a href="..">Home</a>
				<div class="header-links">
					<a href="#">Over ons</a>
					<a href="#">Contact</a>
					<a href="#">Inloggen</a>
					<a href="#">Registreren</a>
				</div>
			</div>
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
		<section class="cart-items">
			<div class="cart-header">
				<h1>Winkelmandje</h1>
				<p>Je hebt <span id="item-count"><?= $itemCount ?></span> artikelen in je winkelmandje.</p>
			</div>
			<form method="post" action="index.php" id="cart-form">
				<input type="hidden" name="update_cart" value="1">
				<div class="cart-item-list">
					<?php if (count($_SESSION['cart']) > 0): ?>
						<?php foreach ($_SESSION['cart'] as $productId => $item): ?>
							<div class="cart-item">
								<img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['name']) ?>">
								<h2><?= htmlspecialchars($item['name']) ?></h2>
								<p>€<?= number_format($item['price'], 2, ',', '.') ?></p>
								<p>Aantal: 
									<input type="number" name="quantity[<?= $productId ?>]" value="<?= $item['quantity'] ?>" min="1" max="10" 
										class="quantity-input" data-price="<?= $item['price'] ?>" onchange="updateCartTotal()">
								</p>
								<a href="./?remove=<?= $productId ?>" class="remove-item">Verwijder</a>
							</div>
						<?php endforeach; ?>
					<?php else: ?>
						<p class="empty-cart">Je winkelmandje is leeg.</p>
					<?php endif; ?>
				</div>
				<?php if (count($_SESSION['cart']) > 0): ?>
					<div class="cart-summary">
						<p>Totaal: <span id="total-price">€<?= $subtotalFormatted ?></span></p>
						<button type="submit" class="update-cart">Bijwerken</button>
						<a href="../order/" class="checkout-button">Doorgaan naar betaling</a>
					</div>
				<?php endif; ?>
			</form>
		</section>
	</body>
	<script src="../assets/js/loading.js"></script>
	<script src="../assets/js/dropdown.js"></script>
	<script>
		function updateCartTotal() {
			const quantities = document.querySelectorAll('.quantity-input');
			let newTotal = 0;
			let newCount = 0;
			
			quantities.forEach(input => {
				const price = parseFloat(input.getAttribute('data-price'));
				const quantity = parseInt(input.value);
				
				if (quantity > 0) {
					newTotal += price * quantity;
					newCount += quantity;
				}
			});
			
			document.getElementById('total-price').textContent = '€' + newTotal.toLocaleString('nl-NL', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace('.', ',');
			document.getElementById('item-count').textContent = newCount;
		}
		
		document.addEventListener('DOMContentLoaded', function() {
			const cartItems = document.querySelectorAll('.cart-item');
			cartItems.forEach((item, index) => {
				item.style.animation = `slideInFromRight 0.4s ease-out ${index * 0.15}s both`;
				item.classList.add('hover-elevate');
			});
			
			const buttons = document.querySelectorAll('.remove-item, .checkout-button, .update-cart');
			buttons.forEach(button => {
				button.classList.add('click-feedback');
			});
			
			document.querySelector('.checkout-button')?.classList.add('button-hover-effect');
		});
	</script>
</html>