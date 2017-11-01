const express = require('express')
const router = express.Router()

const Campground = require('../models/campground')
const Comment = require('../models/comment')

const middleware = require('../middleware')


// INDEX
router.get('/', (req, res) => { 
    Campground.find({}, (err, campgrounds) => { 
        (err) ? console.log(err) : res.render('campgrounds/index', {campgrounds: campgrounds}) 
    }) 
})

// CREATE
router.post('/', middleware.isLoggedIn, (req, res) => { 
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    Campground.create(
        { 
            name: req.body.name, 
            image: req.body.image, 
            description: req.body.description,
            price: req.body.price,
            author: author
        }, (err, newCamp) => {
            (err) ? console.log(err) : res.redirect('/campgrounds')
        })
})

// NEW
router.get('/new', middleware.isLoggedIn, (req, res) => { res.render('campgrounds/new') })

// SHOW
router.get('/:id', (req, res) => { 
    Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
        if(err)
            console.log(err) 
        else {
            res.render('campgrounds/show', { campground: foundCampground })
        }
    })
})

// EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => { 
    Campground.findById(req.params.id, (err, found) => {
        (err) ? res.redirect('back') : res.render('campgrounds/edit', { campground: found })
    })
})

// UPDATE
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updated) => {
        (err) ? res.redirect('/campgrounds') : res.redirect(`/campgrounds/${req.params.id}`)
    })
})

// DESTROY
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {  
    Campground.findByIdAndRemove(req.params.id, (err) => {
        (err) ? res.redirect('/campgrounds') : res.redirect('/campgrounds')
    })
})

module.exports = router
