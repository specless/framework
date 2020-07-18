// var b = require('@timelaps/batterie');
var closest = require('.');
var constants = require('../constants');
var coverage = require('../coverage');
var specificity = require('../specificity');
var scale = require('../scale');
var create = require('../create');
var under1 = require('@timelaps/number/under1');
describe('closest', function () {
    // expect(closest).not.toThrow();
    it('will return error if there is no size given', function () {
        expect(closest()).toEqual(create({
            id: 'error',
            height: [1, 1],
            width: [1, 1],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE],
            scalePower: [1, 1]
        }));
    });
    it('will return none if there are no layouts given', function () {
        expect(closest(null, {
            width: 1,
            height: 1
        })).toEqual(create({
            id: 'none',
            height: [1, 1],
            width: [1, 1],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE],
            scalePower: [1, 1]
        }));
    });
    it('will pass back the height and width values in the none', function () {
        expect(closest(null, {
            width: 321,
            height: 123
        })).toEqual(create({
            id: 'none',
            height: [123],
            width: [321],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        }));
    });
    it('will always choose the singular layout', function () {
        var layout1 = create({
            id: 'layout1',
            height: [1000],
            width: [1000],
            scale: [0.4, 3]
        });
        expect(closest([layout1], {
            height: 500,
            width: 500
        })).toEqual(layout1);
    });
    it('will not choose any layouts if the scale to match it is too small', function () {
        expect(closest([{
            id: 'layout1',
            height: [1000],
            width: [1000]
        }], {
            height: 10,
            width: 10
        })).toEqual(create({
            id: 'none',
            height: [10],
            width: [10],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        }));
    });
    it('will choose any layouts even if it is unable fill the size', function () {
        expect(closest([{
            id: 'layout1',
            height: [1000],
            width: [1000],
            scale: [1]
        }], {
            width: 2000,
            height: 2000
        })).toEqual(create({
            id: 'layout1',
            height: [1000],
            width: [1000],
            scale: [1]
        }));
    });
    it('will first choose the layout that offers the most coverage', function () {
        // closest aspect ratio
        expect.assertions(4);
        var layout1 = {
            id: 'layout1',
            height: [100],
            width: [300]
        };
        var layout2 = {
            id: 'layout2',
            height: [100],
            width: [299]
        };
        var layoutResult1 = create({
            id: 'layout1',
            height: [100],
            width: [300],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        });
        var layoutResult2 = create({
            id: 'layout2',
            height: [100],
            width: [299],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        });
        var manyLayouts = [layout2, layout1];
        expect(closest(manyLayouts, {
            height: 100,
            width: 600
        })).toEqual(layoutResult1);
        expect(closest(manyLayouts, {
            height: 200,
            width: 300
        })).toEqual(layoutResult2);
        expect(closest(manyLayouts, {
            height: 100,
            width: 150
        })).toEqual(layoutResult2);
        expect(closest(manyLayouts, {
            height: 50,
            width: 300
        })).toEqual(layoutResult1);
    });
    it('after the most coverage it will go after the smallest scaling value', function () {
        // least scaling from same aspect coverage
        expect.assertions(5);
        var layout1 = {
            id: 'layout1',
            height: [200],
            width: [200]
        };
        var layout2 = {
            id: 'layout2',
            height: [400],
            width: [400]
        };
        var layouts = [layout1, layout2];
        var layoutResult1 = create({
            id: 'layout1',
            height: [200],
            width: [200],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        });
        var layoutResult2 = create({
            id: 'layout2',
            height: [400],
            width: [400],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        });
        var scale1 = scale(layout1, {
            width: 300,
            height: 300
        });
        var scale2 = scale(layout2, {
            width: 300,
            height: 300
        });
        expect(under1(scale1)).toBeLessThan(under1(scale2));
        expect(scale2).toBeLessThan(1);
        expect(scale1).toBeGreaterThan(1);
        expect(closest(layouts, {
            width: 300,
            height: 300
        })).toEqual(layoutResult2);
        expect(closest(layouts, {
            width: 250,
            height: 250
        })).toEqual(layoutResult1);
    });
    it('will check layout specificity when the scaling and aspect values are the same', function () {
        expect.assertions(5);
        var layout1 = {
            id: 'layout1',
            height: [200],
            width: [200]
        };
        var layout2 = {
            id: 'layout2',
            height: [199, 200],
            width: [200]
        };
        var layoutResult1 = create({
            id: 'layout1',
            height: [200],
            width: [200],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        });
        var layoutsGroup1 = [layout1, layout2];
        var layoutsGroup2 = [layout2, layout1];
        expect(specificity(layout1)).toBeGreaterThan(specificity(layout2));
        expect(closest(layoutsGroup1, {
            width: 200,
            height: 400
        })).toEqual(layoutResult1);
        expect(closest(layoutsGroup2, {
            width: 200,
            height: 400
        })).toEqual(layoutResult1);
        expect(closest(layoutsGroup1, {
            width: 100,
            height: 200
        })).toEqual(layoutResult1);
        expect(closest(layoutsGroup2, {
            width: 100,
            height: 200
        })).toEqual(layoutResult1);
    });
    it('must not be passed two layouts with the same dimensions otherwise it will choose the one that is last', function () {
        expect.assertions(2);
        var layout1 = {
            id: 'layout1',
            height: [200],
            width: [200],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        };
        var layout2 = {
            id: 'layout2',
            height: [200],
            width: [200],
            scale: [constants.MIN_SCALE, constants.MAX_SCALE]
        };
        var layoutSeries1 = [layout1, layout2];
        var layoutSeries2 = [layout2, layout1];
        var dimensions = {
            height: 200,
            width: 200
        };
        expect(closest(layoutSeries1, dimensions)).toEqual(create(layout2));
        expect(closest(layoutSeries2, dimensions)).toEqual(create(layout1));
    });
    it('can filter out layouts at the beginning with min and max heights and widths', function () {
        var layout1 = {
            id: 'layout1',
            height: 200,
            width: 200,
            minWidth: 600
        };
        var layout2 = {
            id: 'layout2',
            height: 600,
            width: 600,
            maxWidth: 200
        };
        var layout3 = {
            id: 'layout3',
            height: 600,
            width: 200,
            minHeight: 600
        };
        var layout4 = {
            id: 'layout4',
            height: 200,
            width: 600,
            maxHeight: 200
        };
        var dimensions = {
            height: 400,
            width: 400
        };
        expect(closest([ //
            layout1, layout2, layout3, layout4
        ], dimensions)).toEqual(create({
            id: 'none',
            height: dimensions.height,
            width: dimensions.width
        }));
    });
});