module.exports = fitMany;
var filter = require('@timelaps/array/filter');
var fit = require('../');

function fitMany(layouts_, dimensions) {
    // fill out optional data
    return filter(layouts_, function (layout) {
        return fit(layout, dimensions);
    });
}