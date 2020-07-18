module.exports = minScale;
var constants = require('../../constants');
var distillFirst = require('../../distill/first');
var clamp = require('@timelaps/number/clamp');
/**
 * Retrieves minimum scale that the layout can possibly render at.
 * @method
 * @returns {Number}
 * @example
 * var minScale = layout.minScale();
 */
function minScale(layout) {
    return clamp(distillFirst(layout, 'scale', constants.MIN_SCALE), constants.MIN_SCALE, 1);
}