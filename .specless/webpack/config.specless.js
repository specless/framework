const generateBaseConfig = require('./generateBaseConfig.js');
const { LIBRARY_ENTRY } = require('./../constants');

module.exports = (env, args) => {
    const config = generateBaseConfig('specless', env, args);
    config.entry = {
        ['specless.run'] : LIBRARY_ENTRY
    }
    config.output.library = 'SPECLESS_RUN';
    return config
}