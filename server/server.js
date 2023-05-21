const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({
        "users": ["user1", "user2", "user3"]
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