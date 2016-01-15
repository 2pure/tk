/**
 * Created by sergeyzubov on 15/01/16.
 */
/**
 * Created by sergeyzubov on 15/01/16.
 */

var CronJob = require('cron').CronJob;
module.exports = function( fs, venue,event, subevent, ticket) {
    'use strict';

    new CronJob('0,30 * * * *', function () {
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


    }, null, true, 'America/Los_Angeles');

}