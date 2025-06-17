<?php
$productsJson = file_get_contents('../assets/json/products.json');
$productsData = json_decode($productsJson, true);
$products = $productsData['products'];

$productId = isset($_GET['product']) ? $_GET['product'] : null;
$product = null;

if ($productId && isset($products[$productId])) {
    $product = $products[$productId];
    $pageTitle = "LeafLoom - " . ($product['fullName'] ?? $product['name']);
    
    $recommendedProducts = [];
    $productArray = [];
    foreach ($products as $id => $prod) {
        if ($id !== $productId) {
            $prod['id'] = $id;
            $productArray[] = $prod;
        }
    }
    
    shuffle($productArray);
    $recommendedProducts = array_slice($productArray, 0, 3);
} else {
    $pageTitle = "LeafLoom - Product niet gevonden";
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title><?= $pageTitle ?></title>
		<link rel="stylesheet" href="../assets/css/styles.css">
		<link rel="stylesheet" href="../assets/css/animations.css">
		<link rel="stylesheet" href="../assets/css/product-details.css">
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
		<section class="product-details">
			<?php if ($product): ?>
				<div class="product-container">
					<div class="product-image">
						<img src="<?= $product['image'] ?>" alt="<?= $product['name'] ?>">
					</div>
					<div class="product-info">
						<h1><?= $product['fullName'] ?? $product['name'] ?></h1>
						<div class="product-description">
							<p><?= $product['description'] ?></p>
						</div>
						<div class="product-meta">
							<?php if (isset($product['category'])): ?>
								<p><strong>Categorie:</strong> <?= $product['category'] ?></p>
							<?php endif; ?>
							<?php if (isset($product['size'])): ?>
								<p><strong>Potmaat:</strong> <?= $product['size'] ?></p>
							<?php endif; ?>
							<?php if (isset($product['height'])): ?>
								<p><strong>Hoogte:</strong> <?= $product['height'] ?></p>
							<?php endif; ?>
						</div>
					</div>
					<div class="product-actions">
						<p class="product-price">€<?= number_format($product['price'], 2, ',', '.') ?></p>
						<p><strong>Beschikbaarheid:</strong> <?= $product['stock'] > 0 ? $product['stock'] . ' op voorraad' : 'Niet op voorraad' ?></p>
						<form id="add-to-cart-form" method="post" action="../cart/index.php">
							<input type="hidden" name="product_id" value="<?= $productId ?>">
							<div class="quantity-selector">
								<button type="button" class="quantity-btn minus">-</button>
								<input type="number" name="quantity" value="1" min="1" max="<?= $product['stock'] ?>" class="quantity-input" id="product-quantity">
								<button type="button" class="quantity-btn plus">+</button>
							</div>
							<button type="submit" class="add-to-cart-btn">In winkelwagen</button>
						</form>
					</div>
				</div>
				
				<div class="recommended-products">
					<h2>Anderen kochten ook</h2>
					<div class="product-recommendations">
						<?php foreach ($recommendedProducts as $prod): ?>
							<div class="recommended-product">
								<img src="<?= $prod['image'] ?>" alt="<?= $prod['name'] ?>">
								<h3><?= $prod['name'] ?></h3>
								<p class="price">€<?= number_format($prod['price'], 2, ',', '.') ?></p>
								<a href="index.php?product=<?= $prod['id'] ?>">Bekijken</a>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
				
				<div class="plant-care">
					<h2>Verzorging van <?= $product['name'] ?></h2>
					<div class="care-instructions">
						<?php if (isset($product['light'])): ?>
							<div class="care-item">
								<h3>Lichtbehoefte</h3>
								<p><?= $product['light'] ?></p>
							</div>
						<?php endif; ?>
						<?php if (isset($product['water'])): ?>
							<div class="care-item">
								<h3>Water</h3>
								<p><?= $product['water'] ?></p>
							</div>
						<?php endif; ?>
						<?php if (isset($product['difficulty'])): ?>
							<div class="care-item">
								<h3>Moeilijkheidsgraad</h3>
								<p><?= $product['difficulty'] ?></p>
							</div>
						<?php endif; ?>
					</div>
				</div>
			<?php else: ?>
				<div class="product-not-found">
					<h2>Product niet gevonden</h2>
					<p>Het product dat je zoekt bestaat niet of is niet meer beschikbaar.</p>
					<a href="../index.php" class="back-to-home">Terug naar de homepage</a>
				</div>
			<?php endif; ?>
		</section>
	</body>
	<script src="../assets/js/loading.js"></script>
	<script src="../assets/js/dropdown.js"></script>
	<script>
		document.addEventListener('DOMContentLoaded', function() {
			setTimeout(() => {
				const productImage = document.querySelector('.product-image');
				if (productImage) {
					productImage.style.animation = 'slideInFromLeft 0.6s ease-out forwards';
				}
				
				const productInfo = document.querySelector('.product-info');
				if (productInfo) {
					productInfo.style.animation = 'fadeIn 0.8s ease-out forwards';
				}
				
				const productActions = document.querySelector('.product-actions');
				if (productActions) {
					productActions.style.animation = 'slideInFromRight 0.6s ease-out forwards';
				}
				
				const buttons = document.querySelectorAll('.add-to-cart-btn, .quantity-btn');
				buttons.forEach(btn => {
					btn.classList.add('click-feedback');
				});
				
				document.querySelector('.add-to-cart-btn')?.classList.add('button-hover-effect');
				
				const quantityInput = document.getElementById('product-quantity');
				const minusBtn = document.querySelector('.quantity-btn.minus');
				const plusBtn = document.querySelector('.quantity-btn.plus');

				if (minusBtn && plusBtn && quantityInput) {
					minusBtn.addEventListener('click', () => {
						if (quantityInput.value > 1) {
							quantityInput.value = parseInt(quantityInput.value) - 1;
						}
					});
					plusBtn.addEventListener('click', () => {
						const maxStock = parseInt(quantityInput.getAttribute('max'));
						if (parseInt(quantityInput.value) < maxStock) {
							quantityInput.value = parseInt(quantityInput.value) + 1;
						}
					});
				}
			}, 500);
		});
	</script>
</html>