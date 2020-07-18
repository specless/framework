module.exports = specificity;
var under1 = require('@timelaps/number/under1');
var range = require('../range');
var sqrt = Math.sqrt;
/**
 * Describes the specificity of a layout. The specificity of a layout is determined by the non scaling ranges that are utilized in the layout i.e. the two distances held in the width and the height array.
 * @return {Number} a number (0-1] that can be used to compare specificities against other layouts.
 * @example
 * var comparable = specificity(layout);
 */
function specificity(layout) {
    var rangeWidth = range.width(layout) + 1,
        rangeHeight = range.height(layout) + 1,
        minRange = rangeWidth < rangeHeight ? rangeWidth : rangeHeight,
        rootRangeHeight = minRange === rangeHeight ? rangeHeight : sqrt(rangeHeight),
        rootRangeWidth = minRange === rangeWidth ? rangeWidth : sqrt(rangeWidth),
        rangeArea = rootRangeWidth * rootRangeHeight;
    return under1(rangeArea);
}