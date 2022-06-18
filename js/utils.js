function rectangularCollision( { playerRectangle, enemyRectangle}) {
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
        document.querySelector('#displayText').innerHTML = 'Tie</br></br>Press Enter to restart';
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins</br></br>Press Enter to restart';  
    } else {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins</br></br>Press Enter to restart';  
    }
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
        determineWinner({ player, enemy, timerId })
    }
}