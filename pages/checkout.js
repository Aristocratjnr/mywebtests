document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
});

function validateForms(event) {
    event.preventDefault();
    const billingForm = document.getElementById('billing-form');
    const paymentForm = document.getElementById('paymentForm');

    const billingIsValid = validateForm(billingForm);
    const paymentIsValid = validateForm(paymentForm);

    if (billingIsValid && paymentIsValid) {
        showModal();
        // Clear cart data
        localStorage.removeItem('cartItems');
        // Reset form and order summary
        billingForm.reset();
        paymentForm.reset();
        displayOrderSummary(); // Clear the order summary display
    } else {
        alert('Please fill out all required fields correctly.');
    }
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });

    return isValid;
}

function showModal() {
    document.getElementById('success-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

function showCheckingModal() {
    document.getElementById('checking-modal').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('checking-modal').style.display = 'none';
        alert('Payment Authenticated!');
    }, 2000); // Simulate checking time
}

function displayOrderSummary() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    const totalPrice = document.getElementById('total-price');
    
    orderItemsContainer.innerHTML = '';

    let total = 0;

    cartItems.forEach(item => {
        total += item.price * item.quantity;

        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="order-item-details">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: ₵${item.price.toFixed(2)}</p>
            </div>
            <p>₵${(item.price * item.quantity).toFixed(2)}</p>
        `;
        orderItemsContainer.appendChild(orderItem);
    });

    totalPrice.innerText = `₵${total.toFixed(2)}`;
}

function payWithPaystack() {
    const amountInCedis = parseFloat(document.getElementById('amount').value);

    var handler = PaystackPop.setup({
        key: 'pk_test_36baf0a3f26aa4acc1993918bb494422b073b581', 
        email: document.getElementById('email').value,
        amount: amountInCedis * 100,
        currency: 'GHS',
        callback: function(response) {
            alert('Payment complete! Reference: ' + response.reference);
           
        },
        onClose: function() {
            alert('Transaction was not completed');
        }
    });
    handler.openIframe();
}