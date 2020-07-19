import React from './modules/specless.react.js';
import * as utils from './modules/specless.utils.js';
import * as components from './modules/specless.components.js';
import panelModules from '@specless/panels';
const CONFIG = require('@specless/config');
const platform = require('./../../specless.json');
const defaultData = require('@specless/data');

const panels = {};
for (let key in panelModules) {
    panels[key] = panelModules[key].config || {};
    panels[key].id = key;
    if (!panels[key].layouts) {
        panels[key].layouts = []
    }
    if (!panels[key].title) {
        panels[key].title = panels[key].id
    }

    if (!panels[key].clickThroughs) {
        panels[key].clickThroughs = {}
    }

    if (!panels[key].trackers) {
        panels[key].trackers = {}
    }

    if (!panels[key].dimensions) {
        panels[key].dimensions = {}
    }

    if (!panels[key].timers) {
        panels[key].timers = {}
    }
}

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
    panels,
    settingsSchema: []
}