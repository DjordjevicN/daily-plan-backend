const express = require("express");
const app = express();
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
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
// UPDATE USER
app.post("/update_user", (req, res) => {
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
    if (err) {
      console.log(err);
    }
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

// CREATE MEAL

app.post("/create_meal", (req, res) => {
  const { user_id, name, image, videoUrl } = req.body.mealInfo;

  let sqlInsert = `INSERT INTO meal SET
    name="${name}",
    user_id="${user_id}",
    videoUrl="${videoUrl}",
    img="${image}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.post("/ingredient_in_meal", (req, res) => {
  let sqlInsert = `INSERT INTO ingredients_in_meal SET
    meal_id="${req.body.data.meal_id}",
    ingredient_id="${req.body.data.ingredientId}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.post("/add_meal_step", (req, res) => {
  let sqlInsert = `INSERT INTO meal_steps SET
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
app.post("/get_users_meals", (req, res) => {
  let sqlInsert = `SELECT * FROM meal WHERE user_id="${req.body.value}"`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.post("/get_meals_ingredients", (req, res) => {
  let sqlInsert = `SELECT * FROM ingredients_in_meal JOIN ingredients ON ingredient_id = ingredients.id WHERE meal_id=${req.body.value}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
app.post("/get_meals_steps", (req, res) => {
  let sqlInsert = `SELECT * FROM meal_steps WHERE meal_id=${req.body.value}`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
