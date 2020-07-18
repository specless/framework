module.exports = distillList;
var isString = require('@timelaps/is/string');

function distillList(layout, key_) {
    var list = isString(key_) ? layout[key_] : key_;
    return list && list.length === 1 ? [list[0], list[0]] : list || [1, 'none'];
}