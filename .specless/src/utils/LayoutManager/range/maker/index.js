module.exports = rangeMaker;
var max = require('../../max');
var min = require('../../min');
/**
 * Retrieves range as a number of the passed dimension
 * @method
 * @param {String} dimension used to calculate the range via its respective min and max values
 * @returns {Number}
 * @example
 * var range = range('height')(layout);
 */
function rangeMaker(dimension) {
    return function (layout) {
        return max[dimension](layout) - min[dimension](layout);
    };
}