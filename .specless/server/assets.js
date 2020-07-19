const path = require('path');
const { BUILD_PATH } = require('../constants');

module.exports = (req, res) => {
    const file = req.params.file;
    res.sendFile(path.resolve(BUILD_PATH, file));
}