const express = require('express');
const router = express.Router();

const Excercise = require('../models/excercise.model');

router.get('/', (req, res, next) => {
    Excercise.find({}, (err, excercises) => {
        if(err)
            return res.status(404).json('Error ' + err);
        return res.json(excercises);
    });
});

router.post('/add', (req, res, next) => {
    const newExcercise = new Excercise({
        username: req.body.username,
        description: req.body.description,
        duration: req.body.durtaion,
        date: req.body.date
    });

    newExcercise.save((err, excercise) => {
        if(err)
            return res.status(404).json('Error occured ' + err);
        return res.json('Excercise saved ' + excercise);
    });
});

router.get('/:id', (req, res, next) => {
    Excercise.findById(req.params.id, (err, excercise) => {
        if(err)
            return res.status(404).json('Error occured ' + err);
        return res.json(excercise);
    });
});

router.put('/update/:id', (req, res, next) => {
    const newExcercise = new Excercise({
        username: req.body.username,
        description: req.body.description,
        duration: req.body.durtaion,
        date: req.body.date
    });
    Excercise.findByIdAndUpdate(req.params.id, 
        newExcercise, 
        {new: true},
        (err, excercise) => {
        if(err)
            return req.status(404).json('Error occured ' + err);
        return res.json('Excercise updated ' + excercise);
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Excercise.findByIdAndDelete(req.params.id, (err, excercise) => {
        if(err)
            return res.status(404).json('Error occured ' + err);
        return res.json('Excercise deleted ' + excercise);
    });
});

module.exports = router;