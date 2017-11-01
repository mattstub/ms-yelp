const Campground = require('../models/campground')
const Comment = require('../models/comment')

module.exports = {
    checkCampgroundOwnership: (req, res, next) => {
        if(req.isAuthenticated()) {
            Campground.findById(req.params.id, (err, found) => { 
                if(err) {
                    req.flash('error', 'Unable to locate Campground in database!')
                    res.redirect('back')
                } else {
                    if(found.author.id.equals(req.user._id))
                        next() 
                    else {
                        req.flash('error', 'You do not have permission for this!')
                        res.redirect('back')
                    }
                }
            })
        } else
            res.redirect('back')         
    },
    checkCommentOwnership: (req, res, next) => {
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (err, found) => { 
                if(err) {
                    req.flash('error', 'Unable to locate Comment in database!')
                    res.redirect('back')
                } else {
                    if(found.author.id.equals(req.user._id))
                        next() 
                    else {
                        req.flash('error', 'You do not have permission for this!')
                        res.redirect('back')
                    }
                }
            })
        } else {
            req.flash('error', 'You must be logged in!')
            res.redirect('back')    
        }
    },
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated())
            return next()
        req.flash('error', 'You must be logged in!')
        res.redirect('/login')
    }
};
