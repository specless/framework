module.exports = closest;
var none = defaultLayout('none');
var error = defaultLayout('error');
var last = require('@timelaps/n/last');
var isArray = require('@timelaps/is/array');
var sort = require('@timelaps/array/sort');
var under1 = require('@timelaps/number/under1');
var withinRange = require('@timelaps/number/within-range');
var filter = require('@timelaps/array/filter');
var map = require('@timelaps/n/map');
var fitMany = require('../fit/many');
var create = require('../create');
var nonScalingDimension = require('../scaling-dimension/opposite');
var scalingDimension = require('../scaling-dimension');
var withinScale = require('../within/scale');
var max = require('../max');
var min = require('../min');
var constants = require('../constants');
var coverage = require('../coverage');
var scale = require('../scale');
var range = require('../range');
var tooBig = require('../too-big');
var specificity = require('../specificity');
closest.comparator = comparator;
closest.default = defaultLayout;

function defaultLayout(id) {
    return function (dimensions) {
        var height = dimensions.height;
        var width = dimensions.width;
        return create({
            id: id,
            height: height ? [height] : [1],
            width: width ? [width] : [1]
        });
    };
}

function subset(layouts_, dimensions) {
    var layouts = map(layouts_ || [], create);
    layouts = fitMany(layouts, dimensions);
    // filter layouts that are too big to fit into given dims
    return filter(layouts, function (layout) {
        return !tooBig(layout, dimensions);
    });
}

function closest(layouts_, dimensions_) {
    var layouts = layouts_,
        dimensions = dimensions_ || {},
        width = dimensions.width,
        height = dimensions.height;
    if (!height || !width) {
        return error(dimensions);
    }
    layouts = subset(layouts, dimensions);
    // if all layouts are too big return none
    // otherwise, sort by below comparator
    var length = layouts.length;
    if (!length) {
        return none(dimensions);
    } else if (length === 1) {
        return layouts[0];
    } else {
        return last(sort(layouts, comparator(dimensions)));
    }
}

function comparator(dimensions) {
    return function (a, b) {
        var curriedWithinAspect,
            aDimensionRange,
            bDimensionRange,
            aNonScalingDimension,
            bNonScalingDimension,
            aMaxDimension,
            bMaxDimension,
            aMinDimension,
            bMinDimension,
            aNonScalingValue,
            bNonScalingValue,
            aRange,
            bRange,
            aSpecificity,
            bSpecificity,
            aScalingAmount = scale(a, dimensions),
            bScalingAmount = scale(b, dimensions),
            aCovers = coverage(a, dimensions),
            bCovers = coverage(b, dimensions),
            aScalingDistance = under1(aScalingAmount),
            bScalingDistance = under1(bScalingAmount);
        if (aCovers !== bCovers && !withinRange(aCovers / bCovers, constants.MIN_COVER_ERROR, constants.MAX_COVER_ERROR)) {
            // whichever covers the most wins
            return aCovers > bCovers;
        } else if (aScalingDistance !== bScalingDistance) {
            // whichever one needs to scale the least wins
            return aScalingDistance > bScalingDistance;
        } else {
            // account for user conflicts
            // organize by specificity / lack of a range
            aSpecificity = specificity(a);
            bSpecificity = specificity(b);
            if (aSpecificity !== bSpecificity) {
                return aSpecificity > bSpecificity;
            }
            aNonScalingDimension = nonScalingDimension(a, dimensions);
            bNonScalingDimension = nonScalingDimension(b, dimensions);
            aMaxDimension = max[aNonScalingDimension](a);
            bMaxDimension = max[bNonScalingDimension](b);
            aMinDimension = min[aNonScalingDimension](a);
            bMinDimension = min[bNonScalingDimension](b);
            aRange = range[aNonScalingDimension](a);
            bRange = range[bNonScalingDimension](b);
            aNonScalingValue = dimensions[aNonScalingDimension];
            bNonScalingValue = dimensions[bNonScalingDimension];
            aDimensionRange = Math.min(aMaxDimension - aNonScalingValue, aNonScalingValue - aMinDimension) / aRange;
            bDimensionRange = Math.min(bMaxDimension - bNonScalingValue, bNonScalingValue - bMinDimension) / bRange;
            if (aDimensionRange !== bDimensionRange) {
                return aDimensionRange >= bDimensionRange;
            }
            // account for non_scaling range first
            // if the delta from 1 is the same, the layout that scales down wins
            return aScalingAmount > bScalingAmount;
        }
    };
}