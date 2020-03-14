
exports.newState = () => {
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
