"use strict";

let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let Comment = require("./src/components/model/comment");


let app = express();
let router = express.Router();

let port = process.env.API_PORT || 3001;

//configuring the API to use bodyParser and look for JSON data in the request body

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, setting our headers to allow CORS with middleware

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    //disabling cache
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//setting the route path & initializing the API

router.get('/', function(req, res) {
    res.json({ message: 'API Initialized!'});
});

router.route("/comments")
    .get(function (req, res) {
        Comment.find(function (err, comments) {
            if(err)
                res.send(err);

            res.json(comments);
        })
    })

    .post(function (req, res) {
        let comment = new Comment();
        comment.author = req.body.author;
        comment.text = req.body.text;

        comment.save(function (err) {
            if(err)
                res.send(err);
            res.json({message: "Comment Successfully added"});
        });
    });

router.route("/comments/:comment_id")
    .put(function (req, res) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if(err)
                res.send(err);
            req.body.author ? comment.author = req.body.author : null;
            req.body.text ? comment.text = req.body.text : null;

            comment.save(function (err) {
                if(err)
                    res.send(err);
                res.json({message:"comment updated"})
            })
        })
    })

    .delete(function (req, res) {
        Comment.remove({_id:req.params.comment_id}, function (err, comment) {
            if(err)
                res.send(err);
            res.json({message:"deleted"});
        })
    });


app.use('/api', router);

//starting the server

app.listen(port, function() {
    console.log("api running on port " + port);
});


//db config
//mongoose.connect('mongodb://smartera-admin:smartera-admin@ds117178.mlab.com:17178/smart_era');

mongoose.connect('mongodb://localhost:27017/smart_era');
