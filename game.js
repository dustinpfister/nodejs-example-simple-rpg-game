let draw = require('./draw.js');

// game state
let state = {
    player: {
        x: 1,
        y: 1,
        attack: 1
    },
    enemies: [{
            x: 7,
            y: 3,
            hp: 1
        }
    ],
    w: 16,
    h: 8
};
draw(state);

// check if an enemy is at the given pos
// return false if nothing is there
// or a reference to the enemy object if there
// is one
let getEnemy = (state, x, y) => {
    let i = state.enemies.length;
    while (i--) {
        let e = state.enemies[i];
        if (e.x === x && e.y === y) {
            return e;
        }
    }
    return false;
};

// purge any dead enemies
let purgeDead = (state) => {

    let i = state.enemies.length;
    while (i--) {
        let e = state.enemies[i];
        if (e.hp <= 0) {

            state.enemies.splice(i, 1);

        }
    }

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

    let e = getEnemy(state, tempX, tempY);

    if (!e) {
        player.x = tempX;
        player.y = tempY;
    } else {
        e.hp -= player.attack;
        purgeDead(state);
    }

    player.x = player.x > map.w ? map.w : player.x;
    player.y = player.y > map.h ? map.h : player.y;

};

// set in raw mode and capture key strokes
process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
    let input = data.toString().trim();

    movementHandler(state, input);

    draw(state);
});
