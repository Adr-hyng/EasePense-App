const express = require('express');
const app = express();
const path = require("path");
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));


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
  db.getConnection().query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/shop", (req, res) => {
  const sql = 'SELECT * FROM productItems';
  db.getConnection().query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add Featured Product endpoint
app.post("/api/addFeaturedProduct", (req, res) => {
  const { name, price, path, stock } = req.body;
  
  if (!name || !price || !path || !stock) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertQuery = `
    INSERT INTO productItems (name, price, path, stock)
    VALUES (?, ?, ?, ?)
  `;

  db.getConnection().query(
    insertQuery,
    [name, price, path, stock || null],
    (err, result) => {
      if (err) {
        console.error("Error adding featured product:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({
        success: true,
        message: "Featured product added successfully",
        productId: result.insertId
      });
    }
  );
});

app.post("/api/updateProductStocks", (req, res) => { 
  const cartItems = req.body;

  cartItems.forEach((item) => {
    const updateProductItemsQuery =
      "UPDATE productItems SET stock = stock - ?, purchased = purchased + ? WHERE id = ?";
    db.getConnection().query(updateProductItemsQuery, [item.qty, item.qty, item.id], (error) => {
      if (error) throw error;

      const selectUpdatedItemQuery = "SELECT * FROM productItems WHERE id = ?";
      db.getConnection().query(selectUpdatedItemQuery, [item.id], (error, rows) => {
        if (error) throw error;

        const updatedItem = rows[0];

        if (updatedItem.purchased > 10) {
          const insertTopProductsQuery = "INSERT IGNORE INTO topProducts (id, path, name, price, purchased) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE path = VALUES(path), name = VALUES(name), price = VALUES(price), purchased = VALUES(purchased)";

          db.getConnection().query(
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