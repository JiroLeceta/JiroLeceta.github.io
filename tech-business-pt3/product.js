/* ====== PRODUCTS DATA ====== */
const products = [
    {
        id: 1,
        name: "Business Laptop Pro",
        category: "hardware",
        price: 45000,
        image: "💻",
        description: "High-performance laptop for business professionals"
    },
    {
        id: 2,
        name: "Wireless Mouse",
        category: "hardware",
        price: 1200,
        image: "🖱️",
        description: "Ergonomic wireless mouse with precision tracking"
    },
    {
        id: 3,
        name: "Mechanical Keyboard",
        category: "hardware",
        price: 3500,
        image: "⌨️",
        description: "Professional mechanical keyboard with RGB lighting"
    },
    {
        id: 4,
        name: "Office Suite License",
        category: "software",
        price: 5500,
        image: "📊",
        description: "Complete office productivity software suite"
    },
    {
        id: 5,
        name: "Antivirus Pro",
        category: "software",
        price: 2000,
        image: "🛡️",
        description: "Premium antivirus and security protection"
    },
    {
        id: 6,
        name: "Cloud Storage 1TB",
        category: "software",
        price: 3000,
        image: "☁️",
        description: "Secure cloud storage solution - 1TB capacity"
    },
    {
        id: 7,
        name: "Website Development",
        category: "services",
        price: 25000,
        image: "🌐",
        description: "Professional website development service"
    },
    {
        id: 8,
        name: "IT Support Package",
        category: "services",
        price: 8000,
        image: "🔧",
        description: "Monthly IT support and maintenance package"
    },
    {
        id: 9,
        name: "Network Setup",
        category: "services",
        price: 15000,
        image: "📡",
        description: "Complete network infrastructure setup"
    },
    {
        id: 10,
        name: "27\" Monitor",
        category: "hardware",
        price: 12000,
        image: "🖥️",
        description: "27-inch Full HD professional monitor"
    },
    {
        id: 11,
        name: "Design Software",
        category: "software",
        price: 7500,
        image: "🎨",
        description: "Professional graphic design software license"
    },
    {
        id: 12,
        name: "Data Recovery",
        category: "services",
        price: 5000,
        image: "💾",
        description: "Professional data recovery service"
    }
];


class ShoppingCart {
    #items = {}; // Private field - encapsulated data
    #lastOrder = null; // Private field for order storage

    addItem(product, quantity = 1) {
        if (this.#items[product.id]) {
            // Item exists, update quantity
            this.#items[product.id].quantity = this.#items[product.id].quantity + quantity;
        } else {
            // New item, add to cart
            this.#items[product.id] = { ...product, quantity };
        }
        this.saveToLocalStorage();
        this.updateCartBadge();
    }

    removeItem(productId) {
        delete this.#items[productId];
        this.saveToLocalStorage();
        this.updateCartBadge();
    }

    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeItem(productId);
        } else if (this.#items[productId]) {
            this.#items[productId].quantity = quantity;
            this.saveToLocalStorage();
        }
        this.updateCartBadge();
    }

    getItems() {
        const itemsArray = [];
        for (let id in this.#items) {
            itemsArray.push(this.#items[id]);
        }
        return itemsArray;
    }

    getItemCount() {
        let count = 0;
        for (let id in this.#items) {
            count = count + this.#items[id].quantity;
        }
        return count;
    }

    getSubtotal() {
        let total = 0;
        for (let id in this.#items) {
            total = total + (this.#items[id].price * this.#items[id].quantity);
        }
        return total;
    }

    clear() {
        this.#items = {};
        this.saveToLocalStorage();
        this.updateCartBadge();
    }

    // Save to localStorage 
    saveToLocalStorage() {
        try {
            localStorage.setItem('jltech_cart', JSON.stringify(this.#items));
        } catch (e) {
            console.log('Storage not available');
        }
    }

    // Load from localStorage
    loadFromLocalStorage() {
        try {
            const cartData = localStorage.getItem('jltech_cart');
            if (cartData) {
                this.#items = JSON.parse(cartData);
            }
        } catch (e) {
            console.log('Storage not available');
        }
    }

    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            badge.textContent = this.getItemCount();
        }
    }

    // Store order in private field and localStorage
    saveOrder(orderData) {
        this.#lastOrder = orderData;
        try {
            localStorage.setItem('jltech_lastOrder', JSON.stringify(orderData));
        } catch (e) {
            console.log('Storage not available');
        }
    }

    getLastOrder() {
        if (this.#lastOrder) {
            return this.#lastOrder;
        }
        try {
            const orderData = localStorage.getItem('jltech_lastOrder');
            if (orderData) {
                this.#lastOrder = JSON.parse(orderData);
                return this.#lastOrder;
            }
        } catch (e) {
            console.log('Storage not available');
        }
        return null;
    }
}

// Global cart instance
const cart = new ShoppingCart();

/* ====== LOAD PRODUCTS ON PAGE ====== */
function loadProducts(filterCategory = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    let filteredProducts = [];

    if (filterCategory === 'all') {
        filteredProducts = products;
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category === filterCategory) {
                filteredProducts.push(products[i]);
            }
        }
    }

    let html = '';
    for (let i = 0; i < filteredProducts.length; i++) {
        const product = filteredProducts[i];
        html += `
            <div class="product-card">
                <div class="product-icon">${product.image}</div>
                <h3>${product.name}</h3>
                <p class="product-category">${product.category.toUpperCase()}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">₱${product.price.toLocaleString()}</p>
                <button onclick="addToCart(${product.id})" class="add-to-cart-btn">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
    }

    grid.innerHTML = html;
}

function filterProducts() {
    const filterSelect = document.getElementById('categoryFilter');
    const filter = filterSelect ? filterSelect.value : 'all';
    loadProducts(filter);
}

function addToCart(productId) {
    let product = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === productId) {
            product = products[i];
            break;
        }
    }

    if (product) {
        cart.addItem(product);
        showNotification(`${product.name} added to cart!`);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

/* ====== CART PAGE FUNCTIONS ====== */
function loadCartPage() {
    const cartItemsDiv = document.getElementById('cartItems');
    if (!cartItemsDiv) return;

    const items = cart.getItems();

    if (items.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="products.html" class="continue-shopping">Start Shopping</a>
            </div>
        `;
        updateCartSummary(0, 0);
        return;
    }

    let html = '';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        html += `
            <div class="cart-item">
                <div class="item-icon">${item.image}</div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-category">${item.category.toUpperCase()}</p>
                    <p class="item-price">₱${item.price.toLocaleString()}</p>
                </div>
                <div class="item-quantity">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <div class="item-total">
                    <p>₱${(item.price * item.quantity).toLocaleString()}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }

    cartItemsDiv.innerHTML = html;

    const subtotal = cart.getSubtotal();
    const shipping = subtotal > 0 ? 100 : 0;
    updateCartSummary(subtotal, shipping);
}

function updateCartQuantity(productId, quantity) {
    cart.updateQuantity(productId, quantity);
    loadCartPage();
}

function removeFromCart(productId) {
    cart.removeItem(productId);
    loadCartPage();
}

function updateCartSummary(subtotal, shipping) {
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');

    if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = `₱${shipping.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `₱${(subtotal + shipping).toLocaleString()}`;
}

function proceedToCheckout() {
    if (cart.getItems().length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

/* ====== CHECKOUT PAGE FUNCTIONS ====== */
function loadCheckoutPage() {
    const items = cart.getItems();
    const checkoutItemsDiv = document.getElementById('checkoutItems');

    if (!checkoutItemsDiv) return;

    if (items.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    let html = '';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        html += `
            <div class="checkout-item">
                <span class="item-icon">${item.image}</span>
                <div class="item-info">
                    <p class="item-name">${item.name}</p>
                    <p class="item-qty">Qty: ${item.quantity}</p>
                </div>
                <span class="item-price">₱${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `;
    }

    checkoutItemsDiv.innerHTML = html;
    updateCheckoutSummary();
}

function updateShipping() {
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const deliverySelect = document.getElementById('deliveryOption');
    const deliveryOption = deliverySelect ? deliverySelect.value : 'standard';
    const shippingCosts = { standard: 100, express: 250, sameday: 500 };
    const shipping = shippingCosts[deliveryOption];
    const subtotal = cart.getSubtotal();

    const subtotalEl = document.getElementById('checkoutSubtotal');
    const shippingEl = document.getElementById('checkoutShipping');
    const totalEl = document.getElementById('checkoutTotal');

    if (subtotalEl) subtotalEl.textContent = `₱${subtotal.toLocaleString()}`;
    if (shippingEl) shippingEl.textContent = `₱${shipping.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `₱${(subtotal + shipping).toLocaleString()}`;
}

function completeOrder(event) {
    event.preventDefault();

    const deliveryOption = document.getElementById('deliveryOption').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const shippingCosts = { standard: 100, express: 250, sameday: 500 };

    const orderData = {
        orderNumber: 'ORD-' + Date.now(),
        date: new Date().toLocaleString(),
        items: cart.getItems(),
        subtotal: cart.getSubtotal(),
        shipping: shippingCosts[deliveryOption],
        total: cart.getSubtotal() + shippingCosts[deliveryOption],
        deliveryName: document.getElementById('deliveryName').value,
        deliveryPhone: document.getElementById('deliveryPhone').value,
        deliveryAddress: document.getElementById('deliveryAddress').value,
        deliveryOption: deliveryOption,
        paymentMethod: paymentMethod
    };

    cart.saveOrder(orderData);
    cart.clear();
    window.location.href = 'confirmation.html';
}

/* ====== CONFIRMATION PAGE FUNCTIONS ====== */
function loadConfirmationPage() {
    const orderData = cart.getLastOrder();

    if (!orderData) {
        alert('No order found. Please place an order first.');
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('orderNumber').textContent = orderData.orderNumber;
    document.getElementById('orderDate').textContent = orderData.date;

    const paymentLabels = {
        cod: 'Cash on Delivery',
        card: 'Credit/Debit Card',
        gcash: 'GCash',
        bank: 'Bank Transfer'
    };
    document.getElementById('paymentMethod').textContent = paymentLabels[orderData.paymentMethod];

    const deliveryLabels = {
        standard: 'Standard Delivery (3-5 days)',
        express: 'Express Delivery (1-2 days)',
        sameday: 'Same Day Delivery'
    };
    document.getElementById('deliveryMethod').textContent = deliveryLabels[orderData.deliveryOption];

    document.getElementById('recipientName').textContent = orderData.deliveryName;
    document.getElementById('recipientPhone').textContent = orderData.deliveryPhone;
    document.getElementById('recipientAddress').textContent = orderData.deliveryAddress;

    const receiptItemsTable = document.getElementById('receiptItems');
    let tableHtml = '';
    for (let i = 0; i < orderData.items.length; i++) {
        const item = orderData.items[i];
        tableHtml += `
            <tr>
                <td>${item.image} ${item.name}</td>
                <td>${item.quantity}</td>
                <td>₱${item.price.toLocaleString()}</td>
                <td>₱${(item.price * item.quantity).toLocaleString()}</td>
            </tr>
        `;
    }
    receiptItemsTable.innerHTML = tableHtml;

    document.getElementById('receiptSubtotal').textContent = `₱${orderData.subtotal.toLocaleString()}`;
    document.getElementById('receiptShipping').textContent = `₱${orderData.shipping.toLocaleString()}`;
    document.getElementById('receiptTotal').textContent = `₱${orderData.total.toLocaleString()}`;
}

/* ====== INITIALIZE ON PAGE LOAD ====== */
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage first
    cart.loadFromLocalStorage();
    cart.updateCartBadge();

    // Load appropriate page content
    if (document.getElementById('productsGrid')) {
        loadProducts();
    }

    if (document.getElementById('cartItems')) {
        loadCartPage();
    }

    if (document.getElementById('checkoutItems')) {
        loadCheckoutPage();
    }

    if (document.getElementById('orderNumber')) {
        loadConfirmationPage();
    }
});