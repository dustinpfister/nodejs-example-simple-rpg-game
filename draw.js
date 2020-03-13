
let setCur = (x, y, out) => {
    x = x || 0;
    y = y || 0;
    out.write('\u001b[' + y + ';' + x + 'H');
}

let clearScreen = (out) => {
    out.write('\u001b[2J');
}
let colorsSet = (out) => {
    out.write('\u001b[47m');
    out.write('\u001b[30m');
};
let colorsDefault = (out) => {
    out.write('\u001b[39m\u001b[49m');
};

// draw the area and at symbol
module.exports = (state, out) => {
    out = out || process.stdout;
    state = state || {};
    state.x = state.x || 1;
    state.y = state.y || 1;
    clearScreen(out);
    setCur(1, 1, out);
    colorsSet(out);
    // draw area
    out.write('..........\n');
    out.write('..........\n');
    out.write('..........\n');
    out.write('..........\n');
    out.write('move: wasd; exit: x');
    // draw at symbol
    setCur(state.x, state.y, out);
    out.write('@');
    colorsDefault(out);
    setCur(0, 6, out);
};
