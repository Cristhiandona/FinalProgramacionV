const express = require('express');
const db = require('./app/config/conexion');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use(cors());

// API REST

app.get('/products', (req, res) => {
  db.query("SELECT * FROM products", (error, data) => {
    if(error) {
      throw error
    }
    res.json({
      mensaje: 'Result all products', 
      data
    })
  })
})

app.get('/products/:id', (req, res) => {
  console.log(req.params.id)
  const ID = req.params.id;

  const sql = "SELECT * FROM products WHERE Id = ?"
  db.query(sql, [ID], (error, data) => {
    if(error) {
      throw error
    }
    res.json({
      mensaje: 'Result product by Id', 
      data
    })
  })
})

app.post('/products', (req, res) => {
  console.log(Object.values(req.body))
  const values = Object.values(req.body);
 
  //Consulta Sql para Agregar un Producto
  const sql = "INSERT INTO products (id, name, category,description, price, createdAt, updatedAt) VALUES(?,?,?,?,?,?,?)"
  db.query(sql, values, (error, result) => {
    if(error){
      throw error;
    }
    res.json({
      mensaje: 'Producto Agregado', 
      data:result
    })
  })
  
})

app.delete('/products/:id', (req, res) => {
  //const codigo = req.body.codigo
  console.log(req.params.id)
  const ID = req.params.id;
 
  const sql = "DELETE FROM products WHERE Id=?"
  db.query(sql, [ID], (error, result) => {
    if(error){
      throw error;
    }
    res.json({
      mensaje: 'Producto Eliminado', 
      data:result
    })
  })
  
})

app.listen(PORT, () => {
  console.log("Running server on port:", PORT)
})