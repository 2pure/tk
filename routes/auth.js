/**
 * Created by sergeyzubov on 15/01/16.
 */

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (app, express, client) {
    'use strict';
    var api = express.Router();


    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login')
    }

    app.use(passport.initialize());
    app.use(passport.session());

    var FACEBOOK_APP_ID = "1245207025494593"
    var FACEBOOK_APP_SECRET = "b65061c41a8f5e48cc50fd316fc27b1a";

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
            callbackURL: "http://kurtr.ru/auth/facebook/callback",
            profileFields: ['id', 'emails', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
        },
        function (accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                // To keep the example simple, the user's Facebook profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the Facebook account with a user record in your database,
                // and return that user instead.
                console.log(profile);
                //console.log(profile.emails[0].value);
                //client
                //    .findOrCreate({
                //        where: {account_id: profile.id}, defaults: {
                //            account_id: profile.id,
                //            account_name: profile.displayName,
                //            email: '',
                //            phone: ''
                //        }
                //    })
                //    .spread(function (user, created) {
                //        console.log(user.get({
                //            plain: true
                //        }))
                //        console.log(created)
                //    })
                return done(null, profile);
            });
        }
    ));


    api.get('/facebook',
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
    api.get('/facebook/callback',
        passport.authenticate('facebook',  { scope: 'email'}),
        function (req, res) {
            console.log(req.user);
            res.redirect('/');
        });

    api.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //apply router
    app.use('/auth', api);

};