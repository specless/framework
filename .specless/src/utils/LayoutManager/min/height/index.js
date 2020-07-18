module.exports = minHeight;
var distillFirst = require('../../distill/first');

function minHeight(layout) {
    return distillFirst(layout, 'height', 1);
}