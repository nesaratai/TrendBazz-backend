const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const authRouter = require('./controllers/auth')
const categoryRouter = require ('./controllers/categories')
const oderRouter = require ('./controllers/orders')
const productRouter = require ('./controllers/products')
const UserRouter = require('./controllers/users')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use('/auth', authRouter)
app.use('/orders', oderRouter)
app.use('/products', productRouter)
app.use('/categories', categoryRouter);
app.use('/user', UserRouter);
// Routes go here

app.listen(3000, () => {
  console.log('The express app is ready!');
});
