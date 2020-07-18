const fs = require('fs');
const path = require('path');
const { DEMO_DATA } = require('../constants');

module.exports = (req, res) => {
    console.log(req.body);
    const demoData = JSON.stringify(req.body,null, 2);
    fs.writeFileSync( DEMO_DATA , demoData);
    res.status(200).send(demoData);
}