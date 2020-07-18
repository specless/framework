module.exports = distill;
var distillList = require('./list');
var get = require('@timelaps/n/get');
var validWords = {
    any: true,
    none: true
};

function distill(layout, key, index, default_value, expand) {
    var value, list = expand ? distillList(layout, key) : layout[key];
    if (list && list.length > index) {
        value = list[index];
    } else {
        value = default_value;
    }
    if (validWords[value]) {
        value = default_value;
    }
    return value;
}