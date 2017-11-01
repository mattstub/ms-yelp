const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const local = require('passport-local')
const methodOverride = require('method-override')
const flash = require('connect-flash')

// SCHEMAS
const Campground = require('./models/campground')
const Comment = require('./models/comment')
const User = require('./models/user')

// ROUTES
const campgroundRoutes = require('./routes/campgrounds')
const commentRoutes = require('./routes/comments')
const authRoutes = require('./routes/index')

// const seedDB = require('./seeds')

const app = express()

app.use(flash())

// ==========================
//   PASSPORT CONFIGURATION
// ==========================

app.use(require('express-session')({
    secret: 'something secret',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new local(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// ================
//   SERVER SETUP
// ================

let URL = process.env.DATABASEURL || "mongodb://localhost/yelpcamp"

mongoose.connect(URL, {useMongoClient: true})
mongoose.Promise = global.Promise

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})


app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)
app.use('/', authRoutes)

app.set('view engine', 'ejs')

// seedDB() - seed the database


// ==================
//   SERVER STARTUP
// ==================

app.listen(process.env.PORT, process.env.IP, () => { console.log(`YelpCamp Server is Running`) })
