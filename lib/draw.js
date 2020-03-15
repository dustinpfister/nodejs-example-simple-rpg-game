let u = require('./utils.js');

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

let drawPlayerStats = function (state, out) {
    let p = state.player,
    text = 'hp: ' + p.hp + '/' + p.hpMax +
        ', exp: ' + p.exp;
    setCur(1, state.h + 1, out);
    out.write(new Array(state.w).fill(' ').join(''));
    setCur(1, state.h + 1, out);
    out.write(text);
};

let drawDotMap = function (state, out) {
    let dotLine = new Array(state.w).fill('.').join('') + '\n',
    i = state.h;
    while (i--) {
        out.write(dotLine);
    }
};

let drawPlayer = function (state, out) {
    let pos = state.player;
    setCur(pos.oldX, pos.oldY, out);
    let e2 = u.get(state, pos.oldX, pos.oldY, 'enemies');
    out.write(e2 ? 'E' : '.');
    setCur(pos.x, pos.y, out);
    out.write('@');
};

let drawEnemies = function (state, out) {
    let enemies = state.enemies,
    i = enemies.length;
    while (i--) {
        let e = enemies[i];
        setCur(e.oldX, e.oldY, out);
        let e2 = u.get(state, e.oldX, e.oldY, 'enemies');
        out.write(e2 ? 'E' : '.');
        setCur(e.x, e.y, out);
        out.write('E');
    }
};

let updateScreen = exports.updateScreen = (state, out) => {
    out = out || process.stdout;
    colorsSet(out);
    // draw enemies and player
    drawEnemies(state, out);
    drawPlayer(state, out);
    drawPlayerStats(state, out);
    // set default colors and set cursor to the bottom
    colorsDefault(out);
    setCur(0, state.h + 2, out);
};

exports.newScreen = (state, out) => {
    out = out || process.stdout;
    // draw a dot map for the whole render area
    clearScreen(out);
    setCur(1, 1, out);
    colorsSet(out);
    drawDotMap(state, out);
    // first update
    updateScreen(state, out);
};
