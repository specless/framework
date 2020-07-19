const { PROJECT_TYPE } = require('./../constants');
if (PROJECT_TYPE === 'template') {
    module.exports = require('./config.panels');
} else if (PROJECT_TYPE === 'placement') {
    module.exports = require('./config.placement');
}