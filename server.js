var express = require('express');
var path = require('path');
var mysql = require('mysql');
var method = require('method-override');
var bodyParser = require('body-parser');

var app = express();

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 8889,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "friend_find_db"
});

app.use(express.static('app/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

app.get('/friends', function(req, res){
    connection.query('SELECT * FROM survey', function (error, results, fields) {
      if (error) throw error;
      res.json(results);
    });
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

function getSum(total, num) {
    return total + num;
}

app.post('/take-survey-info', function(req, res) {
    console.log(req.body);
    var userArray = [];
    var name = req.body.name;
    var q1 = req.body.q1;
    var q2 = req.body.q2;
    var q3 = req.body.q3;
    var q4 = req.body.q4;
    var q5 = req.body.q5;
    var q6 = req.body.q6;
    var q7 = req.body.q7;
    var q8 = req.body.q8;
    var q9 = req.body.q9;
    var q10 = req.body.q10;
    userArray.push(parseInt(q1), parseInt(q2), parseInt(q3), parseInt(q4), parseInt(q5), parseInt(q6), parseInt(q7),  parseInt(q8), parseInt(q9), parseInt(q10));
    // var arrTotal = userArray.reduce(getSum);
    var query = connection.query(
        `INSERT INTO survey (name, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
                  VALUES ('${name}', ${q1}, ${q2}, ${q3}, ${q4}, ${q5}, ${q6}, ${q7}, ${q8}, ${q9}, ${q10})`,
        function(err, data) {
          if (err) {
            console.log(err);
          } else {
            console.log("done!");
            res.sendFile(path.join(__dirname, 'app/public/find-friend.html'));
          }
        }
      );
});

// app.get('/show-friend', function(request, response) {

//         //   }
//         }
//       );
//     for (var i = 0; i < friends.length; i++) {
//         // console.log('friend = ' + JSON.stringify(friends[i]));

//         // Compute differenes for each question
//         var diff = 0;
//         for (var j = 0; j < userResponses.length; j++) {
//             diff += Math.abs(friends[i].scores[j] - userResponses[j]);
//         }
//         // console.log('diff = ' + diff);

//         // If lowest difference, record the friend match
//         if (diff < totalDifference) {
//             // console.log('Closest match found = ' + diff);
//             // console.log('Friend name = ' + friends[i].name);
//             // console.log('Friend image = ' + friends[i].photo);

//             totalDifference = diff;
//             matchName = friends[i].name;
//             matchImage = friends[i].photo;
//         }
//     }


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // first action can go here
});

app.listen(3000);