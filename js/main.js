// DOM Refrences
let movementDisplay = null;
let game = null;
let reset = null;
let ctx = null;
let runGame = null;

const Crawler = function(x, y, color, w, h) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = w;
    this.height = h;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const HERO = new Crawler(10, 10, "hotpink", 20, 20);
const SHREK = new Crawler(100, 100, "#BADA55", 40, 40,);

document.addEventListener("DOMContentLoaded", function() {

    movementDisplay = document.getElementById("movement");
    game = document.getElementById("game");
    reset = document.getElementById("reset");

    setupCanvas();

    runGame = setInterval(gameLoop, 60);

    game.addEventListener("click", function(e) {
        HERO.x = e.offsetX;
        HERO.y = e.offsetY;
    });

    reset.addEventListener("click", function() {
        runGame = setInterval(gameLoop, 60);
    })

    document.addEventListener("keydown", movementHandler);
});

const setupCanvas = function() {
    ctx = game.getContext("2d");
    // Set canvas width and height
    game.setAttribute("width", getComputedStyle(game)["width"]);
    game.setAttribute("height", getComputedStyle(game)["height"]);
    
}

// Make a rectangle!
const createRectangle = function(x, y, size, color) {
    // Fill color
    ctx.fillStyle = color;
    // Draw the thing at x, y coordinates
    ctx.fillRect(x, y, size, size); // Everything is pixel based
}

const movementHandler = function(e) {
    // If keycode of e === 87, then decrease y coordinate
    // if keycode of e === 68, then increase x coordinate
    // if keycode of e === 83, then increase y coordinate
    // If keycode of e === 65, then decrease x coordinate
    switch(e.keyCode) {
        case (87):
            if (HERO.y > 0) {
                HERO.y -= 10;
            }
            break;
        case (68):
            if (HERO.x + HERO.width < game.width) {
                HERO.x += 10;
            }
            break;
        case (83):
            if (HERO.y + HERO.height < game.height) {
                HERO.y += 10;
            }
            break;
        case (65):
            if (HERO.x > 0) {
                HERO.x -= 10;
            }
    }
}

const detectHit = function() {
    // If x of Hero is less than x of ogre + its width.
    // If x of Hero + its width is more than x of ogre.
    // If y of Hero is less than y of ogre + it's height.
    // if y of Hero + its height is more than y of ogre.
    if (HERO.x < SHREK.x + SHREK.width &&
        HERO.x + HERO.width > SHREK.width && 
        HERO.y < SHREK.y + SHREK.height &&
        HERO.y + HERO.height > SHREK.y) {
            SHREK.alive = false;
            // End game function
            document.getElementById("status").textContent = "You commited murder!";
            clearInterval(runGame);
        }
}

const gameLoop = function() {
    // Clear the canvas
    ctx.clearRect(0, 0, game.width, game.height);
    // Display (X, Y) coordinates of our hero in movementDisplay
    movementDisplay.textContent = `X: ${HERO.x},Y: ${HERO.y}`;
    // Render our hero
    HERO.render();
    detectHit();
    // Render Shrek only if he's alive
    if (SHREK.alive) {
        SHREK.render();
        // Check for collision

    }

}