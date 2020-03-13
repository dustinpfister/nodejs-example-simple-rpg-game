
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

let drawDotMap = function (state, out) {
    let dotLine = new Array(state.w).fill('.').join('') + '\n',
    i = state.h;
    clearScreen(out);
    setCur(1, 1, out);
    colorsSet(out);
    while (i--) {
        out.write(dotLine);
    }
};

// draw the area and at symbol
module.exports = (state, out) => {

    out = out || process.stdout;

    // draw a dot map for the whole render area
    drawDotMap(state, out);

    // draw info
    out.write('move: wasd; exit: x');

    // draw at symbol
    let pos = state.player;
    setCur(pos.x, pos.y, out);
    out.write('@');

    // set default colors and set cursor to the bottom
    colorsDefault(out);
    setCur(0, state.h + 1, out);
};
