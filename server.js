const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const authRouter = require('./controllers/users')
const categoryRouter = require ('./controllers/categories')
const oderRouter = require ('./controllers/orders')
const productRouter = require ('./controllers/products')


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(logger('dev'));
app.use('/auth', authRouter)
app.use('/orders', oderRouter)
app.use('/product', productRouter)
app.use('/categories', categoryRouter);
// Routes go here

app.listen(3000, () => {
  console.log('The express app is ready!');
});
