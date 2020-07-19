const { DEV_PORT, NGROK, LOCAL_ID } = require('../constants');
const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require('body-parser');
const ngrok = require('ngrok');
const socketio = require('socket.io');

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
app.post('/relay', require('./relay'));

const server = app.listen(DEV_PORT, async () => {
    app.set('sessionToken', LOCAL_ID);
    await ngrok.authtoken(NGROK);
    ngrok.connect({
        addr: DEV_PORT,
        authToken: NGROK,
        subdomain: LOCAL_ID
    }).catch(err => {
        console.error(err);
    })
});

app.set('socketio', socketio(server));




