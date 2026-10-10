var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;
let score = 0;

function startGame() {
    if (!started) {
        level--; // fixes level display on game start //
        toggleTurn(false);
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $("#start-btn").hide();
    }
}

$(document).keydown(function(e) {
    // Enter/Space on a focused pad or the Start button is handled by its click
    if ($(e.target).is("button") || e.ctrlKey || e.altKey || e.metaKey) {
        return;
    }
    startGame();
});

$("#start-btn").click(startGame);

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
    toggleTurn(false);
});



function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
        score = score + 1;
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text(`Your Score : ${score} (Press Restart or Any Key)`)
        score = 0;
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    toggleTurn()
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $('#turn-indicator').hide();
    $("#start-btn").text("Restart").show();
}

function toggleTurn(player = true) {
    let text = "Memorize the pattern";
    if (player) {
        text = "Your turn";
    }
    $("#turn-indicator").text(text);
}