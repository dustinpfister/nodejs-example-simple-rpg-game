let draw = require('./draw.js'),
enemies = require('./enemies.js');

// game state
let state = {
    player: {
        x: 5,
        y: 5,
        attack: 1,
        exp: 0
    },
    enemies: [],
    lastSpawn: 0,
    w: 16,
    h: 8
};

let movementHandler = function (state, input) {

    let player = state.player,
    map = state,

    tempX = player.x,
    tempY = player.y;
    if (input === 'd') {
        tempX += 1;
    }
    if (input === 'a') {
        tempX -= 1;
    }
    if (input === 'w') {
        tempY -= 1;
    }
    if (input === 's') {
        tempY += 1;
    }
    if (input === 'x') {
        process.exit()
    }

    // move or attack enemy
    let e = enemies.getEnemy(state, tempX, tempY);
    if (!e) {
        player.x = tempX;
        player.y = tempY;
    } else {
        e.hp -= player.attack;
        enemies.purgeDead(state);
    }
    // player bounds
    player.x = player.x > map.w ? map.w : player.x;
    player.y = player.y > map.h ? map.h : player.y;
    player.x = player.x < 1 ? 1 : player.x;
    player.y = player.y < 1 ? 1 : player.y;

    // call spawn enemies method
    enemies.spawnEnemy(state);

    enemies.updateEnemies(state);

};

//set in raw mode and capture key strokes
process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
    let input = data.toString().trim();
    movementHandler(state, input);
    draw(state);
});
draw(state);
