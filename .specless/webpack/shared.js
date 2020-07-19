const { PROJECT_TYPE } = require('./../constants');
if (PROJECT_TYPE === 'template') {
    module.exports = require('./config.specless');
} else if (PROJECT_TYPE === 'placement') {
    module.exports = require('./config.demo-pages');
}