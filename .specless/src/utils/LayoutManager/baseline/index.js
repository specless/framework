var constants = require('../constants');
module.exports = baseline;

function baseline() {
    return {
        id: 'none',
        width: [1, constants.LARGE_INTEGER],
        height: [1, constants.LARGE_INTEGER],
        scale: [constants.MIN_SCALE, constants.MAX_SCALE],
        scalePower: [1, 1]
    };
}