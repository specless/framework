module.exports = create;
var constants = require('../constants');
var assign = require('@timelaps/object/assign');
var forEach = require('@timelaps/n/for/each');
var baseline = require('../baseline');
var normalize = require('../normalize');
var dimensions = ['width', 'height'];
var checkable = dimensions.concat(['scale']);
var camelCase = require('@timelaps/string/case/camel');

function create(options) {
    var layout = extendedBaseline(options);
    forEach(checkable, function (key) {
        layout[key] = normalize(key, layout[key]);
    });
    forEach(dimensions, function (key) {
        var min = camelCase('min-' + key);
        var max = camelCase('max-' + key);
        layout[min] = normalize(key, layout[min])[0];
        layout[max] = normalize(key, layout[max])[1];
    });
    return layout;
}

function extendedBaseline(options) {
    return assign(baseline(), options);
}