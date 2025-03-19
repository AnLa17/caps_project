function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart); // Überprüft den LocalStorage-Inhalt
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} wurde zum Warenkorb hinzugefügt!`);
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    // LocalStorage abrufen
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Zugriff auf <main> (cartContent)
    let main = document.getElementById('cartContent');
  
    // Überprüfen, ob der Warenkorb leer ist
    if (cart.length === 0) {
      main.innerHTML = '<p>Dein Warenkorb ist leer.</p>';
      return;
    }
  
    let totalPrice = 0;
  
    // Dynamischen HTML-Inhalt erstellen
    let content = '<div class="cart-items">';
    cart.forEach((item, index) => {
      content += `
        <div class="cart-item">
          <p>${item.name}: ${item.price} €</p>
          <button onclick="removeFromCart(${index})">Entfernen</button>
        </div>
      `;
      totalPrice += item.price;
    });
    content += `</div>`;
    content += `<h3 class="total-price">Gesamtpreis: ${totalPrice.toFixed(2)} €</h3>`;
  
    // Den gesamten Inhalt in das <main> schreiben
    main.innerHTML = content;
  });
  
  // Funktion zum Entfernen eines Produkts
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Produkt entfernen
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload(); // Seite aktualisieren
  }
  
  
  
  
  