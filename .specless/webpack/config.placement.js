const generateBaseConfig = require('./generateBaseConfig.js');
const { PLACEMENT_MODULE, PLACEMENT_META_ENTRY } = require('./../constants');
const JsonSchemaData = require('./plugins/JsonSchemaData.js');
const GenerateMetaData = require('./plugins/GenerateMetaData');


module.exports = (env, args) => {
    const config = generateBaseConfig('placement', env, args);
    config.entry['data.meta'] = PLACEMENT_META_ENTRY;
    config.entry['index'] = PLACEMENT_MODULE;
    config.output.library = 'SPECLESS_PLACEMENT';
    config.plugins.push(new GenerateMetaData());
    config.plugins.push(new JsonSchemaData());
    return config
}

// module.exports = (env, args) => {
//     config.entry = {
//         ['data.meta']: path.resolve(__dirname, '../src/meta.placement.js'),
//         ['index']: PLACEMENT_MODULE,
//         ['slot.tag'] : path.resolve(__dirname, '../src/demo-page/tag.js'),
//         ['specless.parseVast'] : path.resolve(__dirname, '../src/utils/dynamic/parseVast.js')
//     }
//     config.output.library = 'SPECLESS_PLACEMENT';
//     config.plugins.push(new JsonSchemaData());


//     fs.readdirSync(MODULES).forEach((folder) => {
//         config.resolve.alias[`@specless/${folder}`] = path.resolve(MODULES, `${folder}/${PROCESS}.js`)   
//     })

//     fs.readdirSync(DYNAMIC_MODULES).forEach((file) => {
//         const name = file.replace('.js', '');
//         config.entry[`specless.${name}`] = path.join(DYNAMIC_MODULES, file);
//     })

//     config.output.library = 'SPECLESS_PLACEMENT';
//     config.plugins.push(new JsonSchemaData());
//     config.plugins.push(new GenerateMetaData());
//     if (args.mode === 'development') {
//         config.plugins.push(new SocketRelay({
//             process: 'placements'
//         }));
//     }
//     return config;
// }