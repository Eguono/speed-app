var firebase = require('../initialize/firebaseInit');
var db = firebase.database();
var ref = db.ref("/");

function postInHistory(req, res) {
    var startTime = req.body.date;
    var typingSpeed = req.body.typingSpeed;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var email = user.email;
            var userId = user.uid;


            ref.child('users/' + userId + '/firstName').once('value', function (snapShot) {

                var result = {};
                var data = {
                    firstName: snapShot.val(),
                    startTime: startTime,
                    typingSpeed: typingSpeed
                };
                var scoresRef = ref.child('history/' + userId);
                var scoreRef = scoresRef.push();
                var scoreKey = scoreRef.key;

                result["history/" + userId + "/" + scoreKey] = data;
                result["leaderboard/" + scoreKey] = data;

                ref.update(result);

                res.redirect('/test');
            });
        }

    });

}

function getFromHistory(req, res) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var email = user.email;
            var userId = user.uid;

            ref.child('history/' + userId).once('value', function (snapShot) {
                res.render('history', { title: 'User history', history: snapShot.val() });
            });

        }
    });

}

function getFromLeaderBoard(req, res) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var email = user.email;
            var userId = user.uid;
            ref.child('leaderboard').orderByChild('typingSpeed').once('value', function (snapShot) {
                res.render('leaderBoard', { title: 'Leadership Board', leaders: snapShot.val() });

            });
        }
    });

}

module.exports = {
    postInHistory,
    getFromHistory,
    getFromLeaderBoard
}