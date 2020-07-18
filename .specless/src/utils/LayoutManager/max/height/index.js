module.exports = maxHeight;
var distillSecond = require('../../distill/second');
var constants = require('../../constants');

function maxHeight(layout) {
    return distillSecond(layout, 'height', constants.LARGE_INTEGER);
}