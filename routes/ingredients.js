const express = require("express");
const router = express.Router();
const db = require("../database");
const database_constants = require("../constants/database_constants");
// INGREDIENTS

// ADD ING
router.post("/add_ingredients", (req, res) => {
  let sqlInsert = `INSERT INTO ${database_constants.INGREDIENTS} SET 
    name= "${req.body.food_name}",
    etm_image= "${req.body.etm_image}",
    imageCall= "${req.body.imageCall}",
    alcohol= "${req.body.alcohol}",
    alpha_carotene= "${req.body.alpha_carotene}",
    beta_carotene= "${req.body.beta_carotene}",
    betaine= "${req.body.betaine}",
    caffeine= "${req.body.caffeine}",
    calcium= "${req.body.calcium}",
    calories= "${req.body.calories}",
    carbs= "${req.body.carbs}",
    cholesterol= "${req.body.cholesterol}",
    fats= "${req.body.fats}",
    fiber= "${req.body.fiber}",
    fructose= "${req.body.fructose}",
    glucose= "${req.body.glucose}",
    glutamic_acid= "${req.body.glutamic_acid}",
    alanine= "${req.body.alanine}",
    glycine= "${req.body.glycine}",
    histidine= "${req.body.histidine}",
    iron= "${req.body.iron}",
    lactose= "${req.body.lactose}",
    leucine= "${req.body.leucine}",
    magnesium= "${req.body.magnesium}",
    maltose= "${req.body.maltose}",
    manganese= "${req.body.manganese}",
    methionine= "${req.body.methionine}",
    monounsaturated_fats= "${req.body.monounsaturated_fats}",
    niacin= "${req.body.niacin}",
    pantothenic_acid= "${req.body.pantothenic_acid}",
    phenylalanine= "${req.body.phenylalanine}",
    phosphorus= "${req.body.phosphorus}",
    polyunsaturated_fats= "${req.body.polyunsaturated_fats}",
    potassium= "${req.body.potassium}",
    proline= "${req.body.proline}",
    proteins= "${req.body.proteins}",
    serine= "${req.body.serine}",
    sodium= "${req.body.sodium}",
    sucrose= "${req.body.sucrose}",
    sugar= "${req.body.sugar}",
    total_omega_3= "${req.body.total_omega_3}",
    total_omega_6= "${req.body.total_omega_6}",
    trans_fats= "${req.body.trans_fats}",
    tryptophan= "${req.body.tryptophan}",
    tyrosine= "${req.body.tyrosine}",
    valine= "${req.body.valine}",
    veggie_servings= "${req.body.veggie_servings}",
    vit_a= "${req.body.vit_a}",
    vit_a_iu= "${req.body.vit_a_iu}",
    vit_b6= "${req.body.vit_b6}",
    vit_b12= "${req.body.vit_b12}",
    vit_c= "${req.body.vit_c}",
    vit_d= "${req.body.vit_d}",
    vit_d2= "${req.body.vit_d2}",
    vit_d3= "${req.body.vit_d3}",
    vit_d_iu= "${req.body.vit_d_iu}",
    vit_e= "${req.body.vit_e}",
    vit_k= "${req.body.vit_k}",
    water= "${req.body.water}",
    zinc= "${req.body.zinc}"
    `;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
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
    if (err) {
      console.log(err);
    }
    res.send(result);
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
    if (err) {
      console.log(err);
    }
    res.send(result);
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

router.post("/get_basic_food", (req, res) => {
  const sqlInsert = `select * from basic_foods WHERE food_name LIKE '${req.body.value}%'`;
  db.query(sqlInsert, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

module.exports = router;
