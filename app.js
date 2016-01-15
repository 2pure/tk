var express = require('express')
    , util = require('util')
    , logger = require('morgan')
    , session = require('express-session')
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , cors = require("cors")
    , methodOverride = require('method-override');

var fs = require('fs');
var Sequelize = require('sequelize');
var sequelize = new Sequelize("postgres://postgres:tk@localhost/postgres");
//
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
    venue_id: Sequelize.DECIMAL,

    description: Sequelize.TEXT,
    actors_list: Sequelize.ARRAY(Sequelize.TEXT),
    genres_list: Sequelize.ARRAY(Sequelize.TEXT),
    directors_list: Sequelize.ARRAY(Sequelize.TEXT),
    event_prices: Sequelize.JSON
}, {underscored: true});

var subevent = sequelize.define('subevent', {
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

var venue = sequelize.define('venue', {
    theatre_name: Sequelize.STRING,
    address: Sequelize.STRING,
    google_address: Sequelize.STRING,
    description: Sequelize.TEXT,
    image_url: Sequelize.STRING,
    region: Sequelize.STRING,
    venue_id: Sequelize.DECIMAL
}, {underscored: true});
var collection = sequelize.define('collection', {
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    collection_url: Sequelize.STRING,
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
    theme_url: Sequelize.STRING,
    img_url: Sequelize.STRING
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


var eventvenue = sequelize.define('eventvenue', {
    definition: Sequelize.TEXT
});
var collectionevent = sequelize.define('collectionevent', {
    definition: Sequelize.TEXT
});
var themecollection = sequelize.define('themecollection', {
    definition: Sequelize.TEXT
});

var clientpurchases = sequelize.define('clientpurchases', {
    definition: Sequelize.TEXT
});

var clientmails = sequelize.define('clientmails', {
    definition: Sequelize.TEXT
});
var event_subevent = sequelize.define('event_subevent', {
    definition: Sequelize.STRING
});
var sub_event_ticket = sequelize.define('sub_event_ticket', {
    definition: Sequelize.STRING
});

venue.belongsToMany(event, {through: eventvenue});
event.belongsToMany(venue, {through: eventvenue});

collection.belongsToMany(event, {through: collectionevent});
event.belongsToMany(collection, {through: collectionevent});

theme.belongsToMany(collection, {through: themecollection});
collection.belongsToMany(theme, {through: themecollection});

client.belongsToMany(purchase, {through: clientpurchases});
purchase.belongsToMany(client, {through: clientpurchases});

client.belongsToMany(mails, {through: clientmails});

event.belongsToMany(subevent, {through: event_subevent});
subevent.belongsToMany(event, {through: event_subevent});

subevent.belongsToMany(ticket, {through: sub_event_ticket});
ticket.belongsToMany(subevent, {through: sub_event_ticket});

sequelize.sync().then(function () {
    return client.create({});
}).then(function (jane) {
    console.log(jane.get({
        plain: true
    }));
});

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

app.use(express.static(__dirname + '/public'));

app.get('/auth/login', function (req, res) {
    res.render('login', {user: req.user});
});


var test_f = function (id, f_id) {
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


var change_ticket = function (id, f_id) {
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
var change_venue = function (id, f_id) {
    venue.findAll({where: {venue_id: id}}).then(function (ven) {
        console.log('query exec: ');
        console.log(id);
        console.log(ven.length);

        for (var i = 0; i < ven.length; i++) {
            sub_id = ven[i].id;
            eventvenue
                .findOrCreate({
                    where: {venue_id: sub_id, event_id: f_id}, defaults: {
                        venue_id: sub_id,
                        event_id: f_id
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
var coll_relation = function (id, eventid) {
    event.find({where: {event_id: eventid}}).then(function (ev) {
        console.log(ev);
        save_to_collection_event(ev.id, id);
    })
};

var save_to_collection_event = function (event_id, collection_id) {
    collectionevent.create({
        event_id: event_id,
        collection_id: collection_id
    })
}

var set_relations = function (event_id, name) {
    collection.find({where: {name: name}}).then(function (coll) {
        coll_relation(coll.id, event_id);
        console.log(coll.id);
        console.log(event_id);
    })
}

require('./routes/api')(app, express, fs, client, event, subevent, ticket, venue, collection, sessions, theme, purchase, mails, eventvenue, collectionevent, themecollection, clientpurchases, clientmails, event_subevent, sub_event_ticket);
require('./cron/jobs')(fs, venue, event, subevent, ticket);
require('./routes/auth')(app, express, client);

app.listen(3000);



