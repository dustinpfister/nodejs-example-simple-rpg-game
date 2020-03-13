let draw = require('./draw.js');

// game state
let state = {
    player: {
        x: 1,
        y: 1
    },
    w: 16,
    h: 8
};
draw(state);
// set in raw mode and capture key strokes
process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
    let input = data.toString().trim(),
    pos = state.player,
    map = state;
    if (input === 'd') {
        pos.x += 1;
    }
    if (input === 'a') {
        pos.x -= 1;
    }
    if (input === 'w') {
        pos.y -= 1;
    }
    if (input === 's') {
        pos.y += 1;
    }
    if (input === 'x') {
        process.exit()
    }
    pos.x = pos.x > map.w ? map.w : pos.x;
    pos.y = pos.y > map.h ? map.h : pos.y;
    draw(state);
});
