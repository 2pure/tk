var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , FacebookStrategy = require('passport-facebook').Strategy
    , logger = require('morgan')
    , session = require('express-session')
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , cors = require("cors")
    , methodOverride = require('method-override');


var CronJob = require('cron').CronJob;
var fs = require('fs');

var Sequelize = require('sequelize');
var sequelize = new Sequelize("postgres://postgres:tk@localhost/postgres");

var client = sequelize.define('client', {
    account_id: Sequelize.BIGINT,
    account_name: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
}, {underscored: true});


var event = sequelize.define('event', {
    event_dates: Sequelize.ARRAY(Sequelize.DECIMAL),
    event_id: Sequelize.DECIMAL,
    event_img_url: Sequelize.TEXT,
    title: Sequelize.STRING,
    venue_id: Sequelize.DECIMAL
}, {underscored: true});

var subevent = sequelize.define('subevent', {
    //event_dates: Sequelize.ARRAY(Sequelize.DECIMAL),
    //event_id: Sequelize.DECIMAL,
    //event_img_url: Sequelize.TEXT,
    //title: Sequelize.STRING,
    //venue_id: Sequelize.DECIMAL
    age: Sequelize.INTEGER,
    commission: Sequelize.INTEGER,
    credit_card_payment: Sequelize.BOOLEAN,
    eticket_possible: Sequelize.BOOLEAN,
    event_id: Sequelize.DECIMAL,
    sectors_list: Sequelize.ARRAY(Sequelize.DECIMAL),
    subevent_date: Sequelize.DATE,
    subevent_id: Sequelize.DECIMAL
}, {underscored: true});

var ticket = sequelize.define('ticket', {
    sector_id: Sequelize.DECIMAL,
    subevent_id: Sequelize.DECIMAL,
    tickets_list: Sequelize.JSON
}, {underscored: true});

var theatre = sequelize.define('theatre', {
    theatre_name: Sequelize.STRING,
    address: Sequelize.STRING,
    description: Sequelize.TEXT,
    image_url: Sequelize.STRING,
    ponominalu_id: Sequelize.STRING
}, {underscored: true});
var play = sequelize.define('play', {
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
}, {underscored: true});
var collection = sequelize.define('collection', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    img_url: Sequelize.STRING
}, {underscored: true});
var sessions = sequelize.define('sessions', {
    session_name: Sequelize.STRING,
    date: Sequelize.DATE,
    tickets: Sequelize.JSON
}, {underscored: true});
var theme = sequelize.define('theme', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    theme_url: Sequelize.STRING
}, {underscored: true});
var purchase = sequelize.define('purchase', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.STRING,
    purchase_plan: Sequelize.STRING,
    people_count: Sequelize.INTEGER
}, {underscored: true});
var mails = sequelize.define('mails', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    policy: Sequelize.STRING,
    type: Sequelize.STRING,
}, {underscored: true});


var theatreplay = sequelize.define('theatreplay', {
    definition: Sequelize.STRING
});
var collectionplay = sequelize.define('collectionplay', {
    definition: Sequelize.STRING
});
var themecollection = sequelize.define('themecollection', {
    definition: Sequelize.STRING
});
var playsessions = sequelize.define('playsessions', {
    definition: Sequelize.STRING
});

var clientpurchases = sequelize.define('clientpurchases', {
    definition: Sequelize.STRING
});

var clientmails = sequelize.define('clientmails', {
    definition: Sequelize.STRING
});
var event_subevent = sequelize.define('event_subevent', {
    definition: Sequelize.STRING
});
var sub_event_ticket = sequelize.define('sub_event_ticket', {
    definition: Sequelize.STRING
});

theatre.belongsToMany(play, {through: theatreplay});

collection.belongsToMany(play, {through: collectionplay});
play.belongsToMany(collection, {through: collectionplay});

theme.belongsToMany(collection, {through: themecollection});
collection.belongsToMany(theme, {through: themecollection});

sessions.belongsToMany(play, {through: playsessions});

client.belongsToMany(purchase, {through: clientpurchases});
purchase.belongsToMany(client, {through: clientpurchases});

client.belongsToMany(mails, {through: clientmails});


event.belongsToMany(subevent, {through: event_subevent});
subevent.belongsToMany(event, {through: event_subevent});

subevent.belongsToMany(ticket, {through: sub_event_ticket});
ticket.belongsToMany(subevent, {through: sub_event_ticket});

//event.belongsTo(subevent, {foreignKey: 'event_id', targetKey: 'event_id'});
//subevent.belongsTo(event, {foreignKey: 'event_id', targetKey: 'event_id'});

sequelize.sync().then(function () {
    //
    //
    //play.create({
    //    producer: 'негр',
    //    play_name: 'Опера 1',
    //    description: 'театр',
    //    actors: 'негр',
    //    duration: '2 часа',
    //    genre: 'негр',
    //    year: '2015',
    //    author: 'негр',
    //    age: '18',
    //    image_url: '/niger.png'
    //});
    //
    //play.create({
    //    producer: 'негр',
    //    play_name: 'Опера 2',
    //    description: 'театр',
    //    actors: 'негр',
    //    duration: '2 часа',
    //    genre: 'негр',
    //    year: '2015',
    //    author: 'негр',
    //    age: '18',
    //    image_url: '/niger.png'
    //});
    //
    //play.create({
    //    producer: 'негр',
    //    play_name: 'Опера 3',
    //    description: 'театр',
    //    actors: 'негр',
    //    duration: '2 часа',
    //    genre: 'негр',
    //    year: '2015',
    //    author: 'негр',
    //    age: '18',
    //    image_url: '/niger.png'
    //});
    //
    //play.create({
    //    producer: 'негр',
    //    play_name: 'Опера 4',
    //    description: 'театр',
    //    actors: 'негр',
    //    duration: '2 часа',
    //    genre: 'негр',
    //    year: '2015',
    //    author: 'негр',
    //    age: '18',
    //    image_url: '/niger.png'
    //});
    //play.create({
    //    producer: 'негр',
    //    play_name: 'Опера 4',
    //    description: 'театр',
    //    actors: 'негр',
    //    duration: '2 часа',
    //    genre: 'негр',
    //    year: '2015',
    //    author: 'негр',
    //    age: '18',
    //    image_url: '/niger.png'
    //});
    //play.create({
    //    producer: 'негр',
    //    play_name: 'Опера 4',
    //    description: 'театр',
    //    actors: 'негр',
    //    duration: '2 часа',
    //    genre: 'негр',
    //    year: '2015',
    //    author: 'негр',
    //    age: '18',
    //    image_url: '/niger.png'
    //});
    //
    //theatre.create({
    //    theatre_name: 'Большой театр',
    //    address: 'Москва',
    //    description: 'крутое описание',
    //    image_url: '/негр.png',
    //});
    //theatre.create({
    //    theatre_name: 'Современник',
    //    address: 'Москва',
    //    description: 'крутое описание',
    //    image_url: '/негр.png',
    //});
    //collection.create({
    //    name: 'коллекция 1',
    //    description: 'коллекция 1',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 2',
    //    description: 'коллекция 2',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 3',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 4',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 5',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 6',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 7',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 8',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 9',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 10',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 11',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //collection.create({
    //    name: 'коллекция 12',
    //    description: 'коллекция 3',
    //    img_url: 'url'
    //});
    //
    //
    //theme.create({
    //    name: 'тема 1',
    //    description: 'тема 1',
    //    theme_url: 'url'
    //});
    //theme.create({
    //    name: 'тема 2',
    //    description: 'тема 2',
    //    theme_url: 'url'
    //});
    //theme.create({
    //    name: 'тема 3',
    //    description: 'тема 2',
    //    theme_url: 'url'
    //});
    //theme.create({
    //    name: 'тема 4',
    //    description: 'тема 2',
    //    theme_url: 'url'
    //});
    //theme.create({
    //    name: 'тема 5',
    //    description: 'тема 2',
    //    theme_url: 'url'
    //});
    //theme.create({
    //    name: 'тема 6',
    //    description: 'тема 2',
    //    theme_url: 'url'
    //});
    //
    //theatreplay.create({
    //    theatre_id: 1,
    //    play_id: 1
    //});
    //theatreplay.create({
    //    theatre_id: 1,
    //    play_id: 2
    //});
    //theatreplay.create({
    //    theatre_id: 1,
    //    play_id: 3
    //});
    //theatreplay.create({
    //    theatre_id: 1,
    //    play_id: 4
    //});
    //theatreplay.create({
    //    theatre_id: 2,
    //    play_id: 5
    //});
    //theatreplay.create({
    //    theatre_id: 2,
    //    play_id: 6
    //});
    //collectionplay.create({
    //    collection_id: 1,
    //    play_id: 1
    //});
    //collectionplay.create({
    //    collection_id: 1,
    //    play_id: 2
    //});
    //collectionplay.create({
    //    collection_id: 1,
    //    play_id: 3
    //});
    //collectionplay.create({
    //    collection_id: 2,
    //    play_id: 4
    //});
    //collectionplay.create({
    //    collection_id: 2,
    //    play_id: 5
    //});
    //collectionplay.create({
    //    collection_id: 3,
    //    play_id: 6
    //});

    //pl.addcollection({
    //    theatre_name: 'Большой театр',
    //    address: 'Москва',
    //    description: 'негр-негр',
    //    image_url: 'негр.png',
    //});
    // ok, now they are saved... how do I get them later on?
    return play.create({
        producer: 'негр',
        play_name: 'Опера 1',
        description: 'театр',
        actors: 'негр',
        duration: '2 часа',
        genre: 'негр',
        year: '2015',
        author: 'негр',
        age: '18',
        image_url: '/niger.png'
    });
}).then(function (jane) {
    console.log(jane.get({
        plain: true
    }));
});

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
            client
                .findOrCreate({
                    where: {account_id: profile.id}, defaults: {
                        account_id: profile.id,
                        account_name: profile.displayName,
                        email: 'test@mail.ru',
                        phone: 'zzz'
                    }
                })
                .spread(function (user, created) {
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
app.use(cors());
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

    cards.findById(req.params.id).then(function (card) {
        console.log(card);
        res.send(card);
    })
})

app.get('/api/themes', function (req, res) {
    theme.findAll({include: [collection]}).then(function (theme) {
        res.send(theme);
    })
});
app.get('/api/themes/:id', function (req, res) {
    theme.find({where: {id: req.params.id}, include: [collection]}).then(function (theme) {
        res.send(theme);
    })
    //console.log(req.params.id);
    //res.send('all themes')
});
app.get('/api/collections', function (req, res) {
    collection.findAll({include: [play]}).then(function (coll) {
        res.send(coll);
    })
});
app.get('/api/collections/:id', function (req, res) {
    collection.find({where: {id: req.params.id}, include: [play]}).then(function (coll) {
        res.send(coll);
    })
});
app.get('/api/plays/:id', function (req, res) {
    play.find({where: {id: req.params.id}}).then(function (pl) {
        res.send(pl);
    })
});
app.get('/api/plays', function (req, res) {
    play.findAll().then(function (pl) {
        res.send(pl);
    })
});
app.get('/api/events', function (req, res) {
    event.findAll().then(function(events) {
        res.send(events);
    });
});
app.get('/api/events/:id', function (req, res) {
    event.find({where: {id: req.params.id}, include: [subevent]}).then(function (events) {
        res.send(events);
    })
});
app.get('/api/subevents', function (req, res) {
    subevent.findAll().then(function (subevents) {
        res.send(subevents);
    });
});
app.get('/api/subevents/:id', function (req, res) {
    subevent.find({where: {id: req.params.id}, include: [ticket]}).then(function (subevents) {
        res.send(subevents);
    })
});

app.get('/api/tickets', function (req, res) {
    ticket.findAll().then(function (tickets) {
        res.send(tickets);
    });
});
app.get('/api/tickets/:id', function (req, res) {
    ticket.find({where: {id: req.params.id}}).then(function (tickets) {
        res.send(tickets);
    })
});

new CronJob('0,30 * * * *', function () {
    fs.readFile('data/venues_info.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        console.log(obj.venues_info);
        for (var item=0; item< obj.venues_info.length; item++)
        {
            console.log(obj.venues_info[item]);
            theatre
                .findOrCreate({
                    where: {theatre_name: obj.venues_info[item].name}, defaults: {
                        theatre_name: obj.venues_info[item].name,
                        address: obj.venues_info[item].google_address,
                        description: obj.venues_info[item].description,
                        image_url: '',
                        ponominalu_id: obj.venues_info[item].theatre_id
                    }
                })
                .spread(function (user, created) {
                    //console.log(created)
                })
        };
    });

    fs.readFile('data/events_info.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        console.log(obj.events_info);
        //for(var item in obj.venues_info) {
        for (var item=0; item< obj.events_info.length; item++)
            //alert( i + ": " + item + " (массив:" + arr + ")" );
        {
            console.log(obj.events_info[item]);
            event
                .findOrCreate({
                    where: {event_id: obj.events_info[item].event_id}, defaults: obj.events_info[item]
                })
                .spread(function (user, created) {
                    console.log(created)
                })
        };
        //console.log(obj);
    });
    fs.readFile('data/subevent_info.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        console.log(obj.subevent_info);
        //for(var item in obj.venues_info) {
        for (var item=0; item< obj.subevent_info.length; item++)
            //alert( i + ": " + item + " (массив:" + arr + ")" );
        {
            console.log(obj.subevent_info[item]);
            subevent
                .findOrCreate({
                    where: {subevent_id: obj.subevent_info[item].event_id}, defaults: obj.subevent_info[item]
                })
                .spread(function (user, created) {
                    console.log(created)
                })
        };
        //console.log(obj);
    });

    fs.readFile('data/tickets_info.json', 'utf8', function (err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        console.log(obj.tickets_info);
        //for(var item in obj.venues_info) {
        for (var item=0; item< obj.tickets_info.length; item++)
            //alert( i + ": " + item + " (массив:" + arr + ")" );
        {
            console.log(obj.tickets_info[item]);
            ticket
                .findOrCreate({
                    where: {sector_id: obj.tickets_info[item].sector_id, subevent_id: obj.tickets_info[item].subevent_id }, defaults: obj.tickets_info[item]
                })
                .spread(function (user, created) {
                    console.log(created)
                })
        };
        //console.log(obj);
    });


    event.findAll().then(function (events) {
        console.log(events);
        for (var item = 0; item < events.length; item++) {
            var ev_id = events[item].event_id;
            var idd = events[item].id;
            test_f(ev_id,idd);
        }
    })


    subevent.findAll().then(function (subevents) {
        console.log(subevents);
        for (var item = 0; item < subevents.length; item++) {
            var ev_id = subevents[item].subevent_id;
            var idd = subevents[item].id;
            change_ticket(ev_id,idd);
        }
    })

}, null, true, 'America/Los_Angeles');



var test_f = function(id, f_id){
    subevent.findAll({where: {event_id: id}}).then(function (sub) {
        console.log('query exec: ');
        console.log(id);
        console.log(sub.length);

        for (var i = 0; i < sub.length; i++) {
            sub_id = sub[i].id;
            event_subevent
                .findOrCreate({
                    where: {event_id: f_id, subevent_id: sub_id}, defaults: {
                        event_id: f_id,
                        subevent_id: sub_id
                    }
                })
                .spread(function (user, created) {
                    console.log(user.get({
                        plain: true
                    }))
                    console.log(created)
                })
        }
    })
};



var change_ticket = function(id, f_id){
    ticket.findAll({where: {subevent_id: id}}).then(function (ticketsinfos) {
        console.log('query exec: ');
        console.log(id);
        console.log(ticketsinfos.length);

        for (var i = 0; i < ticketsinfos.length; i++) {
            sub_id = ticketsinfos[i].id;
            sub_event_ticket
                .findOrCreate({
                    where: {ticket_id: sub_id, subevent_id: f_id}, defaults: {
                        ticket_id: sub_id,
                        subevent_id: f_id
                    }
                })
                .spread(function (user, created) {
                    console.log(user.get({
                        plain: true
                    }))
                    console.log(created)
                })
        }
    })
};

app.listen(3000);

//

