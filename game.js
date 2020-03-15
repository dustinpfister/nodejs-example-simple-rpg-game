let u = require('./lib/utils.js'),
draw = require('./lib/draw.js'),
stateMod = require('./lib/state.js'),
playerMod = require('./lib/player.js'),
enemies = require('./lib/enemies.js');

stateMod.loadState()
.then((state) => {

    let movementHandler = (state, input) => {
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
            let newState = stateMod.newState();
            state = Object.assign(state, newState);
            draw.newScreen(state);
        }
        // save state
        stateMod.saveState(state);
    };

    //set in raw mode and capture key strokes
    process.stdin.setRawMode(true);
    process.stdin.on('data', (data) => {
        let input = data.toString().trim();
        movementHandler(state, input);
        draw.updateScreen(state);
    });
    draw.newScreen(state);

});
