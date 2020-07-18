const path = require('path');
const CONSTANTS = {
    FIELDSETS: path.resolve(__dirname, '../src/meta/fieldsets.js'),
    DEMO_DATA: path.resolve(__dirname, '../src/meta/data.json'),
    SETTINGS: path.resolve(__dirname, '../src/meta/settings.json'),
    PANELS: path.resolve(__dirname, '../src/panels'),
    DEMO_PAGES: path.resolve(__dirname, '../src/demo-pages'),
    VIEWS: path.resolve(__dirname, '../src/meta/views.js'),
    SPECLESS_SETTINGS_PATH: path.resolve(__dirname, '../specless.json'),
    DEMO_DATA_OUTPUT_NAME: 'data.default.json',
    DEFAULT_DATA_OUTPUT_NAME: 'data.empty.json',
    META_DATA_OUTPUT_NAME: 'data.meta.json',
    NGROK: '1Xiv0o8jSIoU3ZmGud21JFPIHvJ_7zASUUVRssvXcFn8mJYCz'
}

CONSTANTS.SPECLESS_SETTINGS = require('../specless.json');
CONSTANTS.VERSION = CONSTANTS.SPECLESS_SETTINGS.libraryBuild || null;

module.exports = CONSTANTS