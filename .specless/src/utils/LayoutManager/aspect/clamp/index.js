module.exports = clampAspect;
var clamp = require('@timelaps/number/clamp');
var minAspect = require('../../min/aspect');
var maxAspect = require('../../max/aspect');

function clampAspect(layout, aspect) {
    return clamp(aspect, minAspect(layout), maxAspect(layout));
}