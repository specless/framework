module.exports = minAspect;
var minWidth = require('../width');
var maxHeight = require('../../max/height');

function minAspect(layout) {
    return minWidth(layout) / maxHeight(layout);
}