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

    newExcercise.save()
    .then(excercise => {
        if(!excercise)
            return next();
        return res.json({
            message: 'Excercise created',
            excercise: excercise
        });
    })
    .catch( err => next(err));
});

router.get('/:id', (req, res, next) => {
    Excercise.findById(req.params.id)
    .then( excercise => {
        if(!excercise)
            return next();
        return res.json({
            message: 'Excercise found',
            excercise: excercise
        });
    })
    .catch( err => next(err));
});

router.put('/update/:id', (req, res, next) => {
    const updatedExcercise = {
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date)
    };
    console.log(updatedExcercise);
    Excercise.findByIdAndUpdate(req.params.id, updatedExcercise, {new: true})
    .then(updatedExcercise => {
        if(!updatedExcercise)
            return next();
        return res.json( {
            message: 'Excercise updated',
            excercise: updatedExcercise
        });
    })
    .catch(err => next(err));
});

router.delete('/delete/:id', (req, res, next) => {
    Excercise.findByIdAndDelete(req.params.id)
    .then( deletedExcercise => {
        if(!deletedExcercise)
            return next();
        return res.json({
            message: 'Excercise deleted',
            excercise: deletedExcercise
        });
    })
    .catch(err => next(err));
});

module.exports = router;