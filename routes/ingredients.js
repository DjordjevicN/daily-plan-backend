const express = require("express");
const router = express.Router();
const db = require("../database");
const database_constants = require("../constants/database_constants");
// INGREDIENTS

// ADD ING
router.post("/add_ingredients", (req, res) => {
  const { name, price, calories, carbs, protein, fat } = req.body;
  let sqlInsert = `INSERT INTO ${database_constants.INGREDIENTS} SET
    name="${name}",
    price=${price},
    calories=${calories},
    carbs=${carbs},
    protein=${protein},
    fat=${fat}`;

  db.query(sqlInsert, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

// DELETE ING
router.post("/delete_ing", (req, res) => {
  let sqlInsert = `DELETE FROM ${database_constants.INGREDIENTS} WHERE id=${req.body.value}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// GET ALL ING
router.get("/get_all_ingredients", (req, res) => {
  const sqlInsert = `select * from ${database_constants.INGREDIENTS} ORDER BY name`;
  db.query(sqlInsert, (err, results) => {
    if (err) {
      res.json({ msg: "Failed to load", success: false });
      throw err;
    }
    res.json({ msg: "Load all ingredients", success: true, results });
  });
});
// GET ING BY NAME
router.post("/get_ingredient_by_name", (req, res) => {
  const sqlInsert = `select * from ${database_constants.INGREDIENTS} WHERE name LIKE  '${req.body.value}%'`;
  db.query(sqlInsert, (err, results) => {
    if (err) {
      res.json({ msg: "Failed to load", success: false });
      throw err;
    }
    res.json({ msg: "Load all ingredients", success: true, results });
  });
});

// ADD AMOUNT aka PURCHASE MADE
router.post("/purchase_made", (req, res) => {
  let sqlInsert = `UPDATE ${database_constants.INGREDIENTS} SET current_amount=${req.body.value.amount} WHERE id = ${req.body.value.id}`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
    console.log(err);
  });
});
// Edit ING
router.post("/edit_ingredients", (req, res) => {
  const { id, name, price, calories, carbs, protein, fat, img } =
    req.body.value;
  let sqlInsert = `UPDATE ${database_constants.INGREDIENTS} SET
    name="${name}",
    price=${price},
    calories=${calories},
    carbs=${carbs},
    protein=${protein},
    fat=${fat},
    img="${img}" WHERE id=${id}`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
    console.log(err);
  });
});

// GET INGREDIENTS BY MEAL ID
router.post("/get_meals_ingredients", (req, res) => {
  let sqlInsert = `SELECT * FROM ${database_constants.INGREDIENTS_IN_MEAL} JOIN ${database_constants.INGREDIENTS} ON ingredient_id = ingredients.id WHERE meal_id=${req.body.value}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

module.exports = router;
