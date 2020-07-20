const fs = require('fs');
const path = require('path');

const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
 
const id = makeid(9);
const buildHashPath = path.resolve(__dirname, './../../.specless.build.json');
const buildHash = JSON.stringify({
    id
})
fs.writeFileSync(buildHashPath, buildHash);