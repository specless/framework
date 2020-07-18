module.exports = maxAspect;
var maxWidth = require('../width');
var minHeight = require('../../min/height');

function maxAspect(layout) {
    return maxWidth(layout) / minHeight(layout);
}