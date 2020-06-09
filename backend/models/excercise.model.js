const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const excerciseSchema = new Schema({
    username: {
        type: String, 
        requried: true
    },
    description: {
        type: String,
        requried: true
    },
    duration: {
        type: Number,
        min: 5
    },
    date: {
        type: Date,
        required: true
    }
}, {
        timestamps: true
});

const Excercise = mongoose.model('Excercise', excerciseSchema);

module.exports = Excercise;