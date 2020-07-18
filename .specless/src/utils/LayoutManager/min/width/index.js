module.exports = minWidth;
var distillFirst = require('../../distill/first');

function minWidth(layout) {
    return distillFirst(layout, 'width', 1);
}