module.exports = coverage;
var aspectSimilarity = require('../aspect/similarity');
var withinScale = require('../within/scale');
var minScale = require('../min/scale');
var maxScale = require('../max/scale');
var minAspect = require('../min/aspect');
var maxAspect = require('../max/aspect');
var scale = require('../scale');
var maxAll = require('../max/all');
var minAll = require('../min/all');
var tooBig = require('../too-big');
var scalingDimension = require('../scaling-dimension');
var nonScalingDimension = require('../scaling-dimension/opposite');
var withinRange = require('@timelaps/number/within-range');
var round = require('@timelaps/number/round');
/**
 * Determine the maximum area given a width and height that this layout could cover based on it's available dimensions and scaling limitations. A layout's coverage of a given height and width, given as dimensions can be calculated as follows. Determine if the layout is too big. If it is not too big to fit in the dimensions passed, then check if the dimensions can be reached one way or another by scaling the layout's height and width to their maximums and minimums. If the dimensions are within the layout's reach, via the available scaling range then the amount that will be covered is simply equal to the aspect distance of the layout compared to the passed dimensions. If the layout cannot scale to the necessary dimensions, then scaling must be taken into account using the aspect ratio that will cover the most area. This can be done by
 * @method
 * @example
 */
function coverage(layout, dimensions) {
    var result, covers, scaleValue, nonScalingDimensionValue, maximums, minimums, scalingDimensionValue, maxScaledAspect, minScaledAspect, scaledAspect,
        width = dimensions.width,
        height = dimensions.height;
    if (tooBig(layout, dimensions)) {
        result = 0;
    } else if (withinScale(layout, dimensions)) {
        result = aspectSimilarity(layout, dimensions);
    } else {
        maximums = maxAll(layout);
        minimums = minAll(layout);
        scalingDimensionValue = scalingDimension(layout, dimensions);
        nonScalingDimensionValue = nonScalingDimension(layout, dimensions);
        scaleValue = scale(layout, dimensions);
        maxScaledAspect = maximums[nonScalingDimensionValue] / (minimums[scalingDimensionValue] * scaleValue);
        minScaledAspect = minimums[nonScalingDimensionValue] / (maximums[scalingDimensionValue] * scaleValue);
        scaledAspect = dimensions[nonScalingDimensionValue] / (maximums[scalingDimensionValue] * scaleValue);
        if (minScaledAspect > maxScaledAspect) {
            maxScaledAspect = (minimums[scalingDimensionValue] * scaleValue) / maximums[nonScalingDimensionValue];
            minScaledAspect = (maximums[scalingDimensionValue] * scaleValue) / minimums[nonScalingDimensionValue];
            scaledAspect = (maximums[scalingDimensionValue] * scaleValue) / dimensions[nonScalingDimensionValue];
        }
        if (!withinRange(scaledAspect, minScaledAspect, maxScaledAspect)) {
            result = (((maximums.width * scaleValue) * (maximums.height * scaleValue))) / (dimensions.width * dimensions.height);
        } else {
            result = ((maximums[scalingDimensionValue] * scaleValue) * (dimensions[nonScalingDimensionValue] * scaleValue)) / (width * height);
        }
        result = result * 100;
    }
    return round(result, -8);
}