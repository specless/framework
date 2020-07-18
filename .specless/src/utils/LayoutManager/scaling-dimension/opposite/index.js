module.exports = scalingDimensionOpposite;
var scalingDimension = require('../');

function scalingDimensionOpposite(layout, dimensions) {
    return scalingDimension(layout, dimensions) === 'height' ? 'width' : 'height';
}