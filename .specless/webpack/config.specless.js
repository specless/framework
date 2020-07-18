const config = require('./config.web.js');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SocketRelay = require('./plugins/SocketRelay');
module.exports = (env, args) => {
    config.entry = {
        ['specless.run'] : path.resolve(__dirname, '../src/index.js')
    }
    
    config.output.library = 'SPECLESS_RUN';
    if (args.mode === 'development') {
        config.plugins.push(new SocketRelay({
            process: 'specless'
        }));
    }
    return config
}