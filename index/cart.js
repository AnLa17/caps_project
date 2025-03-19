import React, { useState } from "react";

function Cart() {
  const [cart, setCart] = useState([
    { id: 1, name: "FLEXFIT Wooly", price: 15.0, quantity: 1, image: "/img/flexfit/ff.avif" },
  ]);

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.19;

  return (
    <div>
      <h1>Warenkorb</h1>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <h2>{item.name}</h2>
          <p>Preis: {item.price.toFixed(2)} €</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          />
          <button onClick={() => removeItem(item.id)}>Entfernen</button>
        </div>
      ))}
      <h3>Gesamtsumme: {total.toFixed(2)} €</h3>
      <h4>inkl. MwSt. (19%): {tax.toFixed(2)} €</h4>
      <button>Zur Kasse</button>
    </div>
  );
}

export default Cart;