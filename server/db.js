require('dotenv').config();
const mysql = require('mysql2');

const SCHEMA_NAME = process.env.DB_NAME;
let connection = null;

const featuredProducts = [
  {
    path: "images/featuredProducts/shops-1.png",
    name: "UFC Banana Ketchup 320g",
    price: 29,
    stock: 15
  },
  {
    path: "images/featuredProducts/shops-2.png",
    name: "Nestlé Milo Pack 24g",
    price: 8,
    stock: 80
  },
  {
    path: "images/featuredProducts/shops-3.png",
    name: "Century Tuna Flakes and Oil 420g",
    price: 54,
    stock: 20
  },
  {
    path: "images/featuredProducts/shops-4.png",
    name: "Payless Instant Mami Chicken Espesyal",
    price: 15,
    stock: 50
  },
  {
    path: "images/featuredProducts/shops-5.png",
    name: "Mega Sardines 155g",
    price: 25,
    stock: 50
  },
  {
    path: "images/featuredProducts/shops-7.png",
    name: "Argentina Corned Beef 150g",
    price: 28,
    stock: 30
  },
  {
    path: "images/featuredProducts/shops-8.png",
    name: "Argentina Meat Loaf 170g",
    price: 28,
    stock: 50
  },
  {
    path: "images/featuredProducts/shops-9.png",
    name: "Egg",
    price: 10,
    stock: 200
  },
  {
    path: "images/featuredProducts/shops-10.png",
    name: "Rice 1Kg",
    price: 55,
    stock: 50
  }
];

function createSchemaIfNotExists() {
  const connectionWithoutDatabase = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: false
  });

  connectionWithoutDatabase.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      throw err;
    }

    connectionWithoutDatabase.query(`CREATE DATABASE IF NOT EXISTS ${SCHEMA_NAME}`, (err) => {
      if (err) {
        console.error('Error creating database:', err);
        throw err;
      }
      console.log(`Database '${SCHEMA_NAME}' created or exists`);
      connectionWithoutDatabase.end();
      establishDatabaseConnection();
    });
  });
}

function establishDatabaseConnection() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: SCHEMA_NAME,
    ssl: false
  });

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');

    // Create productItems table with a UNIQUE constraint on path
    connection.query(`
      CREATE TABLE IF NOT EXISTS productItems (
        id INT AUTO_INCREMENT PRIMARY KEY,
        path VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL,
        purchased INT NOT NULL DEFAULT 0
      )
    `, (err) => {
      if (err) {
        console.error('Error creating productItems table:', err);
        return;
      }
      console.log('productItems table created or exists');

      // Insert featured products using INSERT IGNORE to avoid duplicates
      featuredProducts.forEach(product => {
        const { path, name, price, stock } = product;
        const insertQuery = `
          INSERT IGNORE INTO productItems (path, name, price, stock)
          VALUES (?, ?, ?, ?)
        `;
        connection.query(insertQuery, [path, name, price, stock], (err, result) => {
          if (err) {
            console.error(`Error inserting ${name}:`, err);
          } else {
            if (result.affectedRows > 0) {
              console.log(`${name} inserted with id ${result.insertId}`);
            } else {
              console.log(`${name} not inserted because a record with the same path already exists`);
            }
          }
        });
      });

      // Create topProducts table
      connection.query(`
        CREATE TABLE IF NOT EXISTS topProducts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          path VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          purchased INT NOT NULL,
          FOREIGN KEY (id) REFERENCES productItems(id)
        )
      `, (err) => {
        if (err) {
          console.error('Error creating topProducts table:', err);
          return;
        }
        console.log('topProducts table created or exists');
      });
    });
  });
}

function getConnection() {
  return connection;
}

module.exports = {
  getConnection,
  SCHEMA_NAME
};

// Initialize database connection
createSchemaIfNotExists();
