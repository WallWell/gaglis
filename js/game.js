// Canvas settings
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
heroImage.width = 30
heroImage.height = 30

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
let monster = {};
//Monster 2 Image

let monster2Ready = false;
let monster2Image = new Image();
monster2Image.onload = function () {
	monster2Ready = true;
};
monster2Image.src = "images/monster2.png";
monster2 = {}
// Game objects



// Handle keyboard controls
let keysDown = {};



let heroSpeed = function heroSpeedChecker() {
	let currSpeed = Number(document.getElementById('speedPicker').value)
	document.getElementById('speed').innerHTML = currSpeed
	return currSpeed
}

function hero_x_pp() {
	if (hero.x <= monster.x) {
		monster.x = (monster.x - heroSpeed()) - 0.15
	}

	if (hero.x <= monster2.x) {
		monster2.x -= heroSpeed();
	}
}

function hero_x_mm() {
	if (hero.x >= monster.x) {
		monster.x = (monster.x + heroSpeed()) - 0.15
	}

	if (hero.x >= monster2.x) {
		monster2.x += heroSpeed();
	}
}

function hero_y_pp() {
	if (hero.y <= monster.y) {
		monster.y = (monster.y - heroSpeed()) - 0.15
	}

	if (hero.y <= monster2.y) {
		monster2.y -= heroSpeed();
	}
}

function hero_y_mm() {
	if (hero.y >= monster.y) {
		monster.y = (monster.y + heroSpeed()) - 0.15
	}

	if (hero.y >= monster2.y) {
		monster2.y += heroSpeed();
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

		if((60 < number < (canvas.width + 60)) && (60 < number < (canvas.height + 60))) {
			if(number < (hero.y - 60) || number > (hero.y + 60)) {
				if(number < (hero.x - 60) || number > (hero.x + 60)) {
					numberStatus = 1
				}
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

	monster.x = houses[house].x
	monster.y = houses[house].y
}

let reset2 = function () {
	function getRandomHouse(min, max) {
		return Math.round(Math.random() * (max - min) + min)
	}

	let house2 = getRandomHouse(0,2)

	monster2.x = houses[house2].x
	monster2.y = houses[house2].y
}

let playerDead = function () {
	hero.x = canvas.width / 2
	hero.y = canvas.height / 2

	setTimeout(reset, 1000)
}

let playerDeadScreen = function () {
	hero.x = canvas.width / 2
	hero.y = canvas.height / 2

	document.getElementById('deadScreen').style.display = 'block'
}

let hearts = 4
var score = 0

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

		if(hearts === 0) {
			playerDeadScreen()
		}

		hearts--
	}



	if(
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
		||
		hero.x <= (lavaCoords[0] + 32)
		&& lavaCoords[0] <= (hero.x + 32)
		&& hero.y <= (lavaCoords[1] + 32)
		&& lavaCoords[1] <= (hero.y + 32)
	) {
		healths[hearts].innerHTML = '';
		playerDead()

		if(hearts === 0) {
			playerDeadScreen()
		}

		hearts--
	}



	if(
		lavaCoords[0] <= (monster.x + 32)
		&& monster.x <= (lavaCoords[0] + 32)
		&& lavaCoords[1] <= (monster.y + 32)
		&& monster.y <= (lavaCoords[1] + 32)
	) {
		setTimeout(reset, 100000)
		setTimeout(reset2, 100000)
		score++

		lavaCoords = [getRandomLava(60, canvas.width - 60), getRandomLava(60, canvas.height - 60)]
	}





	if(
		lavaCoords[0] <= (monster2.x + 32)
		&& monster2.x <= (lavaCoords[0] + 32)
		&& lavaCoords[1] <= (monster2.y + 32)
		&& monster2.y <= (lavaCoords[1] + 32)
	) {
		setTimeout(reset2, 100000)
		score++

		lavaCoords = [getRandomLava(60, canvas.width - 60), getRandomLava(60, canvas.height - 60)]
	}

	document.getElementById('score').value = score
	document.getElementById('score1').value = score
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

	if(monster2Ready) {
		ctx.drawImage(monster2Image, monster2.x, monster2.y);
	}

	if(lavaReady) {
		ctx.drawImage(lavaImage, lavaCoords[0], lavaCoords[1])
	}
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
setTimeout(reset, 1000)
setTimeout(reset2, 1000)
main();



let registerBtn = document.getElementById('record')
let registerCont = document.getElementById('registerCont')

registerBtn.addEventListener('click', () => {
	if(registerCont.classList.contains('hidden')) {
		registerCont.classList.remove('hidden')
	} else {
		registerCont.classList.add('hidden')
	}
})