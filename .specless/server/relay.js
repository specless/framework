const printMessage = require('print-message');
const open = require('open');

const { OPEN_BROWSER_ON_LAUNCH } = require('../constants');
module.exports = (req, res) => {
    const sessionToken = req.app.get('sessionToken');
    const socket = req.app.get('socketio');
    const message = req.body;
    req.app.set(`${message.process}-started`, true);
    if (req.app.get('webpack-started')) {
        socket.emit('webpack', message);
    }
    if (req.app.get('panels-started') && req.app.get('specless-started') && !req.app.get('webpack-started')) {
        req.app.set('webpack-started', true);
        const url = `https://specless.app/localhost/${sessionToken}`
        setTimeout(() => {
            printMessage([
                'Specless Development Server is Ready!',
                '',
                'Open the following url in your browser to get started:',
                '',
                url
            ]);
            if (OPEN_BROWSER_ON_LAUNCH) {
                open(url)
            }
        }, 1000)
    }
    res.status(200).end();
}