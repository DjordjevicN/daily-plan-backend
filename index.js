const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mealplan",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Test route
app.get("/", (req, res) => {
  console.log("text");
  // const sqlInsert = `select * from ingredients`;
  // db.query(sqlInsert, (err, results) => {
  //   if (err) {
  //     res.json({ msg: "Failed to load", success: false });
  //     throw err;
  //   }
  //   res.json({ msg: "Load all ingredients", success: true, results });
  // });
});

// INGREDIENTS

// ADD ING
app.post("/add_ingredients", (req, res) => {
  const {
    name,
    price,
    calories,
    carbs,
    protein,
    fat,
    img,
    base_amount,
    current_amount,
    percentage_amount,
  } = req.body;
  let sqlInsert = `INSERT INTO ingredients SET
  name="${name}",
  price=${price},
  calories=${calories},
  carbs=${carbs},
  protein=${protein},
  fat=${fat},
  img="${img}",
  base_amount=${base_amount},
  current_amount=${current_amount},
  percentage_amount=${percentage_amount}`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
  });
});

// DELETE ING
app.post("/delete_ing", (req, res) => {
  let sqlInsert = `DELETE FROM ingredients WHERE id=${req.body.value}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// GET ALL ING
app.get("/get_all_ingredients", (req, res) => {
  const sqlInsert = `select * from ingredients`;
  db.query(sqlInsert, (err, results) => {
    if (err) {
      res.json({ msg: "Failed to load", success: false });
      throw err;
    }
    res.json({ msg: "Load all ingredients", success: true, results });
  });
});

// ADD AMOUNT aka PURCHASE MADE
app.post("/purchase_made", (req, res) => {
  let sqlInsert = `UPDATE ingredients SET current_amount=${req.body.value.amount} WHERE id = ${req.body.value.id}`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
    console.log(err);
    console.log(result);
  });
});

app.post("/edit_ingredients", (req, res) => {
  const {
    id,
    name,
    price,
    calories,
    carbs,
    protein,
    fat,
    img,
    base_amount,
    current_amount,
    percentage_amount,
  } = req.body.value;
  let sqlInsert = `UPDATE ingredients SET
  name="${name}",
  price=${price},
  calories=${calories},
  carbs=${carbs},
  protein=${protein},
  fat=${fat},
  img="${img}",
  base_amount=${base_amount},
  current_amount=${current_amount},
  percentage_amount=${percentage_amount} WHERE id=${id}`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
    console.log(err);
    console.log(result);
  });
});

app.listen(3001),
  () => {
    console.log("running on port 3001");
  };
