const config = require('./config.web.js');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const JsonSchemaData = require('./plugins/JsonSchemaData.js');
const GenerateMetaData = require('./plugins/GenerateMetaData.js');
const SocketRelay = require('./plugins/SocketRelay');
const allPanelsModule = path.resolve(__dirname, '../.tmp/all-panels.js');
const { PANEL_MODULES, DYNAMIC_DATA_MODULE } = require('./../constants');

module.exports = (env, args) => {
    const allPanelsModuleString = require('./generatePanelsModule')(PANEL_MODULES);
    fs.writeFileSync(allPanelsModule, allPanelsModuleString);
    config.entry = {};
    for (let key in PANEL_MODULES) {
        config.entry[`panel.${key}`] = PANEL_MODULES[key];
        config.resolve.alias[`@panels/${key}`] = PANEL_MODULES[key];
    }
    config.resolve.alias['react'] = path.resolve(__dirname, '../src/modules/panel.react.js');
    config.resolve.alias['react-dom'] = path.resolve(__dirname, '../src/modules/panel.react-dom.js');
    config.resolve.alias['@specless/components'] = path.resolve(__dirname, '../src/modules/panel.components.js');
    config.resolve.alias['@specless/panels'] = allPanelsModule;
    config.resolve.alias['@specless/utils'] = path.resolve(__dirname, '../src/modules/panel.utils.js');
    config.entry['specless.VideoPlayer'] = path.resolve(__dirname, '../src/components/dynamic/VideoPlayer.js');
    config.entry['specless.Carousel'] = path.resolve(__dirname, '../src/components/dynamic/Carousel.js');
    config.entry['data.meta'] = path.resolve(__dirname, '../src/meta.template.js');
    config.entry['data.fetch'] = DYNAMIC_DATA_MODULE;
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