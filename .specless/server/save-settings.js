const fs = require('fs');
const { SETTINGS } = require('../constants');

module.exports = (req, res) => {
    const settingsData = JSON.stringify(req.body,null, 2);
    fs.writeFileSync(SETTINGS, settingsData);
    res.status(200).send(settingsData);
}