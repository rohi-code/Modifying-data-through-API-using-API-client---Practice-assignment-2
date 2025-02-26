const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const userSchema = require('./schema')
require('dotenv').config()
const app = express();
const port = 3010;

app.use(express.static('static'));
const db = async()=>{

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to database');
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};
db();

app.post('/menu', async (req, res) => {
  const { name, description, price } = req.body;
  
  if (!name || !price) {
      return res.status(400).json({ error: "Name and Price are required!" });
  }

  try {
    const newProduct = new userSchema({ name, description, price });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
} catch (error) {
    res.status(500).json({ error: "Database error!", details: error.message });
}
});
app.put('/menu/:id', async (req, res) => {
  const {id}=req.params
  

  try {
    const newProduct = await userSchema.findByIdAndUpdate(id,req.body,{new:true})
    res.status(201).json({ message: "Product update successfully!", product: newProduct });
} catch (error) {
    res.status(500).json({ error: "Database error!", details: error.message });
}
});
app.delete('/menu/:id', async (req, res) => {
  const {id}=req.params
  

  try {
    const newProduct = await userSchema.findByIdAndDelete(id)
    res.status(201).json({ message: "Product deleted successfully!", product: newProduct });
} catch (error) {
    res.status(500).json({ error: "Database error!", details: error.message });
}
});

app.get('/menu', async(req, res) => {
  try {
    const products = await userSchema.find();
    res.json(products);
} catch (error) {
    res.status(500).json({ error: "Failed to fetch products!" });
}
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
