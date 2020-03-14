let draw = require('./draw.js'),
stateMod = require('./state.js'),
enemies = require('./enemies.js');

// new state
//let state = stateMod.newState();

stateMod.loadState()
.then((state) => {

    let movementHandler = (state, input) => {

        let player = state.player,
        tempX = player.x,
        tempY = player.y;
        if (input === 'd') {
            tempX += 1;
        }
        if (input === 'a') {
            tempX -= 1;
        }
        if (input === 'w') {
            tempY -= 1;
        }
        if (input === 's') {
            tempY += 1;
        }
        if (input === 'x') {
            process.exit()
        }

        // move or attack enemy
        let e = enemies.getEnemy(state, tempX, tempY);
        if (!e) {
            player.x = tempX;
            player.y = tempY;
        } else {
            e.hp -= player.attack;
            enemies.purgeDead(state);
        }
        // player bounds
        player.x = player.x > state.w ? state.w : player.x;
        player.y = player.y > state.h ? state.h : player.y;
        player.x = player.x < 1 ? 1 : player.x;
        player.y = player.y < 1 ? 1 : player.y;

        // call spawn enemies method
        enemies.spawnEnemy(state);

        enemies.updateEnemies(state);

    };

    //set in raw mode and capture key strokes
    process.stdin.setRawMode(true);
    process.stdin.on('data', (data) => {
        let input = data.toString().trim();
        movementHandler(state, input);
        draw(state);
    });
    draw(state);

});
