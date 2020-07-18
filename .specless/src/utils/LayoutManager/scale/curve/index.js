module.exports = curveScale;
var scaleClamp = require('../clamp');
var distillFirst = require('../../distill/first');
var clamp = require('@timelaps/number/clamp');
var constants = require('../../constants');
var round = require('@timelaps/number/round');

function curveScale(layout, scale) {
    var clamped = scaleClamp(layout, scale),
        power = distillFirst(layout, 'scalePower', 1),
        powered = Math.pow(clamped, power);
    return round(clamp(powered, constants.MIN_SCALE, constants.MAX_SCALE), -8);
}