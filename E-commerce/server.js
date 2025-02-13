const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));
app.use('/cart', require('./routes/cart'));

app.listen(3001, () => console.log("E-commerce API running on port 3001"));
