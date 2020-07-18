module.exports = aspectDistance;
var aspectClamp = require('../clamp');

function aspectDistance(layout, dimensions) {
    var width = dimensions.width,
        height = dimensions.height,
        currentAspect = width / height;
    return currentAspect / aspectClamp(layout, currentAspect);
}