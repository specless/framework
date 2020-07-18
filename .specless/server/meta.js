const path = require('path');
const importFresh = require('import-fresh');

module.exports = (req, res) => {
    const filepath = path.resolve(__dirname, `../../build/data.meta.json`);
    const projPath = path.resolve(__dirname, `../../`);
    const meta = importFresh(filepath);
    meta.__localPath = projPath;
    res.type('.json');
    res.status(200).send(meta);
}