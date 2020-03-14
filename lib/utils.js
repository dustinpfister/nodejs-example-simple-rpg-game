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

// use the given 'map' object with a w and h prop
// to create an object with x and y props set to values
// that are in bounds for an 'obj' that might be out of bounds
exports.setBounds = (map, obj) => {
    let pos = {};
    pos.x = obj.x > map.w ? map.w : obj.x;
    pos.y = obj.y > map.h ? map.h : obj.y;
    pos.x = obj.x < 1 ? 1 : obj.x;
    pos.y = obj.y < 1 ? 1 : obj.y;
    return pos;
};
