const { SPECLESS_SETTINGS } = require('./../constants');
const { projectType } = SPECLESS_SETTINGS;

if (projectType === 'template') {
    module.exports = require('./config.panels');
} else if (projectType === 'placement') {
    module.exports = require('./config.placement');
}