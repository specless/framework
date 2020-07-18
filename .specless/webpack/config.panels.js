const config = require('./config.web.js');
const path = require('path');
const fs = require('fs');
const JsonSchemaData = require('./plugins/JsonSchemaData.js');
const GenerateMetaData = require('./plugins/GenerateMetaData.js');
const SocketRelay = require('./plugins/SocketRelay');
const CONSTANTS = require('./../constants');

module.exports = (env, args) => {
    const PANELS = {};
    fs.readdirSync(CONSTANTS.PANELS).forEach((panel) => {
        const name = panel.replace('.js', '');
        PANELS[`panel.${name}`] = path.resolve(__dirname, `../../src/panels/${panel}`);
    })
    
    config.resolve.alias['react'] = path.resolve(__dirname, '../src/modules/panel.react.js');
    config.resolve.alias['react-dom'] = path.resolve(__dirname, '../src/modules/panel.react-dom.js');
    config.resolve.alias['@specless/components'] = path.resolve(__dirname, '../src/modules/panel.components.js');
    config.resolve.alias['@specless/utils'] = path.resolve(__dirname, '../src/modules/panel.utils.js');

    config.entry = PANELS;
    
    config.entry['specless.VideoPlayer'] = path.resolve(__dirname, '../src/components/dynamic/VideoPlayer.js');
    config.entry['specless.Carousel'] = path.resolve(__dirname, '../src/components/dynamic/Carousel.js');
    
    
    config.entry['data.meta'] = path.resolve(__dirname, '../src/meta.template.js');
    config.entry['data.fetch'] = path.resolve(__dirname, '../../src/meta/fetchData.js');
    config.output.library = 'SPECLESS_PANEL_COMPONENT';
    config.plugins.push(new JsonSchemaData());
    config.plugins.push(new GenerateMetaData());
    if (args.mode === 'development') {
        config.plugins.push(new SocketRelay({
            process: 'panels'
        }));
    }
    return config;
}