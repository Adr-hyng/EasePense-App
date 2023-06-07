const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.json());

let totalPrice = 0;
let showPrice = false;

app.post("/api/send", (req, res) => {
  const message = req.body.message;
  console.log("Message:", message);
  res.status(200).send("Message sent");
});

app.post("/api/updateTotalPrice", (req, res) => {
  const newTotalPrice = req.body.totalPrice;
  totalPrice = newTotalPrice;
  showPrice = true;
  res.json({ showPrice: showPrice, totalPrice: newTotalPrice });
  setTimeout(() => {
    showPrice = false;
  }, 1000 * 15); // 10 seconds in milliseconds
});

app.get("/api/getTotalPrice", (req, res) => {
  res.json({ showPrice: showPrice, totalPrice: totalPrice });
});



app.get("/api", (req, res) => {
    res.json({
        "user": "Adrian is good"
    });
});

app.get("/api/top", (req, res) => {
  const sql = 'SELECT * FROM topProducts';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/shop", (req, res) => {
  const sql = 'SELECT * FROM productItems';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/api/updateProductStocks", (req, res) => { 
  const cartItems = req.body;

  cartItems.forEach((item) => {
    const updateProductItemsQuery =
      "UPDATE productItems SET stock = stock - ?, purchased = purchased + ? WHERE id = ?";
    db.query(updateProductItemsQuery, [item.qty, item.qty, item.id], (error) => {
      if (error) throw error;

      const selectUpdatedItemQuery = "SELECT * FROM productItems WHERE id = ?";
      db.query(selectUpdatedItemQuery, [item.id], (error, rows) => {
        if (error) throw error;

        const updatedItem = rows[0];

        if (updatedItem.purchased > 10) {
          const insertTopProductsQuery = "INSERT IGNORE INTO topProducts (id, path, name, price, purchased) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE path = VALUES(path), name = VALUES(name), price = VALUES(price), purchased = VALUES(purchased)";

          db.query(
            insertTopProductsQuery,
            [
              updatedItem.id,
              updatedItem.path,
              updatedItem.name,
              updatedItem.price,
              updatedItem.purchased,
            ],
            (error, result) => {
              if (error) throw error;
            }
          );
        }
      });
    });
  });

  res.json({ success: true });
});


app.listen(5000, () => {
    console.log("Server running on port 5000");
});