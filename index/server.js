const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let orders = [];

app.post("/api/order", (req, res) => {
  const order = req.body;
  orders.push(order);
  res.status(201).send({ message: "Bestellung erfolgreich!" });
});

app.get("/api/orders", (req, res) => {
  res.send(orders);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));