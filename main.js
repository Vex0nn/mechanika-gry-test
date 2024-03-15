let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let wall = document.getElementById('wall');
let playingArea = document.getElementById('playingArea');
let positionX = 0;
let positionY = 0;
let movingDirection = {up: false, down: false, right: false, left: false}

window.addEventListener('keydown', (event) => {
    switch(event.key) {
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
})

window.addEventListener('keyup', (event) => {
    switch(event.key) {
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
})

function movePlayer() {
    const stepX = 0.15;
    const stepY = 0.3;
    let playerPos = player.getBoundingClientRect();
    let wallPos = wall.getBoundingClientRect();

    if(movingDirection.up) {
        positionY -= stepY;
    }
    if(movingDirection.down) {
        positionY += stepY;
    }
    if(movingDirection.right) {
        positionX += stepX;
    }
    if(movingDirection.left) {
        positionX -= stepX;
    }
    player.style.transform = `translate(${positionX}svw, ${positionY}svh)`;
    
    if(checkCollision()) {
        resetGame();
        return;
    }
    if(checkCollision2()) {
        resetGame();
        return;
    }
    if(checkCollision3()) {
        bounce();
    }

    requestAnimationFrame(movePlayer);
}

function checkCollision() {
    let playerPos = player.getBoundingClientRect();
    let obstaclePos = obstacle.getBoundingClientRect();

    return !(playerPos.right < obstaclePos.left || 
             playerPos.left > obstaclePos.right || 
             playerPos.bottom < obstaclePos.top || 
             playerPos.top > obstaclePos.bottom
            ); 
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
    player.style.transform = `translate(${positionX}vw, ${positionY}vh)`;
    setTimeout(() => {
        movePlayer();
    }, 100);
}

movePlayer();

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        alert('The mobile version of the game is in progress, please use a desktop!');
        return navigator.userAgent.match(toMatchItem);
    });
}

function bounce() {
    const stepX = 0.15;
    const stepY = 0.3;
    let playerPos = player.getBoundingClientRect();
    let wallPos = wall.getBoundingClientRect();
    if (playerPos.x + playerPos.width > wallPos.x && playerPos.x + playerPos.width < wallPos.x + 2) {
        positionX -= stepX;
    } 
    if (wallPos.x + wallPos.width > playerPos.x && wallPos.x + wallPos.width < playerPos.x + 2) {
        positionX += stepX;
    }
    if (playerPos.y + playerPos.height > wallPos.y && playerPos.y + playerPos.height < wallPos.y + 2) {
        positionY -= stepY;
    }
    if (wallPos.y + wallPos.height > playerPos.y && wallPos.y + wallPos.height < playerPos.y + 2) {
        positionY += stepY;
    }
}
