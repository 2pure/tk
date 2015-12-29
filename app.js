var express = require('express')
    , passport = require('passport')
    , util = require('util')
    , FacebookStrategy = require('passport-facebook').Strategy
    , logger = require('morgan')
    , session = require('express-session')
    , bodyParser = require("body-parser")
    , cookieParser = require("cookie-parser")
    , methodOverride = require('method-override');
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
app.use(express.static(__dirname + '/public'));


app.get('/card:id', function (req, res) {

   
})

app.get('/api/themes', function (req, res) {
	res.send({
    "themes": [
        {
            "name": "Название темы",
            "description": "Описание темы",
            "img_url": "http://example.com/img.png",
            "theme_url": "http://example.com/theme",
            "collections_id_list": [1, 2, 3],
        },
    ]
})
  
});
app.get('/api/themes/:id', function (req, res) {
 
 res.send({
        "name": "Название темы",
        "description": "Описание темы",
        "img_url": "http://example.com/img.png",
        "theme_url": "http://example.com/theme",
        "collections_id_list": [1, 2, 3],
})
});
app.get('/api/collections', function (req, res) {
   res.send({
    "collections": [
        {
            "name": "Название коллекции",
            "description": "Описание коллекции",
            "img_url": "http://example.com/img.png",
            "collection_url": "http://example.com/collection",
            "plays_list": [
                {
                    "name": "Название спектакля 1",
                    "play_id": 1,
                },
            ],
        },
    ]
})
});
app.get('/api/collections/:id', function (req, res) {
      res.send({
        "name": "Название коллекции",
        "description": "Описание коллекции",
        "img_url": "http://example.com/img.png",
        "collection_url": "http://example.com/collection",
        "plays_list": [
            {
                "name": "Название спектакля 1",
                "play_id": 1,
            },
        ],
})
});

app.listen(3000);
