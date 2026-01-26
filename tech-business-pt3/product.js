class ShoppingCart {
    #items = new Map(); 
    
    
    addItem(product, quantity = 1) {
        if (this.#items.has(product.id)) {
            const current = this.#items.get(product.id);
            this.#items.set(product.id, { ...current, quantity: current.quantity + quantity });
        } else {
            this.#items.set(product.id, { ...product, quantity });
        }
        this.saveToStorage();
        this.updateCartBadge();
    }
    
    removeItem(productId) {
        this.#items.delete(productId);
        this.saveToStorage();
        this.updateCartBadge();
    }
    
    updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeItem(productId);
        } else if (this.#items.has(productId)) {
            const item = this.#items.get(productId);
            this.#items.set(productId, { ...item, quantity });
            this.saveToStorage();
        }
        this.updateCartBadge();
    }
    
    getItems() {
        return Array.from(this.#items.values());
    }
    
    getItemCount() {
        return Array.from(this.#items.values()).reduce((sum, item) => sum + item.quantity, 0);
    }
    
    getSubtotal() {
        return Array.from(this.#items.values()).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    clear() {
        this.#items.clear();
        this.saveToStorage();
        this.updateCartBadge();
    }
    
    saveToStorage() {
        const cartData = JSON.stringify(Array.from(this.#items.entries()));
        sessionStorage.setItem('cart', cartData);
    }
    
    loadFromStorage() {
        const cartData = sessionStorage.getItem('cart');
        if (cartData) {
            const entries = JSON.parse(cartData);
            this.#items = new Map(entries);
        }
    }
    
    updateCartBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            badge.textContent = this.getItemCount();
        }
    }
}

const cart = new ShoppingCart();

/* ====== LOAD PRODUCTS ON PAGE ====== */
function loadProducts(filterCategory = 'all') {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    const filteredProducts = filterCategory === 'all' 
        ? products 
        : products.filter(p => p.category === filterCategory);
    
    grid.innerHTML = filteredProducts.map(product => `
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
    `).join('');
}

function filterProducts() {
    const filter = document.getElementById('categoryFilter')?.value || 'all';
    loadProducts(filter);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.addItem(product);
        showNotification(`${product.name} added to cart!`);
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show and hide with animation
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
    
    cartItemsDiv.innerHTML = items.map(item => `
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
    `).join('');
    
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
    
    checkoutItemsDiv.innerHTML = items.map(item => `
        <div class="checkout-item">
            <span class="item-icon">${item.image}</span>
            <div class="item-info">
                <p class="item-name">${item.name}</p>
                <p class="item-qty">Qty: ${item.quantity}</p>
            </div>
            <span class="item-price">₱${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');
    
    updateCheckoutSummary();
}

function updateShipping() {
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const deliveryOption = document.getElementById('deliveryOption')?.value || 'standard';
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
    
    sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
    cart.clear();
    window.location.href = 'confirmation.html';
}

/* ====== CONFIRMATION PAGE FUNCTIONS ====== */
function loadConfirmationPage() {
    const orderData = JSON.parse(sessionStorage.getItem('lastOrder'));
    
    if (!orderData) {
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
    receiptItemsTable.innerHTML = orderData.items.map(item => `
        <tr>
            <td>${item.image} ${item.name}</td>
            <td>${item.quantity}</td>
            <td>₱${item.price.toLocaleString()}</td>
            <td>₱${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
    `).join('');
    
    document.getElementById('receiptSubtotal').textContent = `₱${orderData.subtotal.toLocaleString()}`;
    document.getElementById('receiptShipping').textContent = `₱${orderData.shipping.toLocaleString()}`;
    document.getElementById('receiptTotal').textContent = `₱${orderData.total.toLocaleString()}`;
}

/* ====== INITIALIZE ON PAGE LOAD ====== */
document.addEventListener('DOMContentLoaded', () => {
    cart.loadFromStorage();
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