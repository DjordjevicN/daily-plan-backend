const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const ingredients = require("./routes/ingredients");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");

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
app.use(userRoutes);
app.use(mealRoutes);

app.post("/picture", async (req, res) => {
  console.log(req.files);

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

// USERS ROUTES

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
