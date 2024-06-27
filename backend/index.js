const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db.js');
const foodRouter = require('./routes/foodRoute.js');
const userRouter = require('./routes/userRoute.js');
const cartRouter = require('./routes/cartRoute.js');
const orderRouter = require('./routes/orderRoute.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors())


// Database connection
connectDB();


// API routes
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('Server working');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
