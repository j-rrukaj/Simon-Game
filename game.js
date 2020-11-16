/// Colours available in array.
var buttonColours = ["red", "blue", "green", "yellow"];

/// gamePattern, empty array.
var gamePattern = [];

/// userClickedPattern, empty array.
var userClickedPattern = [];

/// set to false so we can change when an event is triggered.
var gameStarted = false;

var level = 0;

/// Waiting to detect a keypress on the page.
$(document).keydown(function() {

/// Once detected we flip the gameStarted to true.
  if (!gameStarted) {

    $("#level-title").text("Level " + level);

/// Call nextSequence
    nextSequence();

/// Keep gameStarted to true so further key presses dont trigger nextSequence.
    gameStarted = true;
  }
});

/// Waiting to detect a button click.
$(".btn").click(function() {

/// We obtain the Id attribute of the button that was clicked and store it in a var called userChosenColour.
  var userChosenColour = $(this).attr("id");

/// Add the colour that was pressed to the array userClickedPattern.
  userClickedPattern.push(userChosenColour);

/// Playsound of the colour that was selected and call animatePress.
  playSound(userChosenColour);

/// Call animatePress and pass input called userChosenColour.
  animatePress(userChosenColour);

/// We take the array length of userClickedPattern and take away (-1) 1 from it. So if the length is 4 it then becomes 3 so 3 will be passed in arrayNumber.
  checkAnswer(userClickedPattern.length-1);

});

/// Function which takes an input which will take the number from the previous code.
function checkAnswer(arrayNumber) {

/// First IF statement checks the colours using the arrayNumber to match the colours gamePattern and userClickedPattern.
    if (gamePattern[arrayNumber] === userClickedPattern[arrayNumber]) {

/// IF the previous statement has passed then check the length of both arrays are matching.
      if (userClickedPattern.length === gamePattern.length){

/// Call the function nextSequence after 1000 milliseconds
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      playSound("wrong");
/// Add a class using JQuery
      $("body").addClass("game-over");

/// Change H1
      $("#level-title").text("Game Over, Press Any Key to Restart");

/// removeClass after 200 miliseconds
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

/// Call startOver
      startOver();
    }
};


/// nextSequence
function nextSequence() {

/// empty userClickedPattern array once nextSequence is called.
  userClickedPattern = [];

// Increment by 1 each time nextSequence is called.
  level++;

  $("#level-title").text("Level " + level);

/// Generate a random number from 0 - 3. Use it to randomly select a colour in the array and store it in randomChosenColour.
  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
/// Push item in array.
  gamePattern.push(randomChosenColour);

/// Add an animatation to the random selected colour using JQuery by finding the id of the button. Fades in and out.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

/// Adds another animatation when user clicks on the button and removes the class very quickly.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

/// Plays a sound when the input to the function specifies which colour/wrong colour was pressed and then plays it.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/// starts the game from the start with the reset level, empty array and original boolean.
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
};
