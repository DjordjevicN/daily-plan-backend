const express = require("express");
const router = express.Router();
const db = require("../database");
// INGREDIENTS

// ADD ING
router.post("/add_ingredients", (req, res) => {
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
    console.log(err);
    res.send(result);
  });
});

// DELETE ING
router.post("/delete_ing", (req, res) => {
  let sqlInsert = `DELETE FROM ingredients WHERE id=${req.body.value}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// GET ALL ING
router.get("/get_all_ingredients", (req, res) => {
  const sqlInsert = `select * from ingredients ORDER BY name`;
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
  const sqlInsert = `select * from ingredients WHERE name LIKE  '${req.body.value}%'`;
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
  let sqlInsert = `UPDATE ingredients SET current_amount=${req.body.value.amount} WHERE id = ${req.body.value.id}`;

  db.query(sqlInsert, (err, result) => {
    res.send(result);
    console.log(err);
    console.log(result);
  });
});

router.post("/edit_ingredients", (req, res) => {
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
  });
});
module.exports = router;
