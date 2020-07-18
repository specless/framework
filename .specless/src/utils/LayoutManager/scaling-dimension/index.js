module.exports = scalingDimension;
var under1 = require('@timelaps/number/under1');
var scaleNeeded = require('../scale/needed');
/**
 * Determine the scaling dimension needed that would cause the layout to be limited by it's min/max width/height dimensions first. This provides the simplest route to understanding how to scale the layout.
 * @param  {Object} dimensions an object with the key value pairs of width and height that have integer values greater than or equal to 1.
 * @return {String} Dimension that will limit the scaling of the layout first.
 */
function scalingDimension(layout, dimensions) {
    var widthScale = scaleNeeded(layout, 'width', dimensions.width),
        heightScale = scaleNeeded(layout, 'height', dimensions.height),
        widthScaleDistance = under1(widthScale),
        heightScaleDistance = under1(heightScale),
        scalingDownWidth = widthScale < 1,
        scalingDownHeight = heightScale < 1;
    return heightScaleDistance < widthScaleDistance ? 'height' : 'width';
}