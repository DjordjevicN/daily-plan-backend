const express = require("express");
const router = express.Router();
const db = require("../database");

// INGREDIENTS

router.get("/get_all_shopping_items", (req, res) => {
  let sqlInsert = `SELECT * FROM shopping `;
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

router.post("/get_shopping_items_by_user_id", (req, res) => {
  let sqlInsert = `SELECT * FROM shopping WHERE users_id=${req.body.value}  ORDER BY  have ASC`;
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

router.post("/create_shopping_list_item", (req, res) => {
  const { name, amount, img, unit, have, users_id } = req.body.value;
  let sqlInsert = `INSERT INTO shopping SET
      name="${name}",
       amount=${amount},
        img="${img}",
         unit="${unit}",
          have="${have}",
           users_id=${users_id}`;
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
router.post("/switch_have_item", (req, res) => {
  let sqlInsert = `UPDATE shopping SET have=${req.body.value.have} WHERE id = ${req.body.value.item_id}`;
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
router.post("/get_all_plans_ingredients", (req, res) => {
  let sqlInsert = `SELECT ingredients.id, ingredients.name,ingredients.img, SUM(ingredients_in_meal.amount) as totalAmount,ingredients_in_meal.unit 
  FROM 
  ingredients
  JOIN ingredients_in_meal ON ingredients_in_meal.ingredient_id = ingredients.id 
  JOIN meal ON meal.id = ingredients_in_meal.meal_id
  JOIN meal_in_day ON meal_in_day.meal_id = meal.id
  JOIN day ON day.id = meal_in_day.day_id
  WHERE day.plan_id=${req.body.value} 
  GROUP BY name`;
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

router.post("/delete_single_shopping_item", (req, res) => {
  let sqlInsert = `DELETE FROM shopping WHERE id=${req.body.value.itemId}`;
  db.query(sqlInsert, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

module.exports = router;
