const products = [
    { id: 1, name: 'Wireless Noise-Canceling Headphones', category: 'electronics', price: 199.99, description: 'High-fidelity audio with active noise cancellation.' },
    { id: 2, name: 'Ergonomic Mechanical Keyboard', category: 'electronics', price: 129.99, description: 'Tactile switches with customizable RGB backlighting.' },
    { id: 3, name: 'Minimalist Leather Backpack', category: 'lifestyle', price: 89.99, description: 'Durable, stylish water-resistant daily carry backpack.' },
    { id: 4, name: 'Smart Fitness Tracker Watch', category: 'electronics', price: 149.99, description: 'Monitor heart rate, sleep patterns, and daily workouts.' },
    { id: 5, name: 'Insulated Stainless Steel Bottle', category: 'lifestyle', price: 29.99, description: 'Keeps drinks ice-cold for 24 hours or hot for 12 hours.' },
    { id: 6, name: 'Portable Ultra-Slim Power Bank', category: 'electronics', price: 49.99, description: '10000mAh fast-charging portable backup battery.' }
];

let cart = [];
let currentCategory = 'all';
let searchQuery = '';

const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const filterTabs = document.querySelectorAll('.filter-tab');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

function renderProducts() {
    productGrid.innerHTML = '';

    const filtered = products.filter(p => {
        const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; opacity: 0.6;">No products found.</p>';
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div>
                <h3>${product.name}</h3>
                <p style="opacity: 0.7; font-size: 0.9rem;">${product.description}</p>
            </div>
            <div>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
};

function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemsContainer.innerHTML = '';

    let total = 0;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; opacity: 0.6;">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <div>
                    <strong style="margin-right: 1rem;">$${(item.price * item.quantity).toFixed(2)}</strong>
                    <button onclick="removeFromCart(${index})" style="background: #ef4444; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 4px; cursor: pointer;">X</button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });
    }
    cartTotal.textContent = total.toFixed(2);
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
};

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
});

filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.getAttribute('data-category');
        renderProducts();
    });
});

cartBtn.addEventListener('click', () => cartModal.classList.add('open'));
closeCart.addEventListener('click', () => cartModal.classList.remove('open'));
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Capstone simulation successful.');
    cart = [];
    updateCartUI();
    cartModal.classList.remove('open');
});

renderProducts();
