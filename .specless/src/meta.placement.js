const CONFIG = require('@specless/config');
const CONFIG = require('@specless/config');
const platform = require('./../../specless.json');
const defaultData = require('@specless/data');

export const meta = {
    type: PROJECT_TYPE,
    libraryBuild: LIBRARY_BUILD,
    libraryRoot: LIBRARY_ROOT,
    buildId: BUILD_ID,
    buildHash: BUILD_HASH,
    serverRoot: SERVER_ROOT,
    settings: {
        general: {
            name: PROJECT_NAME
        },
        specs: CONFIG.specs,
        exits: CONFIG.exits,
        trackers: CONFIG.trackers
    },
    fieldsets: CONFIG.fieldsets,
    views: CONFIG.views,
    platform,
    defaultData,
    settingsSchema: []
}