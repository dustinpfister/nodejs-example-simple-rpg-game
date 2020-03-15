// distance between two points
exports.distance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// return an x and y position that is the
// next step from the position in 'obj' based
// off the given 'dir' in 0 to 3 form
exports.dirToPos = (obj, dir) => {
    let r = Math.PI * 2 / 4 * dir,
    dx = Math.round(Math.cos(r)),
    dy = Math.round(Math.sin(r));
    return {
        x: obj.x + dx,
        y: obj.y + dy
    };
};

// get a direction number (0 - 3) from one object to another
exports.getDirFromObjToObj = (obj1, obj2) => {
    let r = Math.atan2(obj1.y - obj2.y, obj1.x - obj2.x) + Math.PI,
    per = r / (Math.PI * 2),
    dir = Math.floor(4 * per) % 4;
    return dir;
};

// use the given 'map' object with a w and h prop
// to create an object with x and y props set to values
// that are in bounds for an 'obj' that might be out of bounds
exports.setBounds = (state, obj) => {
    let point = {};
    point.x = obj.x > state.w ? state.w : obj.x;
    point.y = obj.y > state.h ? state.h : obj.y;
    point.x = obj.x < 1 ? 1 : point.x;
    point.y = obj.y < 1 ? 1 : point.y;
    return point;
};

// is the given location over the player?
let isOverPlayer = exports.isOverPlayer = (state, x, y) => {
    return x === state.player.x && y === state.player.y;
};

// check if there is something at the given location
// if so return it
let get = exports.get = (state, x, y, mode) => {
    mode = mode || 'any';
    // if player is at location return that
    if (isOverPlayer(state, x, y) && (mode === 'any' || mode === 'player')) {
        return state.player;
    }
    // check enemies array
    if (mode === 'any' || mode === 'enemies') {
        let i = state.enemies.length;
        while (i--) {
            let e = state.enemies[i];
            if (e.x === x && e.y === y) {
                return e;
            }
        }
    }
    return false;
};

// is the given location over nothing?
exports.isOverNothing = (state, x, y) => {
    return !get(state, x, y);
};
