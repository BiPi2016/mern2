const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', (req, res, next) => {
   User.find({}, (err, users) => {
       if(err)
            return res.status(404).json("Error occured " + err);
        res.json(users);
   })
});

router.post('/add', (req, res, next) => {
    const username = req.body.username;
    const newUser = new User({
        username
    });
    newUser.save((err, user) => {
        if(err)
            res.status(404).json('Error saving user' + err);
        return res.json('User saved' + user);
    })
});

router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
    .then( user => {
        if(!user)
            return next();            
        return res.json(user);
    })
    .catch( err => res.status(404).json('Error occured ' + err))
});

router.put('/update/:id', (req, res, next) => {
    const newUser = {
        username: req.body.username
    };
    User.findByIdAndUpdate(req.params.id, newUser, {new: true})
    .then(updatedUser => {
        if(!updatedUser)
            return next();
        return res.json( {
            message: 'User updated',
            user: updatedUser
        });
    })
    .catch(err => next(err));
});

router.delete('/delete/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id)
    .then( deletedUser => {
        if(!deletedUser)
            return next();
        return res.json( {
            message: 'User deleted',
            user: deletedUser
        });
    })
    .catch(err => next(err));
});

module.exports = router;