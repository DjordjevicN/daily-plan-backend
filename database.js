const mysql = require("mysql");
// Database
// module.exports = mysql.createConnection({
//   user: "nikoladj_nikola",
//   host: "localhost",
//   password: "djalokin3223",
//   database: "nikoladj_mealplan",
// });

module.exports = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "djalokin3223",
  database: "mealplan",
});
