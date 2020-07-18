module.exports = withinHeight;
var withinRange = require('@timelaps/number/within-range');
var minHeight = require('../../min/height');
var maxHeight = require('../../max/height');

function withinHeight(layout, height) {
    return withinRange(height, minHeight(layout), maxHeight(layout));
}