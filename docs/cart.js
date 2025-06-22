// cart.js
// Структура товара: {id, name, price, image, count}

function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartEmpty.style.display = '';
        cartTotal.innerHTML = '';
        checkoutBtn.style.display = 'none';
        return;
    }
    cartEmpty.style.display = 'none';
    checkoutBtn.style.display = '';

    cart.forEach((item, idx) => {
        total += item.price * item.count;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-img"><img src="${item.image}" alt="${item.name}" style="width:80px;"></div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div>Цена: <b>${item.price.toLocaleString()} ₽</b></div>
                <div>Кол-во: <span class="cart-item-count">${item.count}</span></div>
                <button class="cart-remove" data-idx="${idx}">Удалить</button>
            </div>
        `;
        cartItems.appendChild(div);
    });
    cartTotal.innerHTML = `<h3>Итого: ${total.toLocaleString()} ₽</h3>`;

    // Удаление товара
    cartItems.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = +this.dataset.idx;
            cart.splice(idx, 1);
            setCart(cart);
            renderCart();
            updateCartCount();
        });
    });
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.count, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCount();
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('Спасибо за заказ! (Демо)');
            setCart([]);
            renderCart();
            updateCartCount();
        });
    }
}); 