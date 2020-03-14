
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

let drawPlayer = function (state, out) {
    let pos = state.player;
    setCur(pos.x, pos.y, out);
    out.write('@');
};

let drawEnemies = function (state, out) {
    let enemies = state.enemies,
    i = enemies.length;
    while (i--) {
        let e = enemies[i];
        setCur(e.x, e.y, out);
        out.write('E');
    }
};

// draw the area and at symbol
module.exports = (state, out) => {

    out = out || process.stdout;

    // draw a dot map for the whole render area
    drawDotMap(state, out);

    // draw info
    out.write(state.player.exp + '\n');
    out.write('move: wasd; exit: x\n');

    drawEnemies(state, out);

    // draw player
    drawPlayer(state, out);

    // set default colors and set cursor to the bottom
    colorsDefault(out);
    setCur(0, state.h + 2, out);
};
