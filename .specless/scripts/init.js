const fs = require('fs');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '../../');
const SETTINGS_FILE = path.join(ROOT_PATH, 'specless.json');

if (!fs.existsSync(SETTINGS_FILE)) {
    require('./setup.js');
}