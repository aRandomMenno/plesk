<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$response = [
    'success' => false,
    'subtotal' => 0,
    'itemCount' => 0
];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id']) && isset($_POST['quantity'])) {
    $productId = $_POST['product_id'];
    $quantity = max(1, (int)$_POST['quantity']);
    
    if (isset($_SESSION['cart'][$productId])) {
        $productsJson = file_get_contents('../assets/json/products.json');
        $productsData = json_decode($productsJson, true);
        
        if (isset($productsData['products'][$productId])) {
            $product = $productsData['products'][$productId];
            $quantity = min($quantity, $product['stock']);
            
            $_SESSION['cart'][$productId]['quantity'] = $quantity;
            
            $response['success'] = true;
            
            $subtotal = 0;
            $itemCount = 0;
            
            foreach ($_SESSION['cart'] as $item) {
                $subtotal += $item['price'] * $item['quantity'];
                $itemCount += $item['quantity'];
            }
            
            $response['subtotal'] = number_format($subtotal, 2, ',', '.');
            $response['itemCount'] = $itemCount;
        }
    }
}

echo json_encode($response);
exit;
