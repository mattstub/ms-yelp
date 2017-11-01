const express = require('express')
const router = express.Router({mergeParams: true})

const Campground = require('../models/campground')
const Comment = require('../models/comment')

const middleware = require('../middleware')

// COMMENTS - NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err)
            console.log(err)
        else
            res.render('comments/new', {campground: campground})
    })
})

// COMMENTS - CREATE
router.post('/', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err)
            res.redirect('/campgrounds')
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    req.flash('error', 'Could not locate Comment in database!')
                    console.log(err)
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    campground.comments.push(comment)
                    campground.save()
                    req.flash('success', 'Successfully created comment!')
                    res.redirect('/campgrounds/' + campground._id)
                }
            })
        }
    })
})

// COMMENT - EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, found) => {
        (err) ? res.redirect('back') : res.render('comments/edit', { campground_id: req.params.id, comment: found })
    })
})

// COMMENT - UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updated) => {
       (err) ? res.redirect('back') : res.redirect('/campgrounds/' + req.params.id)
   }) 
})

// COMMENT - DESTROY
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => { 
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err) {
            req.flash('error', 'Unable to find Comment in database')
            res.redirect('back') 
        } else {
            req.flash('success', 'Comment was deleted!')
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
})

module.exports = router
