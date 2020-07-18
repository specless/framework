module.exports = render;
var clamp = require('@timelaps/number/clamp');
var round = require('@timelaps/number/round');
var withinAspect = require('../within/aspect');
var withinScale = require('../within/scale');
var tooBig = require('../too-big');
var minAspect = require('../min/aspect');
var maxAspect = require('../max/aspect');
var maxWidth = require('../max/width');
var maxHeight = require('../max/height');
var coverage = require('../coverage');
var aspectDistance = require('../aspect/distance');
var aspectSimilarity = require('../aspect/similarity');
var scale = require('../scale');
/**
 * render process for the layout. returns all pertinant information, precalculated for your convenience
 * @method
 * @param {Object} dimensions to render the layout against
 * @returns {Object}
 * @example {@lang css}
 * @ad-layout (layout-name) {
 *     width: 100 none;
 *     height: 200;
 *     max-scale: 1.2;
 * }
 * @example
 * var result = render(layout, {
 *     width: 300,
 *     height: 250
 * });
 * // {
 * //     scale: 1.2,
 * //     aspectRatio: 0.8,
 * //     coverage: 98,
 * //     fits: false,
 * //     fitsWidth: true,
 * //     fitsHeight: false,
 * //     scaledWidth: 300,
 * //     scaledHeight: 240,
 * //     currentWidth: 250,
 * //     currentHeight: 200,
 * //     aspectSimilarity: 88,
 * //     aspectDistance: 0.9
 * // }
 */
function render(layout, dimensions) {
    var maxAspectValue,
        minAspectValue,
        maxWidthValue,
        maxHeightValue,
        coverageValue,
        aspectDistanceValue,
        aspectSimilarityValue,
        // prove fits
        fits = false,
        fitsWidth = fits,
        fitsHeight = fits,
        scaleValue = scale(layout, dimensions),
        aspectRatio = 0,
        scaledWidth = 0,
        scaledHeight = 0,
        currentWidth = 0,
        currentHeight = 0,
        passed_width = dimensions.width,
        passed_height = dimensions.height,
        passed_aspect = passed_width / passed_height,
        withinAspectValue = withinAspect(layout, passed_aspect),
        withinScaleValue = withinScale(layout, dimensions);
    if (!tooBig(layout, dimensions)) {
        if (withinScaleValue) {
            // disprove fit
            fits = fitsWidth = fitsHeight = !fits;
            aspectRatio = passed_aspect;
            scaledWidth = passed_width;
            scaledHeight = passed_height;
            if (!withinAspectValue) {
                maxAspectValue = maxAspect(layout);
                minAspectValue = minAspect(layout);
                aspectRatio = (passed_aspect > maxAspectValue ? maxAspectValue : minAspectValue);
                fitsWidth = passed_aspect <= maxAspectValue;
                fitsHeight = minAspectValue <= passed_aspect;
                if (fitsHeight) {
                    scaledWidth = scaledHeight * aspectRatio;
                } else {
                    scaledHeight = scaledWidth / aspectRatio;
                }
            }
            currentWidth = scaledWidth / scaleValue;
            currentHeight = scaledHeight / scaleValue;
        } else {
            maxWidthValue = clamp(maxWidth(layout) * scaleValue, 0, passed_width);
            maxHeightValue = clamp(maxHeight(layout) * scaleValue, 0, passed_height);
            aspectRatio = maxWidthValue / maxHeightValue;
            fitsWidth = maxWidthValue === passed_width;
            fitsHeight = maxHeightValue === passed_height;
            fits = fitsWidth && fitsHeight;
            currentWidth = maxWidthValue / scaleValue;
            currentHeight = maxHeightValue / scaleValue;
            scaledWidth = maxWidthValue;
            scaledHeight = maxHeightValue;
        }
    }
    coverageValue = coverage(layout, dimensions);
    aspectDistanceValue = aspectDistance(layout, dimensions);
    aspectSimilarityValue = aspectSimilarity(layout, dimensions);
    scaledWidth = round(scaledWidth, -5);
    scaledHeight = round(scaledHeight, -5);
    currentWidth = round(currentWidth, -5);
    currentHeight = round(currentHeight, -5);
    return {
        fits: fits,
        scale: scaleValue,
        coverage: coverageValue,
        fitsWidth: fitsWidth,
        fitsHeight: fitsHeight,
        aspectRatio: aspectRatio,
        // round so when it is applied as a context
        // it never goes over or under
        // by more than it should
        // as js is want to do
        scaledWidth: scaledWidth,
        scaledHeight: scaledHeight,
        currentWidth: currentWidth,
        currentHeight: currentHeight,
        aspectDistance: aspectDistanceValue,
        aspectSimilarity: aspectSimilarityValue
    };
}