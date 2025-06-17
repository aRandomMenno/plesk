<?php
session_start();

if (!isset($_GET['orderId'])) {
    header('Location: ./');
    exit;
}

$orderId = $_GET['orderId'];
$orderFound = false;
$order = null;

if (file_exists('./orders.json')) {
    $ordersJson = file_get_contents('./orders.json');
    $ordersData = json_decode($ordersJson, true);
    
    if (isset($ordersData['orders'])) {
        foreach ($ordersData['orders'] as $savedOrder) {
            if ($savedOrder['id'] === $orderId) {
                $order = $savedOrder;
                $orderFound = true;
                break;
            }
        }
    }
}

if (!$orderFound) {
    header('Location: ./');
    exit;
}

$subtotal = $order['payment']['subtotal'];
$shipping = $order['payment']['shipping'];
$total = $order['payment']['total'];

$subtotalFormatted = number_format($subtotal, 2, ',', '.');
$shippingFormatted = number_format($shipping, 2, ',', '.');
$totalFormatted = number_format($total, 2, ',', '.');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>LeafLoom - Bestelling bevestigd</title>
    <link rel="stylesheet" href="./assets/css/styles.css">
    <link rel="stylesheet" href="./assets/css/animations.css">
    <link rel="stylesheet" href="./assets/css/order.css">
	<link rel="stylesheet" href="./assets/css/confirmation.css">
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
			<a href=".">Home</a>
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
    
    <section class="confirmation-container">
        <div class="confirmation-header">
            <div class="success-icon">✓</div>
            <h1>Bedankt voor je bestelling!</h1>
            <p>Je bestelling is succesvol geplaatst en wordt spoedig verwerkt.</p>
            <p>Je bestelnummer is: <strong><?= htmlspecialchars($orderId) ?></strong></p>
        </div>
        
        <div class="order-details">
            <div class="details-section">
                <h2>Persoonlijke gegevens</h2>
                <div class="details-grid">
                    <p><strong>Naam:</strong> <?= htmlspecialchars($order['customer']['firstName']) ?> <?= htmlspecialchars($order['customer']['lastName']) ?></p>
                    <p><strong>E-mail:</strong> <?= htmlspecialchars($order['customer']['email']) ?></p>
                    <?php if(!empty($order['customer']['phone'])): ?>
                        <p><strong>Telefoon:</strong> <?= htmlspecialchars($order['customer']['phone']) ?></p>
                    <?php endif; ?>
                </div>
            </div>
            
            <div class="details-section">
                <h2>Verzendadres</h2>
                <div class="details-grid">
                    <p><?= htmlspecialchars($order['customer']['address']['street']) ?></p>
                    <p><?= htmlspecialchars($order['customer']['address']['postalCode']) ?> <?= htmlspecialchars($order['customer']['address']['city']) ?></p>
                </div>
            </div>
            
            <div class="details-section">
                <h2>Betaalgegevens</h2>
                <div class="details-grid">
                    <p><strong>Betaalmethode:</strong> <?= htmlspecialchars($order['payment']['method']) ?></p>
                    <p><strong>Besteldatum:</strong> <?= date('d-m-Y H:i', strtotime($order['date'])) ?></p>
                </div>
            </div>
            
            <div class="details-section">
                <h2>Bestelde artikelen</h2>
                <div class="order-summary">
                    <?php foreach ($order['items'] as $item): ?>
                        <div class="product-item">
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
                        <span>Totaal betaald:</span>
                        <span>€<?= $totalFormatted ?></span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="button-container">
            <a href="." class="home-button">Meer bestellen :)</a>
        </div>
    </section>
    
    <script src="./assets/js/loading.js"></script>
    <script src="./assets/js/dropdown.js"></script>
</body>
</html>
