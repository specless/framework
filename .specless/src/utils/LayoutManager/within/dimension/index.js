module.exports = withinDimension;
var withinRange = require('@timelaps/number/within-range');
var min = require('../../min');
var max = require('../../max');

function withinDimension(layout, amount, dimension) {
    return withinRange(amount, min[dimension](layout), max[dimension](layout));
}