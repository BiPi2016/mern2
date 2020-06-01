const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.on('open', () => {
    console.log('Connected to database');
});
connection.on('error', () => {
    console.log('Some error occured');
})

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});