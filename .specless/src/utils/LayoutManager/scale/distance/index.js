module.exports = scaleDistance;
var scale = require('../');
var under1 = require('@timelaps/number/under1');

function scaleDistance(layout, dimensions) {
    return under1(scale(layout, dimensions));
}