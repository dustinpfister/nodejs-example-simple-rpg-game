let draw = require('./draw.js');

// game state
let state = {
    player: {
        x: 1,
        y: 1
    },
    enemies: [{
            x: 7,
            y: 3
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
let getEnemy = function (state, x, y) {
    let i = state.enemies.length;
    while (i--) {
        let e = state.enemies[i];
        if (e.x === x && e.y === y) {
            return e;
        }
    }
    return false;
};

let movementHandler = function (state, input) {

    let pos = state.player,
    map = state,

    tempX = pos.x,
    tempY = pos.y;
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

        pos.x = tempX;
        pos.y = tempY;

    }

    //pos.x = pos.x > map.w ? map.w : pos.x;
    //pos.y = pos.y > map.h ? map.h : pos.y;

};

// set in raw mode and capture key strokes
process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
    let input = data.toString().trim();

    movementHandler(state, input);

    draw(state);
});
