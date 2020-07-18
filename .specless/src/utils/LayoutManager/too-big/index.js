module.exports = tooBig;
var scalingDimension = require('../scaling-dimension');
var nonScalingDimension = require('../scaling-dimension/opposite');
var withinRange = require('@timelaps/number/within-range');
var min = require('../min');

function tooBig(layout, dimensions) {
    var scaling_dim = scalingDimension(layout, dimensions),
        non_scaling_dim = nonScalingDimension(layout, dimensions),
        minScaleValue = min.scale(layout);
    return !withinRange(dimensions[scaling_dim], min[scaling_dim](layout) * minScaleValue) || !withinRange(dimensions[non_scaling_dim], min[non_scaling_dim](layout) * minScaleValue);
}