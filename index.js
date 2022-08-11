const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const ingredients = require("./routes/ingredients");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const scrape = require("./routes/scrape");
const cors = require("cors");
app.use(cors());

const db = require("./database");
const database_constants = require("./constants/database_constants");
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use(
  fileUpload({
    createParentPath: true,
    // limits: { fileSize: 50 * 1024 * 1024 },
  })
);
// Routes;
app.use(ingredients);
app.use(userRoutes);
app.use(mealRoutes);
app.use(scrape);

app.post("/picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No files",
      });
    } else {
      const { picture } = req.files;
      const id = req.body.itemId;
      let randomNumber = Math.floor(Math.random() * Math.floor(10));
      let pictureName = `${randomNumber}${picture.name}`;

      let sql = `UPDATE ${req.body.tableName} SET img="${pictureName}" WHERE id = ${id}`;
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

// CREATE PLAN
// ********************

app.get("/", (req, res) => {
  res.send("AJMO");
});
app.post("/create_plan", (req, res) => {
  let sql = `INSERT INTO ${database_constants.PLAN} SET name="new"`;

  let query = db.query(sql, async (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.json(results);
  });
});
app.post("/create_day", (req, res) => {
  let sql = `INSERT INTO ${database_constants.DAY} SET weekDay_id="${req.body.weekDay_id}",plan_id="${req.body.plan_id}"`;

  let query = db.query(sql, async (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.json(results);
  });
});

app.post("/create_meal_in_day", (req, res) => {
  let sql = `INSERT INTO ${database_constants.MEAL_IN_DAY} SET day_id="${req.body.day_id}",meal_type="${req.body.meal_type}",amount="1",unit="gr"`;

  let query = db.query(sql, async (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.json(results);
  });
});
// *****************

app.post("/get_plan_by_id", (req, res) => {
  let sql = `SELECT * FROM plan WHERE id=${req.body.value}`;

  let query = db.query(sql, async (err, results) => {
    if (err) {
      return console.log(err);
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
