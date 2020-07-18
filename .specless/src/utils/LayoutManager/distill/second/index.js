module.exports = distillSecond;
var distill = require('../');

function distillSecond(layout, key, default_value) {
    return distill(layout, key, 1, default_value, true);
}