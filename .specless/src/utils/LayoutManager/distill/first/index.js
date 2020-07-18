module.exports = distillFirst;
var distill = require('../');

function distillFirst(layout, key, default_value) {
    return distill(layout, key, 0, default_value);
}