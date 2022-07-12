const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "djalokin3223",
  database: "mealplan",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// Test route
app.get("/", (req, res) => {
  // const sqlInsert = "insert into plan (user_id, plan_no) values ('1', '1')";
  const sqlInsert = "select * from user";
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
