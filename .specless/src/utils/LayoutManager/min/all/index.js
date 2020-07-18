module.exports = minimums;
var minWidth = require('../width');
var minHeight = require('../height');
var minScale = require('../scale');
var minAspect = require('../aspect');

function minimums(layout) {
    return {
        width: minWidth(layout),
        height: minHeight(layout),
        scale: minScale(layout),
        aspect: minAspect(layout)
    };
}