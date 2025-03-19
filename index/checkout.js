import React from "react";

function Checkout() {
  return (
    <div>
      <h1>Checkout</h1>
      <form>
        <h2>Lieferadresse</h2>
        <input type="text" placeholder="Name" required />
        <input type="text" placeholder="Adresse" required />
        <input type="text" placeholder="Stadt" required />
        <input type="text" placeholder="Postleitzahl" required />

        <h2>Zahlungsoptionen</h2>
        <label>
          <input type="radio" name="payment" value="paypal" required />
          PayPal
        </label>
        <label>
          <input type="radio" name="payment" value="invoice" required />
          Kauf auf Rechnung
        </label>

        <button type="submit">Bestellung abschließen</button>
      </form>
    </div>
  );
}

export default Checkout;