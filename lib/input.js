//let u = require('./lib/utils.js'),
//draw = require('./lib/draw.js'),
let stateMod = require('./state.js'),
playerMod = require('./player.js'),
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
    // update player
    playerMod.update(state, tempX, tempY);
    // spawn and update enemies
    enemies.spawnEnemy(state);
    enemies.updateEnemies(state);
    // if player dies, start over
    if (player.hp === 0) {
        opt.onPlayerDead(state);
        //let newState = stateMod.newState();
        //state = Object.assign(state, newState);
        //draw.newScreen(state);
    }
    opt.onTurnOver(state);
    // save state
    //stateMod.saveState(state);
};
