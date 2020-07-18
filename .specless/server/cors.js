const cors = require('cors');
const options = {
    origin: true,
    methods: [
        'GET',
        'PUT',
        'POST'
    ],
    allowedHeaders: [
        'Accept',
        'Authorization',
        'Content-Type',
        'X-Requested-With'
    ],
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = cors(options)