module.exports = maxWidth;
var constants = require('../../constants');
var distillSecond = require('../../distill/second');

function maxWidth(layout) {
    return distillSecond(layout, 'width', constants.LARGE_INTEGER);
}