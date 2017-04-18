// Enemies our player must avoid
var Enemy = function( y, speed ) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = -150;
    this.y =  y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    console.log("Update Enemy Bug Location")
    this.x += this.speed * dt;

    if (this.x >= 700) {
        this.resetEnemyBug();
    }
};

// Resets the enemy location.
Enemy.prototype.resetEnemyBug = function() {
    console.log("Resetting Enemy Bug Location");
    this.x = -150;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create 3 enemy players.
var enemy_1 = new Enemy(65, Math.floor(Math.random() * 450 + 1));
var enemy_2 = new Enemy(150, Math.floor(Math.random() * 450 + 1));
var enemy_3 = new Enemy(225, Math.floor(Math.random() * 450 + 1));

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';

    this.x = x;
    this.y = y;

    this.speed = speed;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player's update function.
// Checks the player not to go out of the canvas
// Also call the collision check function
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    }
    else if (this.x > 700) {
        this.x = 700;
    }
    else if (this.y < 0) {
        this.y = 405;
    }
    else if (this.y > 405) {
        this.y = 405;
    }
    this.collideEnemyPlayerCheck();
};

// Resets the player location.
// This function will be invoked when there is a collision with the enemy bug.
Player.prototype.updatePlayer = function() {
    this.x = 300;
    this.y = 400;
};

// handleInput function moves the player depending on the keys pressed by the player.
Player.prototype.handleInput = function(keycode) {
    switch(keycode) {
        case "left":
            this.x -= 100;
            break;
        case "right":
            this.x += 100;
            break;
        case "up":
            this.y -= 90;
            break;
        case "down":
            this.y += 90;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(enemy_1, enemy_2, enemy_3);
var player = new Player(300, 400, Math.random() * (500 - 100) + 100);

// Handles collision with the Player
// Checks if a collision happens between player and the enemies.
Player.prototype.collideEnemyPlayerCheck = function() {
    console.log("Checks whether player collides with any of the enemy bugs!!")
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 &&
            this.x + 50 > allEnemies[i].x &&
            this.y < allEnemies[i].y + 30 &&
            this.y + 30 > allEnemies[i].y)
        {
            console.log("Player COLLIDED bug!! Resetting the player position.")
            this.updatePlayer();
            allEnemies[i].resetEnemyBug();
            break;
        }
    }
};

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
