'use strict';
/*jslint browser: true*/
/*jslint plusplus: true */
/*global APP, console, ctx, Resources */

// counter var
var i;

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Enemy Constructor
var Enemy = function (row) {
    this.x = this.randomStart();
    this.y = this.randomRow();
    this.speed = this.randomSpeed();
    this.sprite = 'images/enemy-bug.png';
  };

// put enemy in random starting x cord
Enemy.prototype.randomStart = function () {
  var tmp = (Math.random() * (APP.ENEMY_MAX_X - APP.ENEMY_START_X) - 100);
  console.log(tmp);
  return tmp;
};

// put enemy in a random row 
Enemy.prototype.randomRow = function () {
  // enemies need to start in a random row between 1 and 4
  return APP.ROWS[Math.ceil(Math.random() * 4)];
};

// random speed as defined in the global APP.ENEMY_SPEED
Enemy.prototype.randomSpeed = function () {
  return APP.ENEMY_SPEED[Math.floor(Math.random() * APP.ENEMY_SPEED.length)];
};

Enemy.prototype.reset = function () {
  this.x = APP.ENEMY_START_X;
  this.y = this.randomRow();
  this.speed = this.randomSpeed();
};

// move enemy
Enemy.prototype.update = function (dt) {
  // move enemy at is assigned speed
  this.x = this.x + (this.speed * dt);
  
  // check to see if enemy is off edge of canvas
  if (this.x > APP.ENEMY_MAX_X) {
    this.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player constructor
var Player = function () {
  this.x = APP.PLAYER_START_X;
  this.y = APP.PLAYER_START_Y;
  this.points = 0;
  this.sprite = 'images/char-boy.png';
};

// r1,r2 are a bound box, function returns true
// if bound boxes are touching. 
// algoritm from Udacity HTML5 Game course
Player.prototype.isIntersecting = function (r1, r2) {
  if (r1.right > r2.left && r1.left < r2.right &&
      r1.bottom > r2.top && r1.top < r2.bottom) {
    return true;
  }
  return false;
};

// detect if player is touching enemy using bound boxes.
// playerBounds could be changed to calulate only when
// the player moves and stored as an instance variable
// if optmization is necessary.
Player.prototype.isTouchingEnemy = function () {
  // using i from global scope
  var playerBounds, enemyBounds;
  playerBounds = {
    'left' : this.x + APP.PLAYER_LEFT_OFFSET,
    'top' : this.y + APP.PLAYER_TOP_OFFSET,
    'right' : this.x + (101 - APP.PLAYER_RIGHT_OFFSET),
    'bottom' : this.y  + APP.PLAYER_TOP_OFFSET + 10
  };
  
  // a for loop is used here because if the array.forEach(x,y,z)
  // is used, the this used later is no longer bound to player.
  for (i = 0; i < allEnemies.length; i++) {
    enemyBounds = {
      'left' : allEnemies[i].x + APP.ENEMY_LEFT_OFFSET,
      'top' : allEnemies[i].y + APP.ENEMY_TOP_OFFSET,
      'right' : allEnemies[i].x + (101 - APP.ENEMY_RIGHT_OFFSET),
      'bottom' : allEnemies[i].y  + APP.ENEMY_TOP_OFFSET + 10
    };
    
    if (this.isIntersecting(enemyBounds, playerBounds)) {
      return true;
    }
  }
  return false;
};

Player.prototype.reset = function () {
  this.x = APP.PLAYER_START_X;
  this.y = APP.PLAYER_START_Y;
};

Player.prototype.keepOnCanvas = function () {
  if (this.x < APP.PLAYER_MIN_X) {
    this.x = APP.PLAYER_MIN_X;
  }
  if (this.x > APP.PLAYER_MAX_X) {
    this.x = APP.PLAYER_MAX_X;
  }
  if (this.y > APP.PLAYER_START_Y) {
    this.y = APP.PLAYER_START_Y;
  }
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function () {
  // player has reached top of canvas and has won
  if (this.y <= APP.ROWS[0]) {
    this.points = this.points + 1;
    this.reset();
  }
  
  // test for player / enemy touching and has lost
  if (this.isTouchingEnemy()) {
    this.points = this.points - 1;
    this.reset();
  }
  
  // keep player on the canvas
  this.keepOnCanvas();
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.font = "20px Veranda";
  ctx.fillText("Score: " + this.points, 15, 28);
};

Player.prototype.handleInput = function (keyCode) {
  if (keyCode === 'up') { this.y = this.y - 83; }
  if (keyCode === 'down') { this.y = this.y + 83; }
  if (keyCode === 'left') { this.x = this.x - 101; }
  if (keyCode === 'right') { this.x = this.x + 101; }
};

// Now instantiate your objects.
// create enemy instances
for (i = 0; i < APP.ENIMIES; i++) {
  allEnemies.push(new Enemy(i));
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

  player.handleInput(allowedKeys[e.keyCode]);
});
