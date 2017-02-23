'use strict';
//Requiring module dependencies
var express = require('express');
var bodyParser = require('body-parser');
var firebase = require('./initialize/firebaseInit');
var userCtrl = require('./controller/auth.js');
var config = require('dotenv').config()

//initialize express app
var app = express();
var route = express.Router();

//setting up twig view engine
app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'twig');

//setting up static directory
app.use(express.static('public'));


//using bodyParser as middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//creating port for app
var port = process.env.PORT || 3000;

//routing for web app
app.route('/')
    .get(function (req, res) {
        res.render('index', { title:'Home Page' });
    });

app.route('/signUp')
    .get(function (req, res) {
        res.render('signUp', { title:'Sign Up' });
    })
    .post(userCtrl.signUpUser);

app.route('/login')
    .get(function (req, res) {
        res.render('login', {title:'Log In'});
    })
    .post(userCtrl.signInUser)

app.route('/dashboard')
    .get(function (req, res) {
        res.render('dashboard', { title:'User Dashboard' });
    });

app.route('/history')
    .get(userCtrl.getFromHistory);

app.route('/leaderboard')
    .get(userCtrl.getFromLeaderBoard);

app.route('/google')
    .get(userCtrl.signInWithGoogle);

app.route('/test')
    .get(function (req, res) {
        res.render('test', { title:'Typing Speed Page' });
    })
    .post(userCtrl.postInHistory);

//listening for app on port 3000
app.listen(port, function () {
    console.log('Listening on port: ' + port);
});