const express = require("express");
const router = express.Router();
const db = require("../database");

// INGREDIENTS

router.get("/get_all_plans", (req, res) => {
  let sqlInsert = `SELECT * FROM plan`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.get("/get_users_plans", (req, res) => {
  let sqlInsert = `SELECT * FROM plan WHERE creator_id=${req.body.value.userId}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

router.post("/activate_plan", (req, res) => {
  let sqlInsert = `UPDATE users SET plan_id=${req.body.value.plan_id} WHERE id=${req.body.value.userId}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/create_plan", (req, res) => {
  let sql = `INSERT INTO ${database_constants.PLAN} SET name="New Plan",creator_id=${req.body.value}`;

  let query = db.query(sql, async (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.json(results);
  });
});
router.post("/delete_plan", (req, res) => {
  let sqlInsert = `DELETE FROM plan WHERE id=${req.body.value}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
router.post("/update_name", (req, res) => {
  let sqlInsert = `UPDATE plan SET name="${req.body.value.name}" WHERE id=${req.body.value.planId}`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
module.exports = router;
