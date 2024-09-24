// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Initialize Express App
const app = express();

// Middleware
app.use(cors({
    origin: 'https://e-com-harsih.netlify.app', // Allow this origin
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials if needed
  }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://harishmano98:Harish%402024@harish-mongo.uf15eex.mongodb.net/ecom" )
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Define Routes
const productsRouter = require('./routes/product');
app.use('/api/products', productsRouter);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
