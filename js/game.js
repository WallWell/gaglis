// Cansas settings
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Constants
const healths = document.getElementsByClassName('health')


// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
let heroReady = false;
let heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

let hero = {
	speed: 256 // movement in pixels per second
};

// Monster image
let monsterReady = false;
let monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

let monster1Ready = false;
let monster1Image = new Image();
monster1Image.onload = function () {
	monster1Ready = true;
};
monster1Image.src = "images/monster.png";






// function getRandomLava(min, max) {
// 	let number = Math.round(Math.random() * (max - min) + min)
//
// 	while(number < canvas.width/2 - 60 && number < canvas.height/2 - 60){
// 		number = Math.round(Math.random() * (max - min) + min)
// 	}
//
// 		return number
//
//
// }








// Game objects
let monster = {};
let monster1 = {};


// Handle keyboard controls
let keysDown = {};



let heroSpeed = function heroSpeedChecker() {
	let currSpeed = Number(document.getElementById('speedPicker').value)
	document.getElementById('speed').innerHTML = currSpeed
	return currSpeed
}

function hero_x_pp() {
	if (hero.x <= monster.x) {
		monster.x -= heroSpeed();
		// monster1.x -= heroSpeed();
	}
}

function hero_x_mm() {
	if (hero.x >= monster.x) {
		monster.x += heroSpeed();
		// monster1.x += heroSpeed();
	}
}

function hero_y_pp() {
	if (hero.y <= monster.y) {
		monster.y -= heroSpeed();
		// monster1.y -= heroSpeed();
	}
}

function hero_y_mm() {
	if (hero.y >= monster.y) {
		monster.y += heroSpeed();
		// monster1.y += heroSpeed();
	}
}

setInterval(hero_y_pp, 10)
setInterval(hero_y_mm, 10)
setInterval(hero_x_pp, 10)
setInterval(hero_x_mm, 10)

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

hero.x = canvas.width / 2;
hero.y = canvas.height / 2;

let houses = [{
	x: 390,
	y: -10
},{
	x: -10,
	y: 260
},{
	x: 490,
	y: 390
}
]

function getRandomLava(min, max) {
	let numberStatus = 0

	while(numberStatus != 1) {
		var number = Math.round(Math.random() * (max - min) + min)

		if(number < (hero.y - 60) || number > (hero.y + 60)) {
			if(number < (hero.x - 60) || number > (hero.x + 60)) {
				numberStatus = 1
			}
		}
	}

	return number
}

let lavaReady = false
let lavaImage = new Image()
lavaImage.onload = function () {
	lavaReady = true
};

lavaImage.src = "images/lava.png"
lavaCoords = [getRandomLava(60, canvas.width - 60), getRandomLava(60, canvas.height - 60)]

// Reset the game when the player catches a monster
let reset = function () {
	function getRandomHouse(min, max) {
		return Math.round(Math.random() * (max - min) + min)
	}

	let house = getRandomHouse(0,2)
	let house1 = getRandomHouse(0,2)

	monster.x = houses[house].x
	monster.y = houses[house].y

	monster1.x = houses[house1].x
	monster1.y = houses[house1].y
}

let playerDead = function () {
	hero.x = canvas.width / 2
	hero.y = canvas.height / 2

	reset()
}

let hearts = 4
let score = 0

let update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		if(hero.y > 20) hero.y -= hero.speed * modifier
	}
	if (40 in keysDown) { // Player holding down
		if(hero.y < 415) hero.y += hero.speed * modifier
	}
	if (37 in keysDown) { // Player holding left
		if(hero.x > 20) hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		if(hero.x < 460) hero.x += hero.speed * modifier;
	}

	// Are they touching?
	if(
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
		||
		hero.x <= (lavaCoords[0] + 32)
		&& lavaCoords[0] <= (hero.x + 32)
		&& hero.y <= (lavaCoords[1] + 32)
		&& lavaCoords[1] <= (hero.y + 32)
	) {
		healths[hearts].innerHTML = '';
		playerDead()
		console.log(hearts)
		hearts--
	}

	if(
		hero.x <= (monster1.x + 32)
		&& monster1.x <= (hero.x + 32)
		&& hero.y <= (monster1.y + 32)
		&& monster1.y <= (hero.y + 32)
		||
		hero.x <= (lavaCoords[0] + 32)
		&& lavaCoords[0] <= (hero.x + 32)
		&& hero.y <= (lavaCoords[1] + 32)
		&& lavaCoords[1] <= (hero.y + 32)
	) {
		healths[hearts].innerHTML = '';
		playerDead()
		console.log(hearts)
		hearts--
	}

	if(
		lavaCoords[0] <= (monster.x + 32)
		&& monster1.x <= (lavaCoords[0] + 32)
		&& lavaCoords[1] <= (monster1.y + 32)
		&& monster1.y <= (lavaCoords[1] + 32)
	) {
		reset()
		score++

		lavaCoords = [getRandomLava(60, canvas.width - 60), getRandomLava(60, canvas.height - 60)]
	}

	if(
		lavaCoords[0] <= (monster1.x + 32)
		&& monster1.x <= (lavaCoords[0] + 32)
		&& lavaCoords[1] <= (monster1.y + 32)
		&& monster1.y <= (lavaCoords[1] + 32)
	) {
		reset()
		score++

		lavaCoords = [getRandomLava(60, canvas.width - 60), getRandomLava(60, canvas.height - 60)]
	}
};

// Draw everything
let render = function () {
	if(bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if(heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if(monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	if(monster1Ready) {
		ctx.drawImage(monster1Image, monster1.x, monster1.y);
	}

	if(lavaReady) {
		ctx.drawImage(lavaImage, lavaCoords[0], lavaCoords[1])
	}

	// Score

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins dead: " + score, 32, 32);
};

// The main game loop
let main = function () {
	let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
let then = Date.now();
reset();
main();
