const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.post('/users/login', passport.authenticate('local', (req, res) =>{
    // res.send({'success_msg': 'Welcome!'});
    // console.log(req);
}));

router.post('/users/register', async (req, res) =>{
    const errors = [];
    const {
        name,
        email,
        password,
        role,
        confirm_password
    } = req.body;

    console.log("datos", req.body);
    if(name.length <= 0){
        errors.push({text: 'Please insert your name'});
    }
    if(password != confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Password must be al least 4 characters'});
    }
    if(errors.length > 0){
        res.json({'errors': errors});
    } else {
        const emailUser = await User.findOne({email: email});

        if (emailUser){
            res.json({'error_msg': 'The email is already in use'});
        }

        const newUser = new User({name, email, password, role});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.json({'success_msg': 'Your are registered'});
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.json({'success_msg': 'Your are out!'});
});

module.exports = router;