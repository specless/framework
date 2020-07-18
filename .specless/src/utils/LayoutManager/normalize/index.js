module.exports = normalize;
var baseline = require('../baseline')();
var toNumber = require('@timelaps/to/number');
var JSONparse = require('@timelaps/json/parse');
var JSONcouldBe = require('@timelaps/json/could-be');
var isNan = require('@timelaps/is/nan');
var isArray = require('@timelaps/is/array');
var clamp = require('@timelaps/number/clamp');
var map = require('@timelaps/n/map');
var wraptry = require('@timelaps/fn/wrap-try');
var reduce = require('@timelaps/array/reduce');
var isString = require('@timelaps/is/string');
var keywords = {
    none: true,
    any: true,
    '': true
};

function normalize(key, value_) {
    var coerced, second, first, value = value_,
        values = [].concat(value),
        length = values.length;
    if (length === 1 && isString(values[0]) && values[0][0] !== '[') {
        value = values[0].trim();
        value = value.replace(/\-/igm, ' ');
        values = value.split(/\s+/igm);
        length = values.length;
        removeComma(values, 0);
        removeComma(values, 1);
    }
    if (length > 1) {
        first = toNumber(values[0]);
        second = toNumber(values[1]);
    } else if (!length) {
        value = baseline[key];
        first = value[0];
        second = value[1];
    } else {
        coerced = parseValue(key, values[0]);
        first = coerced[0];
        second = coerced[1];
    }
    return [normalizeSingleton(key, first, 0), normalizeSingleton(key, second, 1)];
}

function removeComma(list, index) {
    var value = list[index];
    if (value) {
        value = value.split(',').join('');
        list[index] = value;
    }
}

function parseValue(key, value) {
    return wraptry(function () {
        // valid json "[#, #]", "#"
        var val = JSONparse(value);
        return isArray(val) ? expandArray(val) : [val, val];
    }, function () {
        // not valid "[#, any]"
        return customstringparse(key, value);
    });
}

function expandArray(value) {
    return value.length === 1 ? [value[0], value[0]] : value.slice(0, 2);
}

function customstringparse(key, value_) {
    // does not have brackets
    var value = value_ || '';
    var internals = value.slice(1, value.length - 1);
    var split = internals.split(',').concat(['any']);
    // only do the first 2
    return reduce(split.slice(0, 2), parseSingleton, []);
}

function parseSingleton(memo, item) {
    if (keywords[item.trim()]) {
        memo.push(NaN);
    } else {
        memo.push(toNumber(item));
    }
    return memo;
}

function normalizeSingleton(key, value_, index) {
    // for scalepower
    var first = baseline[key][0];
    var value = value_ === value_ ? value_ : baseline[key][index];
    return clamp(parseFloat(value, 10), first, baseline[key][1] || first);
}