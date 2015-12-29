var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , FacebookStrategy = require('passport-facebook').Strategy
    , logger = require('morgan')
    , session = require('express-session')
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , methodOverride = require('method-override')
    //, orm = require('orm');


var Sequelize = require('sequelize');
var sequelize = new Sequelize("postgres://postgres:tk@localhost/postgres");

var Cards = sequelize.define('Cards', {
    image_url: Sequelize.STRING,
    collection_name: Sequelize.STRING,
    collection_description: Sequelize.STRING
});

var Clients = sequelize.define('Clients', {
    account_id: Sequelize.BIGINT,
    account_name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING
});

var Theatres = sequelize.define('Theatres', {
    theatre_name: Sequelize.STRING,
    address: Sequelize.STRING,
    description: Sequelize.STRING,
    image_url: Sequelize.STRING
});
var Plays = sequelize.define('Plays', {
    producer: Sequelize.STRING,
    play_name: Sequelize.STRING,
    description: Sequelize.STRING,
    actors: Sequelize.STRING,
    duration: Sequelize.STRING,
    genre: Sequelize.STRING,
    year: Sequelize.STRING,
    author: Sequelize.STRING,
    age: Sequelize.STRING,
    image_url: Sequelize.STRING,
    TheatreId: Sequelize.INTEGER
});
Plays.belongsTo(Theatres); // Will add TheatresId to Plays

sequelize.sync().then(function() {

    Theatres.create({
        producer: 'негр',
        play_name: 'негр',
        description: 'негр',
        actors: 'негр',
        duration: 'негр',
        genre: 'негр',
        year: 'негр',
        author: 'негр',
        age: 'негр',
        image_url: 'негр'
    });
    Plays.create({
        theatre_name: 'Большой театр',
        address: 'Москва',
        description: 'негр-негр',
        image_url: 'негр.png',

    });
    return Cards.create({
        image_url: "negr.png",
        collection_name: "niger",
        collection_description: "niger niger"
    });
}).then(function(jane) {
    console.log(jane.get({
        plain: true
    }));
});



var winston = require("winston");
var FACEBOOK_APP_ID = "1634268476827505"
var FACEBOOK_APP_SECRET = "1210ad4eceeb339cbd222734469f46bd";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Facebook profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.
            Clients
                .findOrCreate({where: {account_id: profile.id}, defaults: {
                    account_id: profile.id,
                    account_name: profile.displayName,
                    email: 'test@mail.ru',
                    phone: 'zzz'
                }})
                .spread(function(user, created) {
                    console.log(user.get({
                        plain: true
                    }))
                    console.log(created)
                })
            return done(null, profile);
        });
    }
));

var app = express();

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger());
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({secret: 'keyboard cat'}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index', {user: req.user});
});

app.get('/account', ensureAuthenticated, function (req, res) {
    res.render('account', {user: req.user});
});

app.get('/login', function (req, res) {
    res.render('login', {user: req.user});
});

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function (req, res) {
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
    });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    function (req, res) {
        console.log(req.user);
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login')
}


app.get('/card:id', function (req, res) {

    Cards.findById(req.params.id).then(function(card) {
        console.log(card);
        res.send(card);
    })
})

app.get('/api/themes', function (req, res) {
    Plays.findAll({ include: [ Theatres ] }).then(function(play) {
        res.send(play);
    })
});
app.get('/api/themes/:id', function (req, res) {
    Plays.findById(req.params.id).then(function(play) {
       res.send(play);
    })
    //console.log(req.params.id);
    //res.send('all themes')
});
app.get('/api/collections', function (req, res) {
    console.log(req.param('page'));
    console.log(req.param('size'));
    console.log(req.param('all'));
    res.send("collections page");
});
app.get('/api/collections/:id', function (req, res) {
    console.log(req.params.id);
    res.send('all collections')
});

app.listen(3000);
