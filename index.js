const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({ position: { x: 0, y: 0 }, imgSrc: './img/background.png' });

const shop = new Sprite({ position: { x: 685, y: 224 }, imgSrc: './img/shop.png', scale: 2.0, framesMax: 6 });

const player = new Fighter({
    position: { x: 30, y: 0 },
    velocity: { x: 0, y: 10 },
    imgSrc: './img/samurai/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {x: 215, y: 157 }, //The sprites specific offset for when it's time to redraw the frames
    sprites: { 
        idle: { imgSrc: './img/samurai/Idle.png', framesMax: 8 },
        sprint: { imgSrc: './img/samurai/Run.png', framesMax: 8 },
        jump: { imgSrc: './img/samurai/Jump.png', framesMax: 2 },
        fall: { imgSrc: './img/samurai/Fall.png', framesMax: 2 },
        attack1: { imgSrc: './img/samurai/Attack1.png', framesMax: 6 },
        takeHit: { imgSrc: './img/samurai/Take Hit - white silhouette.png', framesMax: 4 },
        death: { imgSrc: './img/samurai/Death.png', framesMax: 6 },
    },
    attackBox: {
        offset: { x: 100, y: 50},
        width: 158,
        height: 50,
    },
});

/*const enemy = new Fighter({
    position: { x: 937, y: 100 },
    velocity: { x: 0, y: 0 },
    imgSrc: './img/fantasyMan/Idle.png',
    framesMax: 10,
    scale: 3.0,
    offset: {x: 215, y: 153 },
    sprites: { 
        idle: { imgSrc: './img/fantasyMan/Idle.png', framesMax: 10 },
        sprint: { imgSrc: './img/fantasyMan/Run.png', framesMax: 8 },
        jump: { imgSrc: './img/fantasyMan/Jump.png', framesMax: 3 },
        fall: { imgSrc: './img/fantasyMan/Fall.png', framesMax: 3 },
        attack1: { imgSrc: './img/fantasyMan/Attack3.png', framesMax: 8 },
        takeHit: { imgSrc: './img/fantasyMan/Take Hit - white silhouette.png', framesMax: 3 },
        death: { imgSrc: './img/fantasyMan/Death.png', framesMax: 7 },
    },
    attackBox: {
        offset: { x: -153, y: 50},
        width: 150,
        height: 50,
    },
});*/ 

const enemy = new Fighter({
    position: { x: 937, y: 100 },
    velocity: { x: 0, y: 0 },
    color: 'blue',
    offset: {
      x: -50,
      y: 0
    },
    imgSrc: './img/ninja/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {x: 215, y: 167},
    sprites: { 
        idle: { imgSrc: './img/ninja/Idle.png', framesMax: 4 },
        sprint: { imgSrc: './img/ninja/Run.png', framesMax: 8 },
        jump: { imgSrc: './img/ninja/Jump.png', framesMax: 2 },
        fall: { imgSrc: './img/ninja/Fall.png', framesMax: 2 },
        attack1: { imgSrc: './img/ninja/Attack1.png', framesMax: 4 },
        takeHit: { imgSrc: './img/ninja/Take Hit - white silhouette.png', framesMax: 3 },
        death: { imgSrc: './img/ninja/Death.png', framesMax: 7 },
    },
    attackBox: {
      offset: {x: -167, y: 50},
      width: 170,
      height: 50
    }
});

const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
}

decreaseTimer();

let counter = 0;
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    c.fillStyle = 'rgba(255,255,255, 0.05)'; //0.12 e opacity så det gör gubbarna lite kontrast
    c.fillRect(0,0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    //when one is cornerned they can get hit
    let flipped = false;
    if (player.position.x + player.width > enemy.position.x + enemy.width) {
       flipped = true;
    } else {
        flipped = false;
    }

    //Player movement
    player.velocity.x = 0;
    let boundryPlayer = flipped ? 935 : 935 - enemy.width;
    if (keys.a.pressed && player.lastKey === 'a' && player.position.x >= 40) {
        player.velocity.x = -5;
        player.switchSprites('sprint');
    } else if (keys.d.pressed && player.lastKey === 'd' && player.position.x < boundryPlayer) { //If enemy is cornered he can still be hit
        player.velocity.x = 5;
        player.switchSprites('sprint');
    } else if (keys.a.pressed && player.lastKey === 'a' && player.position.x < 40 || keys.d.pressed && player.lastKey === 'd' && player.position.x > 934 - enemy.width) {
        player.switchSprites('sprint');
    } else {
        player.switchSprites('idle');
    }

    if (player.velocity.y < 0) {
        player.switchSprites('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprites('fall');
    }

    //detect for collision & we get hit
    if (this.rectangularCollision({ playerRectangle: player, enemyRectangle: enemy }) && player.isAttacking && player.currentFrame === 4) {
        audio.hit3.play();
        enemy.takeHit();
        audio.hit3.stop();
        player.isAttacking = false;
        //document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        });
    }
    
    //player misses attack
    if (player.isAttacking && player.currentFrame === 4) {
        player.isAttacking = false;
    }

    //Enemy movement
    enemy.velocity.x = 0;
    let boundryEnemy = flipped ? 15 : 40 + player.width;
    counter === 200 ? counter = 0 : counter++; //takes the AI 2sec to decide on what to do next
    ai({player, enemy, boundryEnemy, counter});
/*    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x > boundryEnemy) {
        enemy.velocity.x = -5;
        enemy.switchSprites('sprint');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x < 937) {
        enemy.velocity.x = 5;
        enemy.switchSprites('sprint');
    } else if (
        keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && enemy.position.x > 936 || 
        keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x < 40 + player.width) {
        enemy.switchSprites('sprint');
    } else {
        enemy.switchSprites('idle');
    }
    if (enemy.velocity.y < 0) {
        enemy.switchSprites('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprites('fall');
    }

    if (this.rectangularCollision({ playerRectangle: player, enemyRectangle: enemy }) && enemy.isAttacking && enemy.currentFrame === 2) { //5
        enemy.isAttacking = false;
        audio.hit1.play();
        player.takeHit();
        audio.hit1.stop();
        //document.querySelector('#playerHealth').style.width = player.health + '%';
        gsap.to('#playerHealth', {
            width: player.health + '%'
        });
    }
    //player misses attack
    if (enemy.isAttacking && enemy.currentFrame === 2) { //5
        enemy.isAttacking = false;
    }*/ 


    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId });
        audio.Battle.stop();
    }
}

animate();

window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (player.isDead || enemy.isDead) || timer === 0) location.reload();

    if (!player.isDead) {
        switch (e.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
            break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
            break;
            case 'w':
                if (player.velocity.y === 0) player.velocity.y = -20;
            break;
            case ' ':
                player.attack();
            break;
        }
    }
    
    if (!enemy.isDead) {
        switch (e.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight'
            break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
            break
            case 'ArrowUp':
                if (enemy.velocity.y === 0) enemy.velocity.y = -20;
            break;
            case 'ArrowDown':
                enemy.attack();
            break;
        }
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        //Player
        case 'd':
            keys.d.pressed = false;
        break;
        case 'a':
            keys.a.pressed = false;
        break;

        //Enemy
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
        break;
    }
});

let clicked = false;
window.addEventListener('keydown', () => {
    if(!clicked) {
        audio.Battle.play();
        clicked = true;
    }
});