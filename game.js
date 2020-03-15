let u = require('./lib/utils.js'),
draw = require('./lib/draw.js'),
stateMod = require('./lib/state.js'),
playerMod = require('./lib/player.js'),
enemies = require('./lib/enemies.js'),
inputHandler = require('./lib/input.js');

stateMod.loadState()
.then((state) => {
    //set in raw mode and capture key strokes
    process.stdin.setRawMode(true);
    process.stdin.on('data', (data) => {
        let input = data.toString().trim();
        inputHandler(state, input, {
            onPlayerDead: (state) => {
                let player = state.player;
                if (player.hp === 0) {
                    let newState = stateMod.newState();
                    state = Object.assign(state, newState);
                    draw.newScreen(state);
                }
            },
            onTurnOver: (state) => {
                draw.updateScreen(state);
                stateMod.saveState(state);
            }
        });
    });
    draw.newScreen(state);
});
