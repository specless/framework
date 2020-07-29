const generateBaseConfig = require('./generateBaseConfig.js');
const path = require('path');
const fs = require('fs');
const JsonSchemaData = require('./plugins/JsonSchemaData.js');
const GenerateMetaData = require('./plugins/GenerateMetaData.js');
const allPanelsModule = path.resolve(__dirname, '../.tmp/all-panels.js');
const { PANEL_MODULES, DYNAMIC_DATA_MODULE, TEMPLATE_META_ENTRY } = require('./../constants');

module.exports = (env, args) => {
    const config = generateBaseConfig('panels', env, args);
    const allPanelsModuleString = require('./generatePanelsModule')(PANEL_MODULES);
    fs.writeFileSync(allPanelsModule, allPanelsModuleString);
    for (let key in PANEL_MODULES) {
        config.entry[`panel.${key}`] = PANEL_MODULES[key];
        config.resolve.alias[`@panels/${key}`] = PANEL_MODULES[key];
    }
    config.resolve.alias['@specless/panels'] = allPanelsModule;
    
    config.entry['data.meta'] = TEMPLATE_META_ENTRY;
    config.entry['data.fetch'] = DYNAMIC_DATA_MODULE;

    config.output.library = 'SPECLESS_PANEL_COMPONENT';
    config.plugins.push(new GenerateMetaData());
    config.plugins.push(new JsonSchemaData());

    return config
}

// module.exports = (env, args) => {
//     const allPanelsModuleString = require('./generatePanelsModule')(PANEL_MODULES);
//     fs.writeFileSync(allPanelsModule, allPanelsModuleString);
//     config.entry = {};
//     for (let key in PANEL_MODULES) {
//         config.entry[`panel.${key}`] = PANEL_MODULES[key];
//         config.resolve.alias[`@panels/${key}`] = PANEL_MODULES[key];
//     }

//     fs.readdirSync(MODULES).forEach((folder) => {
//         config.resolve.alias[`@specless/${folder}`] = path.resolve(MODULES, `${folder}/${PROCESS}.js`)   
//     })
    
//     fs.readdirSync(DYNAMIC_MODULES).forEach((file) => {
//         const name = file.replace('.js', '');
//         config.entry[`specless.${name}`] = path.join(DYNAMIC_MODULES, file);
//     })

//     config.resolve.alias['react'] = path.resolve(__dirname, '../src/modules/panel.react.js');
//     config.resolve.alias['react-dom'] = path.resolve(__dirname, '../src/modules/panel.react-dom.js');
//     config.resolve.alias['@specless/components'] = path.resolve(__dirname, '../src/modules/panel.components.js');
//     config.resolve.alias['@specless/panels'] = allPanelsModule;
//     config.resolve.alias['@specless/utils'] = path.resolve(__dirname, '../src/modules/panel.utils.js');
//     config.entry['data.meta'] = path.resolve(__dirname, '../src/meta.template.js');
//     config.entry['data.fetch'] = DYNAMIC_DATA_MODULE;
//     config.output.library = 'SPECLESS_PANEL_COMPONENT';
//     config.plugins.push(new JsonSchemaData());
//     config.plugins.push(new GenerateMetaData());
//     if (args.mode === 'development') {
//         config.plugins.push(new SocketRelay({
//             process: 'panels'
//         }));
//     }
//     return config;
// }