const { SPECLESS_SETTINGS } = require('./../constants');
const { projectType } = SPECLESS_SETTINGS;

if (projectType === 'template') {
    module.exports = require('./config.specless');
} else if (projectType === 'placement') {
    module.exports = require('./config.demo-pages');
}