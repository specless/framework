module.exports = scale;
var withinRange = require('@timelaps/number/within-range');
var clamp = require('@timelaps/number/clamp');
var scalingDimension = require('../scaling-dimension');
var nonScalingDimension = require('../scaling-dimension/opposite');
var min = require('../min');
var max = require('../max');
var curveScale = require('./curve');
var round = require('@timelaps/number/round');

/**
 * Calculate the scaling dimension of the layout at the passed dimensions. The scaling dimension is first determined by checking the aspect ratio range and checking if the passed dimensions create an aspect ratio within that range. If it does, then the aspect distance, or the difference between two aspect ratios is not equal to 1 and therefore the minor dimension should lead since this dimension will provide the scaling limit (this means there will be space at least on two opposite dimensions). If the layout is within the aspect range, then the scales that would be needed for both the height and width are calculated independently and respective to the dimensions that were passed and the min and max are calculated respective to the dimension which they belong. The
 * @param  {Object} object of dimensions (width, height) that are numbers >= 1
 * @return {Number} Amount that the layout will scale at that size.
 * @example
 * scale(layout, {
 *     width: 970,
 *     height: 90
 * }); // 3.141592
 */
function scale(layout, dimensions) {
    var closerToMax, scale,
        scaling_dimension = scalingDimension(layout, dimensions),
        non_scaling_dimension = nonScalingDimension(layout, dimensions),
        scaling_value = dimensions[scaling_dimension],
        non_scaling_value = dimensions[non_scaling_dimension],
        min_scaling_value = min[scaling_dimension](layout),
        max_scaling_value = max[scaling_dimension](layout),
        min_non_scaling_value = min[non_scaling_dimension](layout),
        max_non_scaling_value = max[non_scaling_dimension](layout),
        within_scaling = withinRange(scaling_value, min_scaling_value, max_scaling_value),
        within_non_scaling = withinRange(non_scaling_value, min_non_scaling_value, max_non_scaling_value);
    if (within_scaling && within_non_scaling) {
        // doesn't have to scale to get there
        return 1;
    }
    closerToMax = max_scaling_value / scaling_value < scaling_value / max_scaling_value;
    if (closerToMax) {
        scale = scaling_value / max_scaling_value;
        scale = scale / ((clamp(non_scaling_value / scale, min_non_scaling_value) * scale) / non_scaling_value);
    } else {
        scale = scaling_value / min_scaling_value;
    }
    return round(curveScale(layout, scale), -8);
}