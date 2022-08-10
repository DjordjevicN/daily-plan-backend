const express = require("express");
const router = express.Router();
const db = require("../database");
const database_constants = require("../constants/database_constants");

router.get("/test", (req, res) => {
  console.log("RADI");
  res.send("lo.l");
});

// CREATE USER
router.post("/create_user", (req, res) => {
  const { email, password, name } = req.body;
  let sqlInsert = `INSERT INTO ${database_constants.USERS} SET
      name="${name}",
      email="${email}",
      password="${password}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
// UPDATE USER
router.post("/update_user", (req, res) => {
  const {
    id,
    email,
    password,
    name,
    weight,
    height,
    bmi,
    gender,
    age,
    image,
    calories_needed,
    fat,
    activity_level,
  } = req.body;
  let sqlInsert = `UPDATE ${database_constants.USERS} SET
      name="${name}",
      email="${email}",
      password="${password}",
      weight=${weight},
      height=${height},
      bmi=${bmi},
      gender="${gender}",
      age=${age},
      image="${image}",
      calories_needed=${calories_needed},
      fat=${fat},
      activity_level="${activity_level}" WHERE id=${id}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// LOGIN USER
router.post("/login_user", (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM ${database_constants.USERS} WHERE email = '${email}'`;
  try {
    let query = db.query(sql, async (err, results) => {
      if (password == results[0].password) {
        res.json(results);
      } else {
        res.send({ msg: "Wrong password", error: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
});
// GET USER
router.post("/get_user_by_id", (req, res) => {
  let sql = `SELECT * FROM ${database_constants.USERS} WHERE id = '${req.body.value}'`;
  try {
    let query = db.query(sql, async (err, results) => {
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});
// GET USERS PLAN
router.post("/get_users_plan", (req, res) => {
  let sql = `SELECT * FROM ${database_constants.PLAN} WHERE id = '${req.body.value}'`;
  try {
    let query = db.query(sql, async (err, results) => {
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});
// GET USERS PLAN-DAY
router.post("/get_plan_days", (req, res) => {
  let sql = `SELECT * FROM ${database_constants.DAY} WHERE plan_id = '${req.body.value}' ORDER BY  weekDay_id ASC`;
  try {
    let query = db.query(sql, async (err, results) => {
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});
// GET USERS PLAN-DAY-MEAL
router.post("/get_meals_in_day", (req, res) => {
  let sqlInsert = `SELECT * FROM meal_in_day where day_id=${req.body.value} ORDER BY  meal_type ASC`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/get_meal_by_id", (req, res) => {
  let sqlInsert = `SELECT * FROM meal where id=${req.body.value}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/update_users_calories", (req, res) => {
  let sqlInsert = `UPDATE ${database_constants.USERS} SET calories_needed="${req.body.value.calories}" where id=${req.body.value.userId}`;
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

module.exports = router;
