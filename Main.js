//use afterHit counter on startup
//empty lasers[] after win
//add rules
//create guideArt[]

var canvas;
var ship;
var asteroids = [];
var level = 0;
var lasers = [];
var levelCreated = false;
var gameOver = false;

var afterHit = 100;

var score = 0;

var hpIndex = 3;

var showMe;
var shipArt;
var guideArt;
var bg;
var gameOverArt;

var rickArt = [];
var mortyArt = [];
var bossArt = [];
var hpArt = [];

function preload() {
    showMe = loadSound('media/SHOW ME WHAT YOU GOT.mp3');
    shipArt = loadImage('media/ship.png');
    guideArt = loadImage('media/guide.png');
    gameOverArt = loadImage('media/gameOver.png');
    //bg = loadImage('media/bg.jpg');
    bg = loadImage('media/bg.png');
    for (var i = 0; i < 4; i++) {
        rickArt[i] = loadImage('media/rick' + i + '.png');
    }
    for (var i = 0; i < 2; i++) {
        mortyArt[i] = loadImage('media/morty' + i + '.png');
    }
    for (var i = 0; i < 3; i++) {
        bossArt[i] = loadImage('media/boss' + i + '.png');
    }
    for (var i = 0; i < 3; i++) {
        hpArt[i] = loadImage('media/hp.png');
    }
}

function setup() {
    canvas = createCanvas(800, 500);
    colorMode(HSB);
    imageMode(CENTER);
    ship = new ship;
    fill(255);
    // for (var i = 0; i < level; i++) {
    //     asteroids.push(new Asteroid);
    // }
}

function draw() {
    push();
    imageMode(CORNER);
    background(bg);
    pop();
    //resizeCanvas(windowWidth, windowHeight);
    for (var i = 0; i < hpIndex; i++) {
        image(hpArt[i], 20 + 30 * i, 20, 30, 30);
    }
    text("Score: " + score, 150, 25);
    if (level == 0) { //startup
        textSize(20);
        if (!gameOver) {
            text("\"Snuffles was my slave name!\"", 180, 100);
            image(guideArt, 420, 310, 375, 360);
        } else {
            text("Game Over!", 180, 250);
            text("\"wubalubadubdub...\"", 500, 400);
            image(gameOverArt, 420, 310, 350, 375);
        }

    } else if (level < 0) { //between levels
        text("press DOWN", 180, 100);
        image(guideArt, 420, 310, 375, 360);
        levelCreated = false;
    } else if (level > 0) { //levels
        if (!levelCreated) {
            for (var i = 0; i < level; i++) { //1st creation
                asteroids.push(new Asteroid);
            }
            levelCreated = true;
            afterHit = 100;
        }
        if (asteroids.length == 0) { //check for level win
            level = -(level + 1);
            lasers.splice(0, lasers.length);
        }
        for (var i = 0; i < asteroids.length; i++) {
            if (afterHit == 0 && ship.hits(asteroids[i])) {
                hpIndex -= 1;
                afterHit = 100;
                if (hpIndex == 0) {
                    gameOver = true;
                    level = 0;
                }
            }
            asteroids[i].render();
            asteroids[i].update();
            asteroids[i].edges();
        }

        for (var i = lasers.length - 1; i >= 0; i--) {
            lasers[i].render();
            lasers[i].update();
            if (lasers[i].offscreen()) {
                lasers.splice(i, 1);
            } else {
                for (var j = asteroids.length - 1; j >= 0; j--) {
                    if (lasers[i].hits(asteroids[j])) {
                        if (asteroids[j].r > 15) {
                            var newAsteroids = asteroids[j].breakup();
                            asteroids = asteroids.concat(newAsteroids);
                        } else {
                            score += 1;
                        }
                        asteroids.splice(j, 1);
                        lasers.splice(i, 1);
                        break;
                    }
                }
            }
        }
        ship.render();
        ship.turn();
        ship.update();
        ship.edges();
    }
}

function keyPressed() {
    if (level == 0 && !gameOver) {
        showMe.play();
        score = 0;
        level = 1;
    } else if (level < 0 && keyCode == DOWN_ARROW) {
        level = -level;
    }
    if (key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
    }
    if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        ship.boosting(true);
    } else if (keyCode == DOWN_ARROW) {
        ship.vel.mult(0.5);
    }
}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}
