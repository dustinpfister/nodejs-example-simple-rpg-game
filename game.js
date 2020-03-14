let draw = require('./draw.js');

const ENEMIES_MAX = 3,
ENEMIES_SPAWN_MIN = 5;

// game state
let state = {
    player: {
        x: 5,
        y: 5,
        attack: 1
    },
    enemies: [],
    lastSpawn: 0,
    w: 16,
    h: 8
};
draw(state);

let getDirToPlayer = (state, eIndex) => {
    let e = typeof eIndex === 'object' ? eIndex : state.enemies[eIndex],
    player = state.player,
    r = Math.atan2(e.y - player.y, e.x - player.x) + Math.PI,
    per = r / (Math.PI * 2),
    dir = Math.floor(4 * per) % 4;
    return dir;
};

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

let spawnEnemy = (state, x, y) => {
    x = x === undefined ? 1 : x;
    y = y === undefined ? 5 : y;
    if (state.lastSpawn >= ENEMIES_SPAWN_MIN) {
        let playerOver = x === state.player.x && y === state.player.y;
        if (state.enemies.length < ENEMIES_MAX && !playerOver) {
            let e = getEnemy(state, x, y);
            if (!e) {
                state.enemies.push({
                    x: x,
                    y: y,
                    hp: 3
                });
            }
        }
        state.lastSpawn = 0;
    }
    state.lastSpawn += 1;
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

    spawnEnemy(state);

    player.x = player.x > map.w ? map.w : player.x;
    player.y = player.y > map.h ? map.h : player.y;

};

//set in raw mode and capture key strokes
process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
    let input = data.toString().trim();
    movementHandler(state, input);
    draw(state);
});
console.log( getDirToPlayer(state, {x:2,y:2}) );
