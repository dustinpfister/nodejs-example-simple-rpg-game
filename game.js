let out = process.stdout,
draw = require('./draw.js');

// start position
let pos = {
    x: 1,
    y: 1,
    w: 10,
    h: 4
};
draw(pos);
// set in raw mode and capture key strokes
process.stdin.setRawMode(true);
process.stdin.on('data', (data) => {
    let input = data.toString().trim();
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
    pos.x = pos.x > pos.w ? pos.w: pos.x;
    pos.y = pos.y > pos.h ? pos.h: pos.y;
    draw(pos, out);
});