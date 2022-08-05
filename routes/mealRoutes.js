const express = require("express");
const router = express.Router();
const db = require("../database");
const database_constants = require("../constants/database_constants");

// CREATE MEAL

router.post("/create_meal", (req, res) => {
  const { user_id, name, videoUrl } = req.body.mealInfo;

  let sqlInsert = `INSERT INTO ${database_constants.MEAL} SET
      name="${name}",
      user_id="${user_id}",
      videoUrl="${videoUrl}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
// UPDATE MEAL
router.post("/update_meal", (req, res) => {
  const { user_id, name, videoUrl, id } = req.body.mealInfo;

  let sqlInsert = `UPDATE ${database_constants.MEAL} SET
      name="${name}",
      user_id="${user_id}",
      videoUrl="${videoUrl}" WHERE id=${id}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/ingredient_in_meal", (req, res) => {
  let sqlInsert = `INSERT INTO ${database_constants.INGREDIENTS_IN_MEAL} SET
      meal_id="${req.body.data.meal_id}",
      ingredient_id="${req.body.data.ingredientId}",
      unit="${req.body.data.unit}",
      amount="${req.body.data.amount}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/delete_ingredients_in_meal", (req, res) => {
  let sqlInsert = `DELETE FROM ${database_constants.INGREDIENTS_IN_MEAL} WHERE meal_id=${req.body.value}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/delete_meal_steps", (req, res) => {
  let sqlInsert = `DELETE FROM ${database_constants.MEAL_STEPS} WHERE meal_id=${req.body.value}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/add_meal_step", (req, res) => {
  let sqlInsert = `INSERT INTO ${database_constants.MEAL_STEPS} SET
      meal_id="${req.body.data.meal_id}",
      title="${req.body.data.title}",
      description="${req.body.data.description}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/get_users_meals", (req, res) => {
  let sqlInsert = `SELECT * FROM ${database_constants.MEAL}`;
  // let sqlInsert = `SELECT * FROM ${database_constants.MEAL} WHERE user_id="${req.body.value}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/update_amount_and_unit_of_meal", (req, res) => {
  let sqlInsert = `UPDATE ${database_constants.MEAL_IN_DAY} SET amount="${req.body.value.amount}",
  unit="${req.body.value.unit}" WHERE id=${req.body.value.id}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/get_meals_ingredients", (req, res) => {
  let sqlInsert = `SELECT * FROM ${database_constants.INGREDIENTS_IN_MEAL} JOIN ${database_constants.INGREDIENTS} ON ingredient_id = ingredients.id WHERE meal_id=${req.body.value}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/get_meals_steps", (req, res) => {
  let sqlInsert = `SELECT * FROM ${database_constants.MEAL_STEPS} WHERE meal_id=${req.body.value} ORDER BY title ASC`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/delete_meal", (req, res) => {
  let sqlInsert = `DELETE FROM meal WHERE id=${req.body.value.mealId}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/get_meal_by_name", (req, res) => {
  let sqlInsert = `SELECT * FROM meal WHERE name LIKE "${req.body.value.searchValue}%"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/add_meal_to_day", (req, res) => {
  let sqlInsert = `INSERT INTO ${database_constants.MEAL_IN_DAY} SET
  meal_id="${req.body.value.meal_id}",
  day_id="${req.body.value.day_id}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/update_meal_to_day", (req, res) => {
  let sqlInsert = `UPDATE ${database_constants.MEAL_IN_DAY} SET
  meal_id="${req.body.value.meal_id}" WHERE id=${req.body.value.id} `;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/check_if_meal_to_day", (req, res) => {
  let sqlInsert = `SELECT * FROM ${database_constants.MEAL_IN_DAY} WHERE id=${req.body.dayId}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

module.exports = router;
