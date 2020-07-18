const fieldsets = require('./../../src/meta/fieldsets');
const views = require('./../../src/meta/views');
const platform = require('./../../specless.json');
const settings = require('./../../src/meta/settings.json');
const settingsSchema = require('./schemas/settings.js');
const defaultData = require('./../../src/meta/data.json');
const { VERSION } = require('../constants.js');

export const meta = {
    libraryBuild: VERSION,
    type: 'placement',
    settings,
    fieldsets,
    views,
    settingsSchema,
    platform,
    defaultData
}