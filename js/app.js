// what type of constructor pattern (OOSJ) are you using for Enemy,Player functions?
// IDEAS FOR increased learning on this project:
    //introduction of static models that suffer when you lose the game


// Enemies our player must avoid
var Enemy = function(x,y) {
    var enemyPos = [50,140,230]

    this.y = y;
    this.x = x;

    this.speed = Math.random() * 100;

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// Not magic - the updateEntities fxn in engine.js is looping end
// lessly through your update functions
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.

// Enemy.UPDATE: IF enemy's x co-ord is w/in bounds of canvas,
// persist in continuous updating of this.x as = XpointSpeed modifier...
// ELSE re-set this.x at beginning of board
Enemy.prototype.update = function(dt) {
    if (this.x < 404) {
        this.x = this.x + (this.speed*dt);
    }
        else {
        this.x = 1;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {  //game board is 505x606(x,y) px
    this.x = x;  //player positions are not explicitly defined inside class function, but at instantiation
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//Player.UPDATE: unnecessary for the functioning of the game, as movement
Player.prototype.update = function(dt) {

};

Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x = this.x - 101;
        if (this.x<=0){
            this.x=1;
        };
    };

    if (key === 'right') {
        this.x = this.x + 101;
        if (this.x>=405){
            this.x=405;
        };
    };

    if (key === 'up') {
        this.y = this.y - 83; //where 83 represents 5 equal moves vertically across 600px of game board
        if (this.y<0){
            this.y=404;
            this.x=101;
        };
    };

    if (key === 'down') {
        this.y = this.y + 83;
        console.log(this.y);//ditto
        if (this.y>404) {
            this.y = 404;
        };
    };
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies

var allEnemies = [new Enemy(1,50), new Enemy(1,140), new Enemy(1,230)];

// Place the player object in a variable called player

var player = new Player(101,404);


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