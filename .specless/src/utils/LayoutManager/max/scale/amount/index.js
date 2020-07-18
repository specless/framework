module.exports = maxScaleAmount;
var distillSecond = require('../../../distill/second');
var scalingDimension = require('../../../scaling-dimension');
var constants = require('../../../constants');
var maxScale = require('../');

function maxScaleAmount(layout, dimension) {
    return distillSecond(layout, scalingDimension(layout, dimension), constants.LARGE_INTEGER) * maxScale(layout);
}