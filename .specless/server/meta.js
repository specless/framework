const { BUILD_PATH, META_DATA_OUTPUT_NAME, PROJECT_ROOT } = require('../constants');
const path = require('path');
const importFresh = require('import-fresh');

module.exports = (req, res) => {
    const filepath = path.join(BUILD_PATH, META_DATA_OUTPUT_NAME);
    const projPath = PROJECT_ROOT;
    const meta = importFresh(filepath);
    meta.__localPath = projPath;
    res.type('.json');
    res.status(200).send(meta);
}