module.exports = fit;
var normalize = require('../normalize');
var withinRange = require('@timelaps/number/within-range');

function fit(layout, dimensions) {
    var width = dimensions.width;
    var height = dimensions.height;
    var minHeight = layout.minHeight;
    var maxHeight = layout.maxHeight;
    var minWidth = layout.minWidth;
    var maxWidth = layout.maxWidth;
    var minAspect = layout.minAspect;
    var maxAspect = layout.maxAspect;
    return withinRange(width, minWidth, maxWidth) && withinRange(height, minHeight, maxHeight) && withinRange(width / height, minAspect, maxAspect);
    // alternative
    // return withinRange(width, minWidth) && withinRange(height, minHeight);
}