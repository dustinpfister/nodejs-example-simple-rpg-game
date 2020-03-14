let path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
read = promisify(fs.readFile),
write = promisify(fs.writeFile);

let newState = exports.newState = () => {
    return {
        player: {
            x: 9,
            y: 4,
            attack: 1,
            hp: 10,
            hpMax: 100,
            autoHeal: 1,
            autoHealEvery: 3,
            exp: 0
        },
        enemies: [],
        lastSpawn: 0,
        w: 17,
        h: 7
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