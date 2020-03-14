
const ENEMIES_MAX = 3,
ENEMIES_SPAWN_MIN = 5;

let isOverPlayer = (state, x, y) => {
    return x === state.player.x && y === state.player.y;
};

let isOverNothing = (state, x, y) => {
    return !isOverPlayer(state, x, y) && !getEnemy(state, x, y);
};

// get the direction to the player with the given state object
// and enemy object or index in state object
let getDirToPlayer = exports.getDirToPlayer = (state, eIndex) => {
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
let getEnemy = exports.getEnemy = (state, x, y) => {
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
exports.purgeDead = (state) => {
    let i = state.enemies.length;
    while (i--) {
        let e = state.enemies[i];
        if (e.hp <= 0) {
            state.player.exp += 1;
            state.enemies.splice(i, 1);
        }
    }
};

exports.spawnEnemy = (state, x, y) => {
    x = x === undefined ? 1 : x;
    y = y === undefined ? 5 : y;
    if (state.lastSpawn >= ENEMIES_SPAWN_MIN) {
        //let playerOver = x === state.player.x && y === state.player.y;
        if (state.enemies.length < ENEMIES_MAX && !isOverPlayer(state, x, y)) {
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

let dirToPos = (obj, dir) => {
    let r = Math.PI * 2 / 4 * dir,
    dx = Math.round(Math.cos(r)),
    dy = Math.round(Math.sin(r));
    return {
        x: obj.x + dx,
        y: obj.y + dy
    };
}

let toPlayerPos = (state, e) => {
    return dirToPos(e, getDirToPlayer(state, e));
    /*
    r = Math.PI * 2 / 4 * dir,
    dx = Math.round(Math.cos(r)),
    dy = Math.round(Math.sin(r));
    return {
    x: e.x + dx,
    y: e.y + dy
    };
     */
};

let toRandomPos = (state, e) => {
    return dirToPos(e, Math.floor(Math.random() * 4));
    /*
    let dir = Math.floor(Math.random() * 4);
    r = Math.PI * 2 / 4 * dir,
    dx = Math.round(Math.cos(r)),
    dy = Math.round(Math.sin(r));
    return {
    x: e.x + dx,
    y: e.y + dy
    };
     */
};

exports.updateEnemies = (state) => {

    let i = state.enemies.length;
    while (i--) {

        let e = state.enemies[i],
        pos = toPlayerPos(state, e);
        //pos = toRandomPos(state, e);

        if (isOverNothing(state, pos.x, pos.y)) {
            e.x = pos.x;
            e.y = pos.y;
        }

        e.x = e.x > state.w ? state.w : e.x;
        e.y = e.y > state.h ? state.h : e.y;
        e.x = e.x < 1 ? 1 : e.x;
        e.y = e.y < 1 ? 1 : e.y;

    }

}
