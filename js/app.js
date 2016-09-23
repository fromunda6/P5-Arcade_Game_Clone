  // TO-DO (later, you need to keep moving)

			    // something more interesting occurring at waterline
			    // introduction of a 3rd class-'elementals' which impart beneficial
			    // spells and curses at random to players...

  //Notes to reviewer:

   //Please take your time - while I've not included everything I wanted to in this game as it's been long in coming, answers to the questions below would go a long way towards improving my understanding of this project.

  	//doesn't inclusion of enemy coordinates in the constructor function violate principles of OOJS, in that only properties shared amongst all instances of a class be coded in the constructor?  In going through the forums
  	//I have seen this done in many students' code, and wasn't sure if it was the correct way to approach.

  	//Is my implementation an example of prototypal class creation?  Psuedoclassical?  I am a bit unclear on the distinctions between these.

  	//Upon letting my game run for several minutes, I've noticed that the smoothness of enemy animation has decreased while the computational cost of the game increases (noticeable improvement in other programs when
  	//closing the game)  Clearly the game is not performance-optimized but could you point out the biggest offenders for me?

  	//Is it possible to use the 'this' parameter when attempting to refer to instances of two entities (Player,Enemy) within the same function (checkCollisions)?  Or should such a function be defined as a method of just one of those entities,
  	//and "one-sided" collision detection be employed?

//Axis-Aligned Bounding Box method as taken from MDN 2d collision detection - called by Global Update() fxn
//Essentially, the block inside the loop says "if the enemy's front and back ends occupy the same spa"

var p_start_x = 101;
var p_start_y = 404;

var e1_start_y = 50;
var e2_start_y = 140;
var e3_start_y = 230;

var one_step_x = 101;
var one_step_y = 90;

var left_wall_x = 1;
var right_wall_x = 405;
var floor_y = 404;
var ceiling_y = 0;

//Is it ok/problematic to give two variables the same constant value.  I can see if both of those variables referred to object-instance positions, but in this case with one an increment, one a position?

var checkCollisions = function(){
	for (i = 0; i < allEnemies.length; i ++) {
		if (allEnemies[i].x < player.x + player.WIDTH &&
			allEnemies[i].x + allEnemies[i].WIDTH > player.x &&
			allEnemies[i].y < player.y + player.HEIGHT &&
			allEnemies[i].y + allEnemies[i].HEIGHT > player.y) {
				player.x = p_start_x;
				player.y = p_start_y;
				alert("Ouch, you hit a bug");
		};
	};
};

// Enemies our player must avoid
var Enemy = function(x,y) {

    this.y = y;
    this.x = x;

    this.speed = Math.floor(Math.random() * 200);  //rounds down to the nearest integer the result of math.random*200

    this.sprite = 'images/enemy-bug.png';

    //these sizes are estimated from the image rectangle dimensions of 101x171, as I was unable to find a method for determining the effective size of my sprites

    this.WIDTH = 90;
    this.HEIGHT = 70;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

// Enemy.UPDATE: IF enemy's x co-ord is w/in bounds of canvas,
// persist in continuous updating of this.x as = XpointSpeed modifier...
// ELSE reset position of * *this* * to beginning of game board

Enemy.prototype.update = function(dt, index) {
    if (this.x < 404) {
        this.x = this.x + (this.speed*dt);
    }
    else {
        this.x=left_wall_x;
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

    //these sizes are estimated from the image rectangle dimensions of 101x171, as I was unable to find a method for determining the effective size of my sprites

    this.WIDTH = 50;
    this.HEIGHT = 80;
};

//Player.UPDATE: unnecessary for the functioning of the game, as movement is controlled by player....handleInput(), although were we to tackle smooth animation, this would be a place to start
Player.prototype.update = function(dt) {

};

Player.prototype.render = function(x,y) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//below code drew upon materials found in the forums - increments were settled upon via guess and check
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x = this.x - one_step_x;
        if (this.x<=left_wall_x){
            this.x=1;
        };
    };

    if (key === 'right') {
        this.x = this.x + one_step_x;
        if (this.x>=right_wall_x){
            this.x=404;
        };
    };

    if (key === 'up') {
        this.y = this.y - one_step_y; //where 83 represents 5 equal moves vertically across 600px of game board
        if (this.y<ceiling_y){
            this.y=p_start_y;
            this.x=p_start_x;
            alert("You've reached the relative safety of the ocean - hope you can swim!")
        };
    };

    if (key === 'down') {
        this.y = this.y + one_step_y;
        if (this.y>floor_y) {
            this.y = 404;
        };
    };
};

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies

var allEnemies = [new Enemy(1,e1_start_y), new Enemy(1,e2_start_y), new Enemy(1,e3_start_y)];

// Place the player object in a variable called player

var player = new Player(p_start_x,p_start_y);


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


