<?php
$orderSuccess = false;
if (isset($_SESSION['order_success']) && $_SESSION['order_success']) {
    $orderSuccess = true;
    $_SESSION['order_success'] = false;
}

$productsJson = file_get_contents('./assets/json/products.json');
$productsData = json_decode($productsJson, true);
$products = $productsData['products'];
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>LeafLoom - Overzicht</title>

		<link rel="stylesheet" href="./assets/css/styles.css">
		<link rel="stylesheet" href="./assets/css/animations.css">
		<link rel="stylesheet" href="./assets/css/overzicht.css">
		<link rel="stylesheet" href="./assets/css/responsive.css">
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
			<div class="cart-logo">
				<a href="./cart/">
					<img src="./assets/img/cart.svg" class="cart" alt="Winkelwagentje">
				</a>
				<a href=".">
					<img src="./assets/logo.png" class="logo" alt="Logo">
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

		<section class="hero">
			<div>
				<h1>Uitgelicht</h1>
				<p>
					Deze week is de Ficus Ginseng de plant van de week! Deze plant is perfect voor in de woonkamer of op
					kantoor. Hij heeft weinig water nodig en kan goed tegen een stootje. De Ficus Ginseng is een echte
					eyecatcher in jouw interieur!
				</p>
			</div>
			<div>
				<h1>Welkom bij LeafLoom</h1>
				<p>
					De beste planten voor jouw huis
				</p>
				<a href="#producten" class="cta">Bekijk onze producten</a>
			</div>
		</section>

		<section class="producten" id="producten">
			<?php foreach ($products as $productId => $product): ?>
				<div class="product hover-elevate">
					<img src="./assets/img/<?= basename($product['image']) ?>" alt="<?= $product['name'] ?>">
					<p><?= $product['name'] ?></p>
					<a href="./product-details/index.php?product=<?= $productId ?>">details</a>
				</div>
			<?php endforeach; ?>
		</section>
	</body>
	<script src="./assets/js/loading.js"></script>
	<script src="./assets/js/dropdown.js"></script>
	<script>
		document.addEventListener('DOMContentLoaded', function() {
			const ctaButton = document.querySelector('.cta');
			if (ctaButton) {
				ctaButton.classList.add('button-hover-effect');
				ctaButton.classList.add('click-feedback');
			}

			const heroSections = document.querySelectorAll('.hero div');
			heroSections.forEach((section, index) => {
				section.style.animation = `slideInFromRight 0.5s ease-out ${index * 0.2}s both`;
			});
		});
	</script>
</html>