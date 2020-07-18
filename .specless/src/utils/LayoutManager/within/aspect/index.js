module.exports = withinAspect;
var withinRange = require('@timelaps/number/within-range');
var minAspect = require('../../min/aspect');
var maxAspect = require('../../max/aspect');

function withinAspect(layout, aspect) {
    return withinRange(aspect, minAspect(layout), maxAspect(layout));
}