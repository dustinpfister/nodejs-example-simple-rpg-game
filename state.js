let path = require('path'),
fs = require('fs'),
promisify = require('util').promisify,
read = promisify(fs.read);

let newState = exports.newState = () => {
    return {
        player: {
            x: 5,
            y: 5,
            attack: 1,
            exp: 0
        },
        enemies: [],
        lastSpawn: 0,
        w: 16,
        h: 8
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
