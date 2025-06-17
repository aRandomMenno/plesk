<?php
session_start();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['product_id']) && isset($_POST['quantity'])) {
    $productId = $_POST['product_id'];
    $quantity = (int)$_POST['quantity'];

    if ($quantity <= 0) {
        $quantity = 1;
    }

    $productsJson = file_get_contents('../assets/json/products.json');
    $productsData = json_decode($productsJson, true);

    if (isset($productsData['products'][$productId])) {
        $product = $productsData['products'][$productId];
        if ($product['stock'] > 0) {
            if ($quantity > $product['stock']) {
                $quantity = $product['stock'];
            }

            if (isset($_SESSION['cart'][$productId])) {
                $newQuantity = $_SESSION['cart'][$productId]['quantity'] + $quantity;
                if ($newQuantity > $product['stock']) {
                    $newQuantity = $product['stock'];
                }
                $_SESSION['cart'][$productId]['quantity'] = $newQuantity;
            } else {
                $_SESSION['cart'][$productId] = [
                    'id' => $productId,
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'quantity' => $quantity,
                    'image' => $product['image']
                ];
            }
            
            header('Location: ../cart/');
            exit;
        }
    }
}

header('Location: ../product-details/?product=' . $productId . '&error=1');
exit;