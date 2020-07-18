module.exports = maxScale;
var clamp = require('@timelaps/number/clamp');
var distillSecond = require('../../distill/second');
var MAX_SCALE = require('../../constants').MAX_SCALE;
/**
 * Retrieves maximum scale that the layout can possibly render at.
 * @method
 * @returns {Number}
 * @example
 * var maxScale = layout.maxScale();
 */
function maxScale(layout) {
    return clamp(distillSecond(layout, 'scale', MAX_SCALE), 1, MAX_SCALE);
}