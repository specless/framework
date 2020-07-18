const fs = require('fs');
const path = require('path');
const id = require('./../server/utils/generateKey')();
const buildHashPath = path.resolve(__dirname, './../../.specless.build.json');
const buildHash = JSON.stringify({
    id
})
fs.writeFileSync(buildHashPath, buildHash);
