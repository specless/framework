module.exports = withinWidth;
var withinRange = require('@timelaps/number/within-range');
var minWidth = require('../../min/width');
var maxWidth = require('../../max/width');

function withinWidth(layout, width) {
    return withinRange(width, minWidth(layout), maxWidth(layout));
}