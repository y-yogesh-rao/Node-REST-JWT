const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb+srv://yogesh:yogesh@mongocluster.3wtct.mongodb.net/restful-api',
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        res.status(200).json({});
    }
    next();
})

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Successfully Started The Application!'
    });
});

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {message: error.message}
    });
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});