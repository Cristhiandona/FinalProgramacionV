const mysql = require('mysql');

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "programacionv"
});

conexion.connect(function(err) {
  if (err) throw console.log("Connection failed") + err;
  console.log("Conectado!");
});

module.exports = conexion;