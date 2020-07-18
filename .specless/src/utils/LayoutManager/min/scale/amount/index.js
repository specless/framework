module.exports = minScaleAmount;
var minScale = require('../');
var scalingDimension = require('../../../scaling-dimension');
var distillFirst = require('../../../distill/first');

function minScaleAmount(layout, dimension) {
    return distillFirst(layout, scalingDimension(layout, dimension), 1) * minScale(layout);
}