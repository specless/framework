module.exports = withinScale;
var maxScale = require('../../max/scale');
var minScale = require('../../min/scale');
var maxWidth = require('../../max/width');
var minWidth = require('../../min/width');
var maxHeight = require('../../max/height');
var minHeight = require('../../min/height');

function withinScale(layout, dimensions) {
    var maxScale_ = maxScale(layout),
        minScale_ = minScale(layout),
        minWidth_ = minWidth(layout),
        maxWidth_ = maxWidth(layout),
        minHeight_ = minHeight(layout),
        maxHeight_ = maxHeight(layout),
        minScaleWidth = minScale_ * minWidth_,
        maxScaleWidth = maxScale_ * maxWidth_,
        minScaleHeight = minScale_ * minHeight_,
        maxScaleHeight = maxScale_ * maxHeight_,
        width = dimensions.width,
        height = dimensions.height;
    return maxScaleHeight >= height && height >= minScaleHeight && maxScaleWidth >= width && width >= minScaleWidth;
}