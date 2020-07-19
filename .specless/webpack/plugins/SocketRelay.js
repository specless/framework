const axios = require('axios');
const { SOCKET_SERVER } = require('./../../constants');

class SocketRelay {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync('SocketRelay', (compilation, callback) => {
            try {
                const message = {
                    process: this.options.process,
                    type: 'compilation',
                    data: {
                        assets: []
                    }
                }
                for (let key in compilation.assets) {
                    message.data.assets.push({
                        file: key,
                        size: compilation.assets[key].size()
                    })
                }
                axios.post(SOCKET_SERVER, message);
            } catch (err) {
                
            }
            callback();
        })
    }
}

// function SocketRelay(options) {
//     this.options = options;
// };

// SocketRelay.prototype.apply = (compiler) => {
//     compiler.plugin('emit', function(compilation, callback) {
//         console.log(this);
//         const session = importFresh('../../server/.tmp/session.json');
//         const message = {
//             type: 'compilation',
//             data: {
//                 assets: []
//             }
//         }
//         for (let key in compilation.assets) {
//             message.data.assets.push({
//                 file: key,
//                 size: compilation.assets[key].size()
//             })
//         }
//         axios.post(session.server, message);
//         callback()
//     }.bind(this));
// }

module.exports = SocketRelay;