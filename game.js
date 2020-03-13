let out = process.stdout;
// Set the position of a cursor
let setCur = (x, y) => {
    x = x || 0;
    y = y || 0;
    out.write('\u001b[' + y + ';' + x + 'H');
}
let clearScreen = () => {
    out.write('\u001b[2J');
}
let colorsSet = () => {
    out.write('\u001b[47m');
    out.write('\u001b[30m');
};
let colorsDefault = () => {
    out.write('\u001b[39m\u001b[49m');
};
// draw the area and at symbol
let draw = (opt) => {
    opt = opt || {};
    opt.x = opt.x || 1;
    opt.y = opt.y || 1;
    clearScreen();
    setCur(1, 1);
    colorsSet();
    // draw area
    out.write('..........\n');
    out.write('..........\n');
    out.write('..........\n');
    out.write('..........\n');
    out.write('move: wasd; exit: x');
    // draw at symbol
    setCur(opt.x, opt.y);
    out.write('@');
    colorsDefault();
};
// start position
let pos = {
    x: 1,
    y: 1,
    w: 10,
    h: 4
};
draw(pos);
setCur(1, 6);
// set in raw mode and capture key strokes
process.stdin.setRawMode(true)
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
    draw(pos);
    setCur(1, 6);
});