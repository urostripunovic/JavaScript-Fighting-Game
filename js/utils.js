function rectangularCollision( { playerRectangle, enemyRectangle }) {
    return (
        playerRectangle.attackBox.position.x + playerRectangle.attackBox.width >= enemyRectangle.position.x &&
        playerRectangle.attackBox.position.x <= enemyRectangle.position.x + enemyRectangle.width &&
        playerRectangle.attackBox.position.y + playerRectangle.attackBox.height >= enemyRectangle.position.y &&
        playerRectangle.attackBox.position.y <= enemyRectangle.position.y + enemyRectangle.height
    );
}

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.querySelector('#displayText').style.display = 'flex';
    if (player.health === enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Tie</br></br>Press ENTER to restart';
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins</br></br>Press ENTER to restart'; 
    } else {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins</br></br>Press ENTER to restart';  
    }
}


//Verkar inte funka, vet vart felet ligger men vet inte hur jag skall stoppa räkningen
function wins({ player, enemy }) {
    sessionStorage.setItem('player', 0);
    sessionStorage.setItem('enemy', 0);    

    //Init of number of wins for testing
    //if (+sessionStorage.player > 0) document.querySelector('#playerWins').style.display = 'flex';
    //if (+sessionStorage.enemy > 0) document.querySelector('#enemyWins').style.display = 'flex';

    console.log(player.health)

    if (enemy.health <= 0) {
        sessionStorage.player = Number(sessionStorage.player) + 1;
        sessionStorage.enemy = 0;
        document.querySelector('#enemyWins').style.display = 'none';
        document.querySelector('#playerWins').style.display = 'flex';
    } else if (player.health <= 0) {
        sessionStorage.enemy = Number(sessionStorage.enemy) + 1;
        sessionStorage.player = 0;
        document.querySelector('#playerWins').style.display = 'none';
        document.querySelector('#enemyWins').style.display = 'flex';
    }

    document.querySelector('#playerWins').innerHTML = 'wins:'+sessionStorage.player;
    document.querySelector('#enemyWins').innerHTML = 'wins:'+sessionStorage.enemy;  
}

let timer = 60;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    if (timer === 0) {
        determineWinner({ player, enemy, timerId });
    }
}

function ai({ player, enemy }) {
    console.log("hej")
}