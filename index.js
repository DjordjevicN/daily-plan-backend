const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const ingredients = require("./routes/ingredients");

const db = require("./database");
const database_constants = require("./constants/database_constants");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(
  fileUpload({
    createParentPath: true,
    // limits: { fileSize: 50 * 1024 * 1024 },
  })
);
// Routes
app.use(ingredients);

// Test route
app.get("/", (req, res) => {
  const sqlInsert = `select * from ${database_constants.USERS}`;
  db.query(sqlInsert, (err, results) => {
    if (err) {
      res.json({ msg: "Failed to load", success: false });
      throw err;
    }
    res.json({ msg: "TEST SUCCESS", success: true, results });
  });
});

app.post("/picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No files",
      });
    } else {
      const { picture } = req.files;
      const id = req.body.newIng;
      let randomNumber = Math.floor(Math.random() * Math.floor(10));
      let pictureName = `${randomNumber}${picture.name}`;

      let sql = `UPDATE ${database_constants.INGREDIENTS} SET img="${pictureName}" WHERE id = 44`;
      let query = db.query(sql, (err, results) => {
        if (err) {
          res.send({ status: false, notification: "Fail to upload" });
          throw err;
        }
        picture.mv("./uploads/" + pictureName);
        res.send({ status: true, results, notification: "Picture Changed" });
      });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// USERS ROUTES

// CREATE USER
app.post("/create_user", (req, res) => {
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
  let sqlInsert = `INSERT INTO users SET
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
    console.log(err);
    res.send(result);
  });
});
// UPDATE USER
app.post("/update_user", (req, res) => {
  console.log(req.body);
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
  let sqlInsert = `UPDATE users SET
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
    console.log(err);
    res.send(result);
  });
});

// LOGIN USER
app.post("/login_user", (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = '${email}'`;
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
app.post("/get_user_by_id", (req, res) => {
  let sql = `SELECT * FROM users WHERE id = '${req.body.value}'`;
  try {
    let query = db.query(sql, async (err, results) => {
      res.json(results);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
