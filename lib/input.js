let playerMod = require('./player.js'),
enemies = require('./enemies.js');

module.exports = (state, input, opt) => {
    let player = state.player,
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
        process.exit();
    }
    // update player, and enemies
    playerMod.update(state, tempX, tempY);
    enemies.spawnEnemy(state);
    enemies.updateEnemies(state);
    // events
    if (player.hp === 0) {
        opt.onPlayerDead(state);
    }
    opt.onTurnOver(state);
};
