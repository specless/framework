const path = require('path');
const fetchData = require('./fetch-data');
const { BUILD_PATH, DEMO_DATA } = require('../constants');

module.exports = (req, res) => {
    const { type } = req.params;
    if (type === 'dynamic') {
        fetchData(req, res);
    } else {
        const filepath = path.resolve(BUILD_PATH, DEMO_DATA);
        res.sendFile(filepath);
    }
}