let u = require('./utils.js'),
enemies = require('./enemies.js');

let moveOrAttack = (state, tempX, tempY) => {
    // move or attack enemy
    let e = u.get(state, tempX, tempY, 'enemies'),
    player = state.player;
    if (!e) {
        player.oldX = player.x;
        player.oldY = player.y;
        player.x = tempX;
        player.y = tempY;
    } else {
        e.hp -= player.attack;
        enemies.purgeDead(state);
    }
    // player bounds
    player = Object.assign(player, u.setBounds(state, player));
};

let autoHeal = (state) => {
    let player = state.player;
    // player auto heal
    if (player.autoHeal) {
        player.autoHealTicks += 1;
        if (player.autoHealTicks >= player.autoHealEvery) {
            player.hp += player.autoHeal;
            player.hp = player.hp > player.hpMax ? player.hpMax : player.hp;
            player.autoHealTicks = 0;
        }
    }
};

exports.update = (state, tempX, tempY) => {
    moveOrAttack(state, tempX, tempY);
    autoHeal(state);
};
