// var b = require('@timelaps/batterie');
// var normalize = require('.');
// var baseline = require('../baseline')();
// b.describe('create/normalize', function () {
//     b.expect(normalize).toThrow();
//     runFor('width');
//     runFor('height');
//     runFor('scale');

//     function runFor(key) {
//         b.it('expands layout inputs for ' + key, function (t) {
//             var base = baseline[key];
//             var first = base[0];
//             var second = base[1];
//             t.expect(normalize(key, '')).toEqual(base);
//             t.expect(normalize(key, [])).toEqual(base);
//             t.expect(normalize(key, '0')).toEqual([first, first]);
//             t.expect(normalize(key, '5')).toEqual([5, 5]);
//             t.expect(normalize(key, 5)).toEqual([5, 5]);
//             t.expect(normalize(key, '[5]')).toEqual([5, 5]);
//             t.expect(normalize(key, [5])).toEqual([5, 5]);
//             var baseline50 = [first, 50];
//             t.expect(normalize(key, '[none, 50]')).toEqual(baseline50);
//             t.expect(normalize(key, '[any, 50]')).toEqual(baseline50);
//             t.expect(normalize(key, ['none', 50])).toEqual(baseline50);
//             t.expect(normalize(key, ['any', 50])).toEqual(baseline50);
//             t.expect(normalize(key, 'any 50')).toEqual(baseline50);
//             t.expect(normalize(key, 'any, 50')).toEqual(baseline50);
//             t.expect(normalize(key, 'any-50')).toEqual(baseline50);
//             t.expect(normalize(key, 'any - 50')).toEqual(baseline50);
//             var baseline50min = [50, second];
//             t.expect(normalize(key, '[50, none]')).toEqual(baseline50min);
//             t.expect(normalize(key, [50, 'none'])).toEqual(baseline50min);
//             t.expect(normalize(key, '[50, any]')).toEqual(baseline50min);
//             t.expect(normalize(key, [50, 'any'])).toEqual(baseline50min);
//             t.expect(normalize(key, '50 any')).toEqual(baseline50min);
//             t.expect(normalize(key, '50, any')).toEqual(baseline50min);
//             t.expect(normalize(key, '50-any')).toEqual(baseline50min);
//             t.expect(normalize(key, '50 - any')).toEqual(baseline50min);
//         }, 23);
//     }
// });

describe('layout', function () {
  it('is an object', function () {
    expect(true).toBe(false);
  });
});