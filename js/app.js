//global variables
var canvasWidth = 505;
var canvasHeight = 606;

var blockWidth = canvasWidth / 5;
var blockHeight = 83;

var playerStartLocationX = 202;
var playerStartLocationY = blockHeight * 4.5;
var bugWidthHalf = 101/2
var scorePlayer = null;

// a function to display the score
function updateScore() {
    return scorePlayer;
    // console.log(currentScore);
    // // return currentScore;
};

//Game Over function
function gameOver() {
    if (scorePlayer == 0)
        scorePlayer = 3, alert("Game Over. Try again!");
}

// This method creates a random location value that is needed 
// for the y value of the enemy and gem
function randomLoc() {
    var loc = Math.floor((Math.random() * 4)+1);
    var y = (blockHeight * (loc -2)) + (blockHeight / 2);
    switch (loc) {
        case 2: 
            return y;
            break;
        case 3: 
            return y;
            break;
        case 4: 
            return y;
            break;
        case 5: 
            return y;
            break;
    }
}
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here
    //starting location and speed
    this.x = 0;
    this.y = randomLoc();
    this.speed = Math.floor((Math.random() * 4)+2);
    // The image for our enemies
    this.sprite = 'images/enemy-bug.png';
}
// A reset function for the enemies once they reach the end of the canvas
Enemy.prototype.reset = function() {
    this.x = 0;
    this.y = randomLoc();
    var loc = Math.floor((Math.random() * 4)+2);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt * 100;
    if (this.x > canvasWidth)
        this.reset();
    //collision detection
    for (i=0; i<allEnemies.length; i++){
        if (allEnemies[i].y === player.y && allEnemies[i].x > (player.x - bugWidthHalf) && allEnemies[i].x < (player.x + bugWidthHalf))
            scorePlayer -= 1, player.reset(), alert("Ooops a bug gotcha! Your new score is " + scorePlayer), gameOver(), updateScore();
    }
}

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player class
var Player = function() {
    // initial location
    this.x = playerStartLocationX;
    this.y = playerStartLocationY;

    // selects random player image
    switch(Math.floor(Math.random() * 5)) {
        case 0 :
            this.sprite = 'images/char-boy.png';
        break;

        case 1 :
            this.sprite = 'images/char-cat-girl.png';
        break;

        case 2 :
            this.sprite = 'images/char-horn-girl.png';
        break;

        case 3 :
            this.sprite = 'images/char-pink-girl.png';
        break;

        case 4 :
            this.sprite = 'images/char-princess-girl.png';
        break;

        default:
            this.sprite = 'images/char-boy.png';
    }
}

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    return;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// reset function for the player
Player.prototype.reset = function() {
    this.x = playerStartLocationX;
    this.y = playerStartLocationY;
}

// handleInput function for key functionality
Player.prototype.handleInput = function(key) {
    switch(key) {
        case "left":
            if (this.x > 0) {
                this.x -= blockWidth;
            };
            break;

        case "up":
            if (this.y < 82)
                scorePlayer += 2, alert("Congratulations, you made it to the water! Your new score is " + scorePlayer), updateScore(), this.reset();
            else 
                this.y -= blockHeight;
            break;

        case "right":
            if (this.x < (canvasWidth - blockWidth))
                this.x += blockWidth;
            break;

        case "down":
            if (this.y < blockHeight * 4)
                this.y += blockHeight;
            break;
    }
};

// GEM CLASS
var Gem = function() {
    // Variables applied to each of our instances go here
    //starting location and speed
    this.x = 0;
    this.y = randomLoc();
    this.speed = Math.floor((Math.random() * 2)+1);
    // The image/sprite for our gems
    switch(Math.floor(Math.random() * 6)) {
        case 0 :
            this.sprite = 'images/Gem-Blue.png';
        break;

        case 1 :
            this.sprite = 'images/Gem-Green.png';
        break;

        case 2 :
            this.sprite = 'images/Gem-Orange.png';
        break;

        case 3 :
            this.sprite = 'images/Heart.png';
        break;

        case 4 :
            this.sprite = 'images/Key.png';
        break;

        case 5:
            this.sprite = 'images/Star.png';
    }
}
// A reset function for the gems 
Gem.prototype.reset = function() {
    this.x = 0;
    this.y = randomLoc();
    var loc = Math.floor((Math.random() * 2)+1);
};

// Update the gem's position, required method for game
// Parameter: dt, a time delta between ticks
Gem.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt * 90;
    if (this.x > canvasWidth)
        this.reset();
    //collision detection
    for (i=0; i<allGems.length; i++){
        if (allGems[i].y === player.y && allGems[i].x > (player.x - bugWidthHalf) && allGems[i].x < (player.x + bugWidthHalf))
            scorePlayer += 1, updateScore(), this.reset();
    }
}

// Draws the enemy on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Instantiation of  objects.
// all enemy objects are placed array called allEnemies
// the player object is placed in a variable called player

var allEnemies = [];
allEnemies[0] = new Enemy;
allEnemies[1] = new Enemy;
allEnemies[2] = new Enemy;

var player = new Player();

var allGems = [];
allGems[0] = new Gem;
allGems[1] = new Gem;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
