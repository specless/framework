const { SPECLESS_SETTINGS, NGROK } = require('../constants');
const port = SPECLESS_SETTINGS.devPort || 3232;
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const socketio = require('socket.io');
const fs = require('fs');
const path = require('path');
const tokenPath = path.resolve(__dirname, './session.json');

app.set('webpack-started', false);
app.set('panels-started', false);
app.set('specless-started', false);

app.use(compression());
app.use(require('./cors'));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.get('/html/:panel', require('./html'));
app.get('/assets/:file', require('./assets'));
app.get('/meta', require('./meta'));
app.get('/data/:type', require('./data'));
app.post('/save-data', require('./save-data'));
app.post('/save-settings', require('./save-settings'));
app.post('/relay', require('./relay'));

const server = app.listen(port, async () => {
    let token;
    if (!fs.existsSync(tokenPath)) {
        token = require('./utils/generateKey')();
        fs.writeFileSync(tokenPath, `{"token" : "${token}", "server" : "https://${token}.ngrok.io/relay"}`);
    } else {
        token = require(tokenPath).token;
    }
    app.set('sessionToken', token);
    await ngrok.authtoken(NGROK);
    ngrok.connect({
        addr: port,
        authToken: NGROK,
        subdomain: token
    }).catch(err => {
        console.error(err);
    })
});

app.set('socketio', socketio(server));




