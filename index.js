const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({ position: { x: 0, y: 0 }, imgSrc: './img/background.png' });

const shop = new Sprite({ position: { x: 625, y: 128 }, imgSrc: './img/shop.png', scale: 2.75, framesMax: 6 });

const player = new Fighter({
    position: { x: 30, y: 0 },
    velocity: { x: 0, y: 10 },
    offset: { x: 0, y: 0 },
    imgSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {x: 215, y: 157 }, //The sprites specific offset for when it's time to redraw the frames
    sprites: { 
        idle: { imgSrc: './img/samuraiMack/Idle.png', framesMax: 8 },
        sprint: { imgSrc: './img/samuraiMack/Run.png', framesMax: 8 },
        jump: { imgSrc: './img/samuraiMack/Jump.png', framesMax: 2 },
        fall: { imgSrc: './img/samuraiMack/Fall.png', framesMax: 2 },
        attack1: { imgSrc: './img/samuraiMack/Attack1.png', framesMax: 6 },
        takeHit: { imgSrc: './img/samuraiMack/Take Hit - white silhouette.png', framesMax: 4 },
        death: { imgSrc: './img/samuraiMack/Death.png', framesMax: 6 },
    },
    attackBox: {
        offset: { x: 100, y: 50},
        width: 158,
        height: 50,
    },
    wins: 3,
});


const enemy = new Fighter({
    position: { x: 937, y: 100 },
    velocity: { x: 0, y: 0 },
    color: 'blue',
    offset: { x: 50, y: 0 },
    imgSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
    offset: {x: 215, y: 167 },
    sprites: { 
        idle: { imgSrc: './img/kenji/Idle.png', framesMax: 4 },
        sprint: { imgSrc: './img/kenji/Run.png', framesMax: 8 },
        jump: { imgSrc: './img/kenji/Jump.png', framesMax: 2 },
        fall: { imgSrc: './img/kenji/Fall.png', framesMax: 2 },
        attack1: { imgSrc: './img/kenji/Attack1.png', framesMax: 4 },
        takeHit: { imgSrc: './img/kenji/Take hit - white silhouette.png', framesMax: 3 },
        death: { imgSrc: './img/kenji/Death.png', framesMax: 7 },
    },
    attackBox: {
        offset: { x: -173, y: 50},
        width: 170,
        height: 50,
    },
    wins: 0,
});

const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    c.fillStyle = 'rgba(255,255,255, 0.12)'; //0.12 e opacity så det gör gubbarna lite kontrast
    c.fillRect(0,0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    //TODO flip character positions when passing each other, wont work we don't have the sprites animations
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
        enemy.takeHit();
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
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && enemy.position.x > boundryEnemy) {
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

    if (this.rectangularCollision({ playerRectangle: player, enemyRectangle: enemy }) && enemy.isAttacking && enemy.currentFrame === 2) {
        enemy.isAttacking = false;
        player.takeHit();
        //document.querySelector('#playerHealth').style.width = player.health + '%';
        gsap.to('#playerHealth', {
            width: player.health + '%'
        });
    }

    //player misses attack
    if (enemy.isAttacking && enemy.currentFrame === 2) {
        enemy.isAttacking = false;
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({ player, enemy, timerId }); 
    }

    //winStreak();
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
        //AI ska spelas här.
        //ai({ player, enemy });
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