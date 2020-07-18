module.exports = scaleNeeded;
var min = require('../../min');
var max = require('../../max');
var round = require('@timelaps/number/round');

function scaleNeeded(layout, dimension, value) {
    var result,
        minScaleNeeded = value / min[dimension](layout),
        maxScaleNeeded = value / max[dimension](layout);
    if (minScaleNeeded >= 1 && maxScaleNeeded <= 1) {
        result = 1;
    } else if (minScaleNeeded < 1 && maxScaleNeeded < 1) {
        result = minScaleNeeded;
    } else if (minScaleNeeded > 1 && maxScaleNeeded > 1) {
        result = maxScaleNeeded;
    }
    return round(result, -8);
}