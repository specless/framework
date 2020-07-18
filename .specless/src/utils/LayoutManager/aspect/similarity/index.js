module.exports = aspectSimilarity;
var under1 = require('@timelaps/number/under1');
var aspectDistance = require('../distance');

function aspectSimilarity(layout, dimensions) {
    return 100 * under1(aspectDistance(layout, dimensions));
}