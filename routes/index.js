const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../models/user')


// ROOT
router.get('/', (req, res) => { res.render('landing') })

// REGISTER FORM
router.get('/register', (req, res) => { res.render('register') })

// REGISTER LOGIC
router.post('/register', (req, res) => {
    var newUser = new User({ username: req.body.username })
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err)
            return res.render('register', { 'error': err.message })
        }
        passport.authenticate('local')(req, res, () => { 
            req.flash('success', `Welcome to YelpCamp, ${user.username}!`)
            res.redirect('/campgrounds') 
        })
    })
})

// LOGIN FORM
router.get('/login', (req, res) => { res.render('login') })

// LOGIN LOGIC
router.post('/login', passport.authenticate('local', 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), (req, res) => { 
})

// LOGOUT
router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success', 'You have been successfully logged out. Have a good day!')
    res.redirect('campgrounds')
})

module.exports = router
