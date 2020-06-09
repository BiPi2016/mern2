const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.routes');
const excerciseRoutes = require('./routes/excercise.routes');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const connection = mongoose.connection;
connection.on('open', () => {
    console.log('Connected to database');
});
connection.on('error', () => {
    console.log('Some error occured');
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/excercises', excerciseRoutes);

app.use('*', (req, res, next) => {
    const error = new Error('Resource not found');
    error.code = 400;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.code || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});