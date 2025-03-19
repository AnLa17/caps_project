import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const products = [
  { id: 1, name: "FLEXFIT Wooly", price: 15.0, image: "/img/flexfit/ff.avif" },
  { id: 2, name: "New Era Trucker", price: 20.0, image: "/img/newera/neweratrucker.jpg" },
  { id: 3, name: "DC Gas Station", price: 28.0, image: "/img/dc/dcgas.jpg" },
];

function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
    toast.success(`${product.name} wurde zum Warenkorb hinzugefügt!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div>
      <h1>Produkte</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>Preis: {product.price.toFixed(2)} €</p>
            <button onClick={() => addToCart(product)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;