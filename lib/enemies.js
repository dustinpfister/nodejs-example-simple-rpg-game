
let u = require('./utils.js');

const ENEMIES_MAX = 6,
ENEMIES_SPAWN_MIN = 5,
ENEMIES_ATTACK_RANGE = 1;

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
    y = y === undefined ? Math.floor(state.h / 2) : y;
    if (state.lastSpawn >= ENEMIES_SPAWN_MIN) {
        if (state.enemies.length < ENEMIES_MAX && !u.isOverPlayer(state, x, y)) {
            let e = u.get(state, x, y, 'enemies');
            if (!e) {
                state.enemies.push({
                    x: x,
                    y: y,
                    oldX: x,
                    oldY: y,
                    hp: 3,
                    sight: 4,
                    attack: 1
                });
            }
        }
        state.lastSpawn = 0;
    }
    state.lastSpawn += 1;
};

let toPlayerPos = (state, e) => {
    let dir = u.getDirFromObjToObj(e, state.player);
    return u.dirToPos(e, dir);
};

let toRandomPos = (state, e) => {
    return u.dirToPos(e, Math.floor(Math.random() * 4));
};

exports.updateEnemies = (state) => {
    let i = state.enemies.length;
    while (i--) {
        let e = state.enemies[i],
        player = state.player,
        d = u.distance(e.x, e.y, player.x, player.y),
        pos = d <= e.sight ? toPlayerPos(state, e) : toRandomPos(state, e);
        if (u.isOverNothing(state, pos.x, pos.y)) {
            e.oldX = e.x;
            e.oldY = e.y;
            e.x = pos.x;
            e.y = pos.y;
        }
        // set bounds
        e = Object.assign(e, u.setBounds(state, e));
        // attack player
        if (d <= ENEMIES_ATTACK_RANGE) {
            player.hp -= e.attack;
            player.hp = player.hp < 0 ? 0 : player.hp;
        };
    }
};
