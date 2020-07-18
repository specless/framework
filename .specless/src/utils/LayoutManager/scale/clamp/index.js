module.exports = clampScale;
var clamp = require('@timelaps/number/clamp');
var maxScale = require('../../max/scale');
var minScale = require('../../min/scale');

function clampScale(layout, scale) {
    return clamp(scale, minScale(layout), maxScale(layout));
}