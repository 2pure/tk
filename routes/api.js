/**
 * Created by sergeyzubov on 15/01/16.
 */
module.exports = function(app, express, fs, client,event,subevent,ticket,venue,collection,sessions,theme,purchase,mails,eventvenue,collectionevent,themecollection,clientpurchases,clientmails,event_subevent,sub_event_ticket ) {
    'use strict';
    var api = express.Router();

    api.get('/themes', function (req, res) {
       return theme.findAll({include: [collection]}).then(function (theme) {
            res.send(theme);
        })
    });
    api.get('/themes/:id', function (req, res) {
        return theme.find({where: {id: req.params.id}, include: [collection]}).then(function (theme) {
            res.send(theme);
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
    api.get('/collections', function (req, res) {
        return collection.findAll({include: [event]}).then(function (events) {
            res.send(events);
        })
    });
    api.get('/collections/:id', function (req, res) {
        return collection.find({where: {id: req.params.id}, include: [event]}).then(function (events) {
            res.send(events);
        })
    });
    api.get('/events', function (req, res) {
        return event.findAll().then(function (events) {
            res.send(events);
        });
    });
    api.get('/events/:id', function (req, res) {
        return event.find({where: {event_id: req.params.id}, include: [subevent, venue]}).then(function (events) {
            res.send(events);
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

        fs.readFile('data/collection.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            console.log(obj);
            for (var item = 0; item < obj.length; item++)
            {
                console.log(obj[item]);
                collection.create({
                    name: obj[item].FIELD2,
                    description: obj[item].FIELD4
                })
            }
        });

    });

    api.get('/initCollectionsRelations', function (req, res) {

        fs.readFile('data/collection.json', 'utf8', function (err, data) {
            if (err) throw err;
            var obj = JSON.parse(data);
            //console.log(obj);
            for (var item = 0; item < obj.length; item++)
            {
                var num = obj[item].FIELD5.split(",");
                for (var i = 0; i < num.length; i++) {
                    var temp = parseInt(num[i]);

                    set_relations(temp, obj[item].FIELD2);

                }
            }
        });

    });
    // init api route. all api routes will begin with /api
    app.use('/api', api);


}