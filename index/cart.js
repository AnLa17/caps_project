function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Überprüfen, ob der Artikel bereits im Warenkorb existiert
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity++; // Erhöhe die Menge, wenn der Artikel bereits existiert
    } else {
        // Füge den Artikel mit einer Menge von 1 hinzu
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} wurde zum Warenkorb hinzugefügt!`);
}

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    // Warenkorb-Daten aus Local Storage abrufen
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Überprüfen, ob der Warenkorb leer ist
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ihr Warenkorb ist leer.</p>';
        subtotalElement.textContent = '0.00 €';
        taxElement.textContent = '0.00 €';
        totalElement.textContent = '0.00 €';
        return;
    }

    // Warenkorb anzeigen
    let subtotal = 0;
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} (${item.quantity}x):</p>
            <p>${(item.price * item.quantity).toFixed(2)} €</p>
        `;

        // Entfernen-Button erstellen
        const removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        // Button zum Artikel hinzufügen
        itemElement.appendChild(removeButton);
        cartItemsContainer.appendChild(itemElement);

        subtotal += item.price * item.quantity;
    });

    // Berechnungen
    const tax = subtotal * (19 / 119); // Enthaltene Mehrwertsteuer (19%)
    const total = subtotal; // Gesamtbetrag entspricht dem Subtotal

    // Werte anzeigen
    subtotalElement.textContent = `${subtotal.toFixed(2)} €`;
    taxElement.textContent = `${tax.toFixed(2)} €`;
    totalElement.textContent = `${total.toFixed(2)} €`;
});

// Funktion zum Entfernen eines Produkts
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Produkt entfernen
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload(); // Seite aktualisieren
}




