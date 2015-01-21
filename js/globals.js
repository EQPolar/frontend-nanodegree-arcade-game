// global object to hold vars to not pollute the global namespace
var APP = {};

// :=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=
// these can be changed to adjust game difficulty
// :=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=

// amount of enemies
APP.ENIMIES = 6;

// enemy speeds
APP.ENEMY_SPEED = [ 75, 125, 200, 250 ];

// :=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=
// below this line should not be changed, unless bug found ;)
// :=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=:=

// stores the y-value of each row.
APP.ROWS = [ -20, 63, 146, 229, 312, 395];

APP.CANVAS_WIDTH = 505;
APP.CANVAS_HEIGHT = 606;

// player's starting position
APP.PLAYER_START_X = 202;
APP.PLAYER_START_Y = APP.ROWS[5];

// enemy x-cord limits
APP.ENEMY_START_X = -100; // 100 px left of canvas start
APP.ENEMY_MAX_X = APP.CANVAS_WIDTH;

// player x-cord limits
APP.PLAYER_MAX_X = 404;
APP.PLAYER_MIN_X = 0;

// These offsets are needed because the images dimensions of the player and 
// enimies are much bigger than the actual enimes.  So the collision detection
// box must be smaller, these offsets are used to calculate the collision dectection
// boxes.
APP.ENEMY_TOP_OFFSET = 83;
APP.ENEMY_BOTTOM_OFFSET = 120;
APP.ENEMY_LEFT_OFFSET = 6;
APP.ENEMY_RIGHT_OFFSET = 15;
APP.PLAYER_TOP_OFFSET = 75;
APP.PLAYER_BOTTOM_OFFSET = 110;
APP.PLAYER_LEFT_OFFSET = 20;
APP.PLAYER_RIGHT_OFFSET = 40;