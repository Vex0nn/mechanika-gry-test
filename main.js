let player = document.getElementById('player');
let obstacles = document.querySelectorAll('.obstacle');
let wall = document.getElementById('wall');
let playingArea = document.getElementById('playingArea');
let startingMenu = document.getElementById('startingMenu');
let enemy = document.getElementById('enemy');
let playerPos = player.getBoundingClientRect();
let wallPos = wall.getBoundingClientRect();
let obstaclePos = obstacles[0].getBoundingClientRect();
let playingAreaPos = playingArea.getBoundingClientRect();
let deathCount = 0;
let deaths = document.getElementById('deaths');
let spawnpointX = 0;
let spawnpointY = 0;
let positionX = 0;
let positionY = 0;
let movingDirection = { up: false, down: false, right: false, left: false };

function startGame() {
    player.style.display = "block";
    for (let obstacle of obstacles) {
        obstacle.style.display = "block";
    }
    wall.style.display = "block";
    playingArea.style.display = "flex";
    startingMenu.style.display = "none";
}

function addDeath() {
    if (player.style.display == "block") {
        deathCount++;
        deaths.textContent = `Deaths: ${deathCount}`;
    }
}

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
        case 'W':
            movingDirection.up = true;
            break;
        case 's':
        case 'S':
            movingDirection.down = true;
            break;
        case 'a':
        case 'A':
            movingDirection.left = true;
            break;
        case 'd':
        case 'D':
            movingDirection.right = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
        case 'W':
            movingDirection.up = false;
            break;
        case 's':
        case 'S':
            movingDirection.down = false;
            break;
        case 'a':
        case 'A':
            movingDirection.left = false;
            break;
        case 'd':
        case 'D':
            movingDirection.right = false;
            break;
    }
});

function movePlayer() {
    const stepX = 0.07;
    const stepY = 0.15;
    if (movingDirection.up) {
        positionY -= stepY;
    }
    if (movingDirection.down) {
        positionY += stepY;
    }
    if (movingDirection.right) {
        positionX += stepX;
    }
    if (movingDirection.left) {
        positionX -= stepX;
    }
    player.style.transform = `translate(${positionX}svw, ${positionY}svh)`;

    if (checkCollision()) {
        resetGame();
        addDeath();
        return;
    }
    if (checkCollision2()) {
        bounceIn();
    }
    if (checkCollision3()) {
        bounce();
    }

    requestAnimationFrame(movePlayer);
}

function checkCollision() {
    let playerPos = player.getBoundingClientRect();
    for (let obstacle of obstacles) {
        let obstaclePos = obstacle.getBoundingClientRect();
        if (!(playerPos.right < obstaclePos.left ||
            playerPos.left > obstaclePos.right ||
            playerPos.bottom < obstaclePos.top ||
            playerPos.top > obstaclePos.bottom)) {
            return true;
        }
    }
    return false;
}

function checkCollision2() {
    let playerPos = player.getBoundingClientRect();
    let playingAreaPos = playingArea.getBoundingClientRect();
    return (playerPos.left < playingAreaPos.left ||
        playerPos.right > playingAreaPos.right ||
        playerPos.top < playingAreaPos.top ||
        playerPos.bottom > playingAreaPos.bottom
    );
}

function checkCollision3() {
    let playerPos = player.getBoundingClientRect();
    let wallPos = wall.getBoundingClientRect();
    return !(playerPos.x + playerPos.width < wallPos.x ||
        wallPos.x + wallPos.width < playerPos.x ||
        playerPos.y + playerPos.height < wallPos.y ||
        wallPos.y + wallPos.height < playerPos.y
    );
}

function resetGame() {
    positionX = 0;
    positionY = 0;
    player.style.transform = `translate(${positionX}vw, ${positionY}vw)`;
    setTimeout(() => {
        movePlayer();
    }, 100);
}

function bounce() {
    const stepX = 0.15;
    const stepY = 0.3;
    let playerPos = player.getBoundingClientRect();
    let wallPos = wall.getBoundingClientRect();
    if (playerPos.x + playerPos.width > wallPos.x && playerPos.x + playerPos.width < wallPos.x + 5) {
        positionX -= stepX;
    }
    if (wallPos.x + wallPos.width > playerPos.x && wallPos.x + wallPos.width < playerPos.x + 5) {
        positionX += stepX;
    }
    if (playerPos.y + playerPos.height > wallPos.y && playerPos.y + playerPos.height < wallPos.y + 5) {
        positionY -= stepY;
    }
    if (wallPos.y + wallPos.height > playerPos.y && wallPos.y + wallPos.height < playerPos.y + 5) {
        positionY += stepY;
    }
}

function bounceIn() {
    const stepX = 0.15;
    const stepY = 0.3;
    let playerPos = player.getBoundingClientRect();
    let playingAreaPos = playingArea.getBoundingClientRect();
    if (playerPos.right > playingAreaPos.right) {
        positionX -= stepX;
    }
    if (playerPos.left < playingAreaPos.left) {
        positionX += stepX;
    }
    if (playerPos.top < playingAreaPos.top) {
        positionY += stepY;
    }
    if (playerPos.bottom > playingAreaPos.bottom) {
        positionY -= stepY;
    }
}

movePlayer();