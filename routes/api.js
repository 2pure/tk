/**
 * Created by sergeyzubov on 15/01/16.
 */
module.exports = function (app, express, fs, client, event, subevent, ticket, venue, collection, sessions, theme, purchase, mails, eventvenue, collectionevent, themecollection, clientpurchases, clientmails, event_subevent, sub_event_ticket) {
    'use strict';
    var api = express.Router();


    api.get('/themes?', function (req, res) {
        //http://localhost:3000/api/themes?limit=5&offset=0
        return theme.findAll({ limit: req.param('limit'), // Dynamic from query string.
            offset: req.param('offset')}
        ).then(function (theme) {
            var ret = {themes: []};
            for (var i = 0; i < theme.length; i++) {
                var element = {
                    name: theme[i].name,
                    description: theme[i].description,
                    img_url: theme[i].img_url,
                    theme_url: theme[i].theme_url,
                    theme_id: theme[i].id
                };
                ret.themes.push(element);
            }
            res.send(ret);
        })
    });
    api.get('/themes/:id', function (req, res) {
        return theme.find({
            where: {id: req.params.id},
            include: [{model: collection, include: [event]}]
        }).then(function (theme) {
            var coll = [];

            for (var i = 0; i < theme.collections.length; i++) {
                var events_list = [];
                for (var j = 0; j < theme.collections[i].events.length; j++) {
                    events_list.push({
                        name: theme.collections[i].events[j].title,
                        event_id: theme.collections[i].events[j].event_id
                    })
                }
                var element = {
                    name: theme.collections[i].name,
                    description: theme.collections[i].description,
                    img_url: theme.collections[i].img_url,
                    collection_id: theme.collections[i].id,
                    events_list: events_list
                }
                coll.push(element);
            }
            var ret = {
                name: theme.name,
                description: theme.description,
                img_url: theme.img_url,
                theme_url: theme.theme_url,
                theme_id: theme.id,
                collections: coll
            };
            res.send(ret);
        })
    });




    api.get('/venues', function (req, res) {
        return venue.findAll({include: [event]}).then(function (venues) {
            res.send(venues);
        })
    });
    api.get('/venues/:id', function (req, res) {
        return theme.find({where: {venue_id: req.params.id}, include: [event]}).then(function (venues) {
            res.send(venues);
        })
    });
    api.get('/newcollections?', function (req, res) {
        return collection.findAll({include: [event], limit: req.param('limit'), // Dynamic from query string.
            offset: req.param('offset')}).then(function (collections) {
            var ret = {collections: []};
            for (var i = 0; i < collections.length; i++) {
                var events_list = [];
                for (var j = 0; j < collections[i].events.length; j++) {
                    events_list.push({
                        name: collections[i].events[j].title,
                        event_id: collections[i].events[j].event_id
                    })
                }
                var element = {
                    name: collections[i].name,
                    description: collections[i].description,
                    img_url: collections[i].img_url,
                    collection_id: collections[i].id,
                    events_list: events_list
                };
                ret.collections.push(element);
            }
            res.send(ret);
        })
    });
    api.get('/collections/:id', function (req, res) {
        return collection.find({where: {id: req.params.id}, include: [event]}).then(function (collections) {
            var events_list = [];
            for (var j = 0; j < collections.events.length; j++) {
                events_list.push({
                    event_id: collections.events[j].event_id,
                    venue_name: "Московская Оперета",
                    venue_id: "12",
                    img_url: collections.events[j].event_img_url,
                    name: collections.events[j].title,
                    description: collections.events[j].description,
                    actors_list: " ",
                    genres_list: " ",
                    directors_list: " ",
                    event_dates: collections.events[j].event_dates,
                    event_prices: {
                        stalls: 1000,
                        mezzanine: 2000,
                        balcony: 3000
                    }
                })
            }
            var element = {
                name: collections.name,
                description: collections.description,
                img_url: collections.img_url,
                collection_id: collections.id,
                events_list: events_list
            };
            res.send(element);
        })
    });

    api.get('/events/:id', function (req, res) {
        return event.find({where: {event_id: req.params.id}, include: [venue]}).then(function (events) {
            res.send({
                event_id: events.event_id,
                venue_name: "Московская Оперета",
                venue_id: "12",
                img_url: events.event_img_url,
                name: events.title,
                description: events.description,
                actors_list: " ",
                genres_list: " ",
                directors_list: " ",
                event_dates: events.event_dates,
                event_prices: {
                    stalls: 1000,
                    mezzanine: 2000,
                    balcony: 3000
                }
            });
        })
    });
    api.get('/subevents', function (req, res) {
        return subevent.findAll().then(function (subevents) {
            res.send(subevents);
        });
    });
    api.get('/subevents/:id', function (req, res) {
        return subevent.find({where: {subevent_id: req.params.id}, include: [ticket]}).then(function (subevents) {
            res.send(subevents);
        })
    });

    api.get('/tickets', function (req, res) {
        return ticket.findAll().then(function (tickets) {
            res.send(tickets);
        });
    });
    api.get('/tickets/:id', function (req, res) {
        return ticket.find({where: {id: req.params.id}}).then(function (tickets) {
            res.send(tickets);
        })
    });
    api.get('/initDB', function (req, res) {
        fs.readFile('data/venues_info.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            console.log(obj.venues_info);
            for (var item = 0; item < obj.venues_info.length; item++) {
                console.log(obj.venues_info[item]);
                venue
                    .findOrCreate({
                        where: {theatre_name: obj.venues_info[item].name}, defaults: {
                            theatre_name: obj.venues_info[item].name,
                            google_address: obj.venues_info[item].google_address,
                            description: obj.venues_info[item].description,
                            venue_id: obj.venues_info[item].theatre_id
                        }
                    })
                    .spread(function (user, created) {
                        //console.log(created)
                    })
            }
            ;
        });

        fs.readFile('data/events_info.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            console.log(obj.events_info);
            //for(var item in obj.venues_info) {
            for (var item = 0; item < obj.events_info.length; item++)
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
            }
            ;
            //console.log(obj);
        });
        fs.readFile('data/subevent_info.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            console.log(obj.subevent_info);
            //for(var item in obj.venues_info) {
            for (var item = 0; item < obj.subevent_info.length; item++)
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
            }
            ;
            //console.log(obj);
        });

        fs.readFile('data/tickets_info.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            console.log(obj.tickets_info);
            //for(var item in obj.venues_info) {
            for (var item = 0; item < obj.tickets_info.length; item++)
                //alert( i + ": " + item + " (массив:" + arr + ")" );
            {
                console.log(obj.tickets_info[item]);
                ticket
                    .findOrCreate({
                        where: {
                            sector_id: obj.tickets_info[item].sector_id,
                            subevent_id: obj.tickets_info[item].subevent_id
                        }, defaults: obj.tickets_info[item]
                    })
                    .spread(function (user, created) {
                        console.log(created)
                    })
            }
            ;
            //console.log(obj);
        });

    });
    api.get('/initRelations', function (req, res) {
        event.findAll().then(function (events) {
            console.log(events);
            for (var item = 0; item < events.length; item++) {
                var ev_id = events[item].event_id;
                var idd = events[item].id;
                test_f(ev_id, idd);
            }
        })


        subevent.findAll().then(function (subevents) {
            console.log(subevents);
            for (var item = 0; item < subevents.length; item++) {
                var ev_id = subevents[item].subevent_id;
                var idd = subevents[item].id;
                change_ticket(ev_id, idd);
            }
        })

        event.findAll().then(function (events) {
            console.log(events);
            for (var item = 0; item < events.length; item++) {
                var ev_id = events[item].venue_id;
                var idd = events[item].id;
                change_venue(ev_id, idd);
            }
        })


    });
    api.get('/initCollections', function (req, res) {

        fs.readFile('data/collections.json', 'utf8', function (err, data) {
            if (err) throw err;

            var obj = JSON.parse(data);
            console.log(obj.collections_info);
            for (var item = 0; item < obj.collections_info.length; item++) {
                console.log(obj.collections_info[item]);
                collection.create({
                    name: obj.collections_info[item].name,
                    description: obj.collections_info[item].description,
                    img_url: obj.collections_info[item].img_url
                })
            }
        });

    });


    var set_relat = function (event_id, name) {
        collection.find({where: {name: name}}).then(function (coll) {
            coll_relation(coll.id, event_id);
            console.log(coll.id);
            console.log(event_id);
        })
    };

    var coll_relation = function (id, eventid) {
        event.find({where: {event_id: eventid}}).then(function (ev) {
            console.log(ev);
            save_to_collection_event(ev.id, id);
        })
    };


    var test_f = function (id, f_id) {
        subevent.findAll({where: {event_id: id}}).then(function (sub) {
            console.log('query exec: ');
            console.log(id);
            console.log(sub.length);

            for (var i = 0; i < sub.length; i++) {
                var sub_id = sub[i].id;
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
                var sub_id = ticketsinfos[i].id;
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
                var sub_id = ven[i].id;
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



    var save_to_collection_event = function (event_id, collection_id) {
        collectionevent.create({
            event_id: event_id,
            collection_id: collection_id
        })
    };


    api.get('/initCollectionsRelations', function (req, res) {

        fs.readFile('data/collections.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            console.log(obj);
            for (var item = 0; item < obj.collections_info.length; item++) {
                for (var i =0; i< obj.collections_info[item].events_list.length;i++)
                {
                    set_relat(obj.collections_info[item].events_list[i],obj.collections_info[item].name);
                }
            }
        });

    });

    api.get('/createPrice', function (req, res) {
        event.findAll().then(function (events) {
           for (var i=0;i<events.length;i++){
               events[i].updateAttributes({
                   event_prices: '1200'
               }).success(function() {});
           }
        })

    });
    // init api route. all api routes will begin with /api
    app.use('/api', api);


}