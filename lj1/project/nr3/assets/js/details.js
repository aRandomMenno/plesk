document.addEventListener('DOMContentLoaded', function () {
    fetch('../assets/json/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const products = data.products;
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('product');
            const productDetailsSection = document.querySelector('.product-details');

            if (productId && products[productId]) {
                const product = products[productId];
                document.title = `LeafLoom - ${product.fullName || product.name}`;
                const productHTML = `
                    <div class="product-container">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h1>${product.fullName || product.name}</h1>
                            <div class="product-description">
                                <p>${product.description}</p>
                            </div>
                            <div class="product-meta">
                                ${product.category ? `<p><strong>Categorie:</strong> ${product.category}</p>` : ''}
                                ${product.size ? `<p><strong>Potmaat:</strong> ${product.size}</p>` : ''}
                                ${product.height ? `<p><strong>Hoogte:</strong> ${product.height}</p>` : ''}
                            </div>
                        </div>
                        <div class="product-actions">
                            <p class="product-price">€${product.price.toFixed(2)}</p>
                            <p><strong>Beschikbaarheid:</strong> ${product.stock > 0 ? `${product.stock} op voorraad` : 'Niet op voorraad'}</p>
                            <form id="add-to-cart-form" method="post" action="../cart/add.php">
                                <input type="hidden" name="product_id" value="${productId}">
                                <div class="quantity-selector">
                                    <button type="button" class="quantity-btn minus">-</button>
                                    <input type="number" name="quantity" value="1" min="1" max="${product.stock}" class="quantity-input" id="product-quantity">
                                    <button type="button" class="quantity-btn plus">+</button>
                                </div>
                                <button type="submit" class="add-to-cart-btn">In winkelwagen</button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="recommended-products">
                        <h2>Anderen kochten ook</h2>
                        <div class="product-recommendations">
                            ${getRecommendedProducts(products, productId, 3)}
                        </div>
                    </div>
                    
                    <div class="plant-care">
                        <h2>Verzorging van ${product.name}</h2>
                        <div class="care-instructions">
                            ${product.light ? `
                                <div class="care-item">
                                    <h3>Lichtbehoefte</h3>
                                    <p>${product.light}</p>
                                </div>` : ''}
                            ${product.water ? `
                                <div class="care-item">
                                    <h3>Water</h3>
                                    <p>${product.water}</p>
                                </div>` : ''}
                            ${product.difficulty ? `
                                <div class="care-item">
                                    <h3>Moeilijkheidsgraad</h3>
                                    <p>${product.difficulty}</p>
                                </div>` : ''}
                        </div>
                    </div>
                `;
                productDetailsSection.innerHTML = productHTML;
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
                        if (parseInt(quantityInput.value) < product.stock) {
                            quantityInput.value = parseInt(quantityInput.value) + 1;
                        }
                    });
                }
            } else {
                productDetailsSection.innerHTML = `
                    <div class="product-not-found">
                        <h2>Product niet gevonden</h2>
                        <p>Het product dat je zoekt bestaat niet of is niet meer beschikbaar.</p>
                        <a href="../index.html" class="back-to-home">Terug naar de homepage</a>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            const productDetailsSection = document.querySelector('.product-details');
            productDetailsSection.innerHTML = `
                <div class="product-not-found">
                    <h2>Fout bij het laden van product</h2>
                    <p>Er is iets misgegaan bij het laden van de productgegevens. Probeer het later opnieuw.</p>
                    <a href="../index.html" class="back-to-home">Terug naar de homepage</a>
                </div>
            `;
        });
});
function getRecommendedProducts(products, currentProductId, count) {
    const productArray = Object.entries(products)
        .filter(([id]) => id !== currentProductId)
        .map(([id, product]) => ({ id, ...product }));
    const shuffled = productArray.sort(() => 0.5 - Math.random());
    const recommended = shuffled.slice(0, count);
    return recommended.map(product => `
        <div class="recommended-product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">€${product.price.toFixed(2)}</p>
            <a href="index.html?product=${product.id}">Bekijken</a>
        </div>
    `).join('');
}