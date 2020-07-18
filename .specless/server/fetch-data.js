const importFresh = require('import-fresh');
const path = require('path');
const buildDir = path.resolve(__dirname, '../../build');
const axios = require('axios');

module.exports = (req, res) => {
    const dynamicData = importFresh(buildDir + '/__ssr.data.fetch.js');
    const { settings, fallbackData } = dynamicData;
    const fetchData = dynamicData.default;
    const requestData = req.headers['x-specless-dynamic-data'];
    
    fetchData(requestData, req, axios).then((data) => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send(fallbackData);
    })

}