const config = require('./config.web.js');
const path = require('path');
const JsonSchemaData = require('./plugins/JsonSchemaData.js');
const GenerateMetaData = require('./plugins/GenerateMetaData.js');
const SocketRelay = require('./plugins/SocketRelay');

module.exports = (env, args) => {
    config.entry = {
        ['data.meta']: path.resolve(__dirname, '../src/meta.placement.js'),
        ['index']: path.resolve(__dirname, '../../src/index.js'),
        ['slot.tag'] : path.resolve(__dirname, '../src/demo-page/tag.js')
    }
    config.output.library = 'SPECLESS_PLACEMENT';
    config.plugins.push(new JsonSchemaData());
    config.plugins.push(new GenerateMetaData());
    if (args.mode === 'development') {
        config.plugins.push(new SocketRelay({
            process: 'placements'
        }));
    }
    return config;
}