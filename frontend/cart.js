function changeQty(btn, delta) {
    const input = btn.parentElement.querySelector('.qty-input');
    let value = parseInt(input.value, 10) || 1;
    value += delta;
    if (value < 1) value = 1;
    input.value = value;
    // Optionally, update price/total here
}


function changeQty(btn, delta) {
    const input = btn.parentElement.querySelector('.qty-input');
    let value = parseInt(input.value, 10) || 1;
    value += delta;
    if (value < 1) value = 1;
    input.value = value;
    // Optionally, update price/total here
}

document.getElementById('checkout-btn').addEventListener('click', function () {
    document.getElementById('cart-table-block').style.display = 'none';
    document.getElementById('payment-block').style.display = 'block';
});

// Show/hide QR code based on payment method
document.querySelectorAll('input[name="payment"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        if (this.value === 'online') {
            document.getElementById('payment-qr').style.display = 'block';
        } else {
            document.getElementById('payment-qr').style.display = 'none';
        }
    });
});

document.getElementById('back-btn').addEventListener('click', function () {
    document.getElementById('payment-block').style.display = 'none';
    document.getElementById('cart-table-block').style.display = 'block';
});

// Example: Go to customer.html when button is clicked
document.getElementById('done-btn').addEventListener('click', function () {
    window.location.href = 'customer.html';
});

// When user presses Enter, save table number to localStorage and update display
document.getElementById('table-no-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        var tableNo = this.value.trim();
        if (tableNo) {
            localStorage.setItem('tableNo', tableNo); // Save to localStorage
            var block = document.getElementById('table-no-block');
            block.innerHTML = 'Table No: <strong>' + tableNo + '</strong>';
        }
    }
});

// On page load, check localStorage and show table number if set
window.addEventListener('DOMContentLoaded', function () {
    var tableNo = localStorage.getItem('tableNo');
    if (tableNo) {
        var block = document.getElementById('table-no-block');
        block.innerHTML = 'Table No: <strong>' + tableNo + '</strong>';
    }
});

