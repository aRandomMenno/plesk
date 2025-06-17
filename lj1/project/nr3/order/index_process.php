<?php
session_start();

$errors = [];
$required = ['firstName', 'lastName', 'email', 'streetAddress', 'postalCode', 'city', 'paymentMethod'];
$valid = true;

function sanitizeForDB($input): string {
	return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

foreach ($_POST as $key => $value) {
	$_POST[$key] = sanitizeForDB($value);
}

foreach ($required as $field) {
	if (empty($_POST[$field])) {
		$valid = false;
		$errors[$field] = 'Dit veld is verplicht';
	}
}

if (!empty($_POST['email'])) {
	if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$valid = false;
		$errors['email'] = 'Voer een geldig e-mailadres in';
	}
}

if (!empty($_POST['postalCode'])) {
	$postalCode = str_replace(' ', '', $_POST['postalCode']);
	if (!preg_match('/^[0-9]{4}[A-Za-z]{2}$/i', $postalCode)) {
		$valid = false;
		$errors['postalCode'] = 'Voer een geldige postcode in (1234 AB)';
	} else {
		$formattedPostal = substr($postalCode, 0, 4) . ' ' . strtoupper(substr($postalCode, 4, 2));
		$_POST['postalCode'] = $formattedPostal;
	}
}

if (!empty($_POST['phone'])) {
	$phone = preg_replace('/[^0-9]/', '', $_POST['phone']);

	if (strlen($phone) !== 10) {
		$valid = false;
		$errors['phone'] = 'Telefoonnummer moet 10 cijfers bevatten';
	} else {
		$_POST['phone'] = $phone;
	}
}

$allowedPaymentMethods = ['ideal', 'creditcard', 'paypal'];
if (!empty($_POST['paymentMethod']) && !in_array($_POST['paymentMethod'], $allowedPaymentMethods)) {
	$valid = false;
	$errors['paymentMethod'] = 'Ongeldige betaalmethode';
}

if ($valid) {
	$subtotal = 0;
	$shippingCost = 4.95;
	$items = [];

	if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
		header('Location: ../cart/');
		exit;
	}

	foreach ($_SESSION['cart'] as $productId => $item) {
		$price = floatval($item['price']);
		$quantity = intval($item['quantity']);
		$subtotal += $price * $quantity;

		$items[] = [
			'id' => sanitizeForDB($productId),
			'name' => sanitizeForDB($item['name']),
			'price' => $price,
			'quantity' => $quantity
		];
	}

	$total = $subtotal + $shippingCost;

	$order = [
		'id' => 'BESTEL-' . bin2hex(random_bytes(8)),
		'date' => date('Y-m-d H:i:s'),
		'customer' => [
			'firstName' => $_POST['firstName'],
			'lastName' => $_POST['lastName'],
			'email' => $_POST['email'],
			'phone' => $_POST['phone'] ?? '',
			'address' => [
				'street' => $_POST['streetAddress'],
				'postalCode' => $_POST['postalCode'],
				'city' => $_POST['city']
			]
		],
		'items' => $items,
		'payment' => [
			'method' => $_POST['paymentMethod'],
			'subtotal' => $subtotal,
			'shipping' => $shippingCost,
			'total' => $total
		]
	];

	$ordersFile = '../orders.json';
	$orders = ['orders' => []];

	if (file_exists($ordersFile)) {
		$ordersJson = file_get_contents($ordersFile);
		if ($ordersJson !== false) {
			$tempOrders = json_decode($ordersJson, true);
			if (is_array($tempOrders) && isset($tempOrders['orders'])) {
				$orders = $tempOrders;
			}
		}
	}

	$orders['orders'][] = $order;

	$result = file_put_contents($ordersFile, json_encode($orders, JSON_PRETTY_PRINT), LOCK_EX);

	if ($result === false) {
		$errors['system'] = 'Er is een fout opgetreden bij het verwerken van uw bestelling. Probeer het later opnieuw.';
		include 'index_process_view.php';
		exit;
	}

	$_SESSION['cart'] = [];
	$_SESSION['order_success'] = true;

	header('Location: ../confirmation.php?orderId=' . urlencode($order['id']));
	exit;
} else {
	include 'index_process_view.php';
	exit;
}