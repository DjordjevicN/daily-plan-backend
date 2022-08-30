const express = require("express");
const router = express.Router();
const db = require("../database");
const axios = require("axios");

router.get("/get_basic_foods", (req, res) => {
  let sql = `select * from basic_foods`;

  let query = db.query(sql, async (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.send(results);
  });
});
router.post("/add_basic_foods", async (req, res) => {
  let sql = `INSERT IGNORE INTO basic_foods SET etm_id="${req.body.value.etm_id}",
    food_name= "${req.body.value.food_name}",
    etm_image= "${req.body.value.etm_image}",
    imageCall= "${req.body.value.imageCall}",
    alcohol= "${req.body.value.alcohol}",
    alpha_carotene= "${req.body.value.alpha_carotene}",
    beta_carotene= "${req.body.value.beta_carotene}",
    betaine= "${req.body.value.betaine}",
    caffeine= "${req.body.value.caffeine}",
    calcium= "${req.body.value.calcium}",
    calories= "${req.body.value.calories}",
    carbs= "${req.body.value.carbs}",
    cholesterol= "${req.body.value.cholesterol}",
    fats= "${req.body.value.fats}",
    fiber= "${req.body.value.fiber}",
    fructose= "${req.body.value.fructose}",
    glucose= "${req.body.value.glucose}",
    glutamic_acid= "${req.body.value.glutamic_acid}",
    alanine= "${req.body.value.alanine}",
    glycine= "${req.body.value.glycine}",
    histidine= "${req.body.value.histidine}",
    iron= "${req.body.value.iron}",
    lactose= "${req.body.value.lactose}",
    leucine= "${req.body.value.leucine}",
    magnesium= "${req.body.value.magnesium}",
    maltose= "${req.body.value.maltose}",
    manganese= "${req.body.value.manganese}",
    methionine= "${req.body.value.methionine}",
    monounsaturated_fats= "${req.body.value.monounsaturated_fats}",
    niacin= "${req.body.value.niacin}",
    pantothenic_acid= "${req.body.value.pantothenic_acid}",
    phenylalanine= "${req.body.value.phenylalanine}",
    phosphorus= "${req.body.value.phosphorus}",
    polyunsaturated_fats= "${req.body.value.polyunsaturated_fats}",
    potassium= "${req.body.value.potassium}",
    proline= "${req.body.value.proline}",
    proteins= "${req.body.value.proteins}",
    serine= "${req.body.value.serine}",
    sodium= "${req.body.value.sodium}",
    sucrose= "${req.body.value.sucrose}",
    sugar= "${req.body.value.sugar}",
    total_omega_3= "${req.body.value.total_omega_3}",
    total_omega_6= "${req.body.value.total_omega_6}",
    trans_fats= "${req.body.value.trans_fats}",
    tryptophan= "${req.body.value.tryptophan}",
    tyrosine= "${req.body.value.tyrosine}",
    valine= "${req.body.value.valine}",
    veggie_servings= "${req.body.value.veggie_servings}",
    vit_a= "${req.body.value.vit_a}",
    vit_a_iu= "${req.body.value.vit_a_iu}",
    vit_b6= "${req.body.value.vit_b6}",
    vit_b12= "${req.body.value.vit_b12}",
    vit_c= "${req.body.value.vit_c}",
    vit_d= "${req.body.value.vit_d}",
    vit_d2= "${req.body.value.vit_d2}",
    vit_d3= "${req.body.value.vit_d3}",
    vit_d_iu= "${req.body.value.vit_d_iu}",
    vit_e= "${req.body.value.vit_e}",
    vit_k= "${req.body.value.vit_k}",
    water= "${req.body.value.water}",
    zinc= "${req.body.value.zinc}"`;

  let query = db.query(sql, async (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.json(results);
  });
});

router.post("/scrape_meals", async (req, res) => {
  const response = await axios.get(
    `https://www.eatthismuch.com/food-browser/search/?q=&filters=%5B%22basic_foods%22%5D&category_filters=%5B%5D&sort_nutrient=relevance&sort_order=-&display_option=serving_&page=${req.body.value}&nutrition_targets=null`
  );

  res.send(response.data.basic_foods.results);
});

module.exports = router;
