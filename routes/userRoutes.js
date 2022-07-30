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
  const {
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
  let sqlInsert = `INSERT INTO ${database_constants.USERS} SET
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
      activity_level="${activity_level}"`;

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

module.exports = router;
