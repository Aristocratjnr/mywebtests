const cartItems = [
    { id: 1, name: 'Tibet Five Set Kitchen Cabinet', price: 499.99, image: 'room.png', quantity: 1 },
];

function updateCart() {
    const cartContainer = document.querySelector('.cart-items');
    const totalItems = document.getElementById('total-items');
    const totalPrice = document.getElementById('total-price');
    
    cartContainer.innerHTML = '';

    let itemCount = 0;
    let total = 0;

    cartItems.forEach(item => {
        itemCount += item.quantity;
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Price: ₵${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>Quantity: ${item.quantity}</span>
                    <button class="increase" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="remove-button" onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(cartItem);
    });

    totalItems.textContent = itemCount;
    totalPrice.textContent = `₵${total.toFixed(2)}`;

    // Store cart items and total amount in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalAmount', total.toFixed(2));
}

function changeQuantity(id, change) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(item.quantity + change, 1);
        updateCart();
    }
}

function removeItem(id) {
    const index = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
        cartItems.splice(index, 1);
        updateCart();
    }
}

function proceedToCheckout() {
    // Navigate to the checkout page
    window.location.href = './checkout.html';
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});