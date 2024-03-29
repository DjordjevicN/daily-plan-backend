const mysql = require("mysql2");
// const { PLAN } = require("./constants/database_constants");

// module.exports = mysql.createPool({
//   host: "localhost",
//   user: "nikoladj_meal_plan_consumer",
//   password: "djalokin3223",
//   database: "nikoladj_meal_plan_db",
// });
module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mealplan",
});

// CREATE TABLE users(
// id INT AUTO_INCREMENT,
// email varchar(255),
// password varchar(255),
// name VARCHAR(255),
// weight INT,
// height INT,
// plan_id INT,
// bmi INT,
// gender varchar(255),
// age INT,
// image varchar(255),
// calories_needed INT,
// job_type varchar(255),
// fat int,
// activity_level varchar(255),
//  PRIMARY KEY(id) );

// CREATE TABLE users_ingredients(
//   id INT AUTO_INCREMENT,
//       users_id INT,
//       name varchar(100),
//       price INT,
//       calories INT,
//       barcode varchar(255),
//       carbs INT,
//       protein INT,
//       fat INT,
//       img varchar(255),
//       base_amount INT,
//       current_amount INT,
//       percentage_amount INT,
//       PRIMARY KEY(id),
//       FOREIGN KEY(users_id) REFERENCES users(id)
//   );

// CREATE TABLE meal(
//   id INT AUTO_INCREMENT,
//       day_id INT,
//       plan_id int,
//       name varchar(100),
//       price INT,
//       calories INT,
//       carbs INT,
//       protein INT,
//       fat INT,
//       img varchar(255),
//       base_amount INT,
//       current_amount INT,
//       percentage_amount INT,
//       weight int,
//       meal_type int,
//       PRIMARY KEY(id),
//       FOREIGN KEY(day_id) REFERENCES day(id),
//     FOREIGN KEY(plan_id) REFERENCES plan(id)
//   );

// create table recipe(
//   id int AUTO_INCREMENT,
//   meal_id int,
//   PRIMARY KEY(id) ,
//   FOREIGN KEY(meal_id) REFERENCES meal(id)
//   );

// CREATE TABLE ingredients(
//   id INT AUTO_INCREMENT,
//       recipe_id int,
//       name varchar(100),
//       price INT,
//       calories INT,
//       barcode varchar(255),
//       carbs INT,
//       protein INT,
//       fat INT,
//       img varchar(255),
//       base_amount INT,
//       current_amount INT,
//       percentage_amount INT,
//       PRIMARY KEY(id),
//       FOREIGN KEY(recipe_id) REFERENCES recipe(id)
//   );

// create table meal_steps(
// 	id int AUTO_INCREMENT,
//     meal_id int,
//     title varchar(255),
//     description text,
//     video varchar(255),
//     image varchar(255),
//     PRIMARY key(id),
//     FOREIGN KEY(meal_id) REFERENCES meal(id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// create table ingredients_in_meal(
// 	   id int AUTO_INCREMENT,
//     meal_id int,
//     ingredient_id int,
//     PRIMARY key(id),
//     FOREIGN KEY(meal_id) REFERENCES meal(id),
//     FOREIGN KEY(ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// create table day(
// 	   id int AUTO_INCREMENT,
//     plan_id int,
//     date_id int,
//     calorie_limit int,
//     name varchar(255),
//     PRIMARY key(id),
//     FOREIGN KEY(plan_id) REFERENCES plan(id)
//     ON DELETE CASCADE ON UPDATE CASCADE
// );

// create table meal_in_day(
//   id int AUTO_INCREMENT,
//   meal_id int,
//   day_id int,
//   meal_type int,
//   amount int DEFAULT 1,
//   unit varchar(20) DEFAULT "gr",
//   PRIMARY key(id),
//   FOREIGN KEY(meal_id) REFERENCES meal(id),
//   FOREIGN KEY(day_id) REFERENCES day(id)
//   ON DELETE CASCADE ON UPDATE CASCADE
// )

// create table plan(
//   planID int AUTO_INCREMENT,
//   name varchar(100),
//   price INT,
//   calories INT,
//   carbs INT,
//   protein INT,
//   fat INT,
//   img varchar(255),
//   PRIMARY key(planID),
//   ON DELETE CASCADE ON UPDATE CASCADE
// )
