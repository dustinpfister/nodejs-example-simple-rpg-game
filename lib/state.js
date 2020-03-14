let path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
read = promisify(fs.readFile),
write = promisify(fs.writeFile);

let newState = exports.newState = (opt) => {
    opt = opt || {};
    opt.w = opt.w || 31;
    opt.h = opt.h || 11;
    return {
        player: {
            x: Math.floor(opt.w / 2),
            y: Math.floor(opt.h / 2),
            oldX: 1,
            oldY: 1,
            attack: 1,
            hp: 10,
            hpMax: 100,
            autoHeal: 1,
            autoHealEvery: 3,
            autoHealTicks: 0,
            exp: 0
        },
        enemies: [],
        lastSpawn: 0,
        w: opt.w,
        h: opt.h
    };
};

exports.loadState = (root, fileName) => {
    root = root || process.cwd();
    fileName = fileName || 'simple-rpg.json';
    return read(path.join(root, fileName), 'utf8')
    .then((json) => {
        let state = JSON.parse(json);
        return state;
    })
    .catch(() => {
        return newState();
    });
};

exports.saveState = (state, root, fileName) => {
    root = root || process.cwd();
    fileName = fileName || 'simple-rpg.json';
    return write(path.join(root, fileName), JSON.stringify(state), 'utf8');
};
