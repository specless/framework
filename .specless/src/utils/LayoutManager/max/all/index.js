module.exports = maximums;
var maxWidth = require('../width');
var maxHeight = require('../height');
var maxScale = require('../scale');
var maxAspect = require('../aspect');

function maximums(layout) {
    return {
        width: maxWidth(layout),
        height: maxHeight(layout),
        scale: maxScale(layout),
        aspect: maxAspect(layout)
    };
}