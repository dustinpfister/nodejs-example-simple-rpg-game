#!/usr/bin/env node

let draw = require('./lib/draw.js'),
stateMod = require('./lib/state.js'),
inputHandler = require('./lib/input.js');

stateMod.loadState()
.then((state) => {
    //set in raw mode and capture key strokes
    process.stdin.setRawMode(true);
    // for each data event from the standard input
    process.stdin.on('data', (data) => {
        // use the input handler
        inputHandler(state, data.toString().trim(), {
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
