var userArray = [];
//this variable would be another user entry


function getSum(total, num) {
  return total + num;
}

// $('.submit').click(function(){
//     var name = $("input[name='name'").val();
//     var wasChecked1 = parseInt($("input[name='question1']:checked").val());
//     var wasChecked2 = parseInt($("input[name='question2']:checked").val()); 
//     var wasChecked3 = parseInt($("input[name='question3']:checked").val());
//     var wasChecked4 = parseInt($("input[name='question4']:checked").val());  
//     var wasChecked5 = parseInt($("input[name='question5']:checked").val()); 
//     var wasChecked6 = parseInt($("input[name='question6']:checked").val());  
//     var wasChecked7 = parseInt($("input[name='question7']:checked").val());   
//     var wasChecked8 = parseInt($("input[name='question8']:checked").val());    
//     var wasChecked9 = parseInt($("input[name='question9']:checked").val());     
//     var wasChecked10 = parseInt($("input[name='question10']:checked").val());

//     userArray.push(wasChecked1, wasChecked2, wasChecked3, wasChecked4, wasChecked5, wasChecked6, wasChecked7,  wasChecked8, wasChecked9, wasChecked10);
// })

var allFriends = {};
var newFriend = {};

// This runs when the results page is loaded.  It loads once the user submits a survey.
if (top.location.pathname === '/take-survey-info');
{
    getAllFriendsInfo();
}

// This loads all of the info for the existing friends from the api
function getAllFriendsInfo () {
    $.get("/friends", function(data) {
        allFriends = data;
        newFriend = data[(data.length - 1)];
        console.log(newFriend.name);
        // totalFriends = data.length;
        checkOtherFriendsScores();
    });
}

// This function will go through all of the friends in the api, and add a score to an array for each friend.
// The lowest score in the array is the closest match to the user.
function checkOtherFriendsScores() {
    var scoreArray = [];

    // This will go through every friend except the last one, since the user is the last person in allFriends
    for (var i = 0; i < (allFriends.length - 1); i++) {
        var diff = 0;
            // This calculates the difference of each question's score and adds the difference
            diff += Math.abs(allFriends[i].q1 + newFriend.q1);
            diff += Math.abs(allFriends[i].q2 + newFriend.q2);
            diff += Math.abs(allFriends[i].q3 + newFriend.q3);
            diff += Math.abs(allFriends[i].q4 + newFriend.q4);
            diff += Math.abs(allFriends[i].q5 + newFriend.q5);
            diff += Math.abs(allFriends[i].q6 + newFriend.q6);
            diff += Math.abs(allFriends[i].q7 + newFriend.q7);
            diff += Math.abs(allFriends[i].q8 + newFriend.q8);
            diff += Math.abs(allFriends[i].q9 + newFriend.q9);
            diff += Math.abs(allFriends[i].q10 + newFriend.q10);
        
        // This pushes the total difference score into an array
        // The lowest score in the array is the person (allFriends[]) they are best matched with
        scoreArray.push(diff);
        console.log(scoreArray);
    }

    indexofSmallestNumber();

    // This will determine the position in the array of the lowest score.  That position is the closest match from the friend api.
    function indexofSmallestNumber() {
        var min = scoreArray[0];
        var minIndex = 0;
        for (var i = 0; i < scoreArray.length; i++) {
            if (scoreArray[i] < min) {
                minIndex = i;
                min = scoreArray[i];
            }
        }

        $("#match").text(allFriends[minIndex].name);
    }
} 


//all of this works on the index.html (open browser directly)
//does work in LOCAL HOST 3000 - FIXED

//

