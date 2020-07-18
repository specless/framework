const path = require('path');
const fetchData = require('./fetch-data');

module.exports = (req, res) => {
    const { type } = req.params;
    if (type === 'dynamic') {
        fetchData(req, res);
    } else {
        const filepath = path.resolve(__dirname, `../../build/data.${type}.json`);
        res.sendFile(filepath);
    }
}