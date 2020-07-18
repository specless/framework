const path = require('path');

module.exports = (req, res) => {
    const file = req.params.file;
    const filepath = path.resolve(__dirname, `../../build/${file}`);
    res.sendFile(filepath);
}