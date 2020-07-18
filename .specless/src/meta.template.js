import React from './modules/specless.react.js';
import * as utils from './modules/specless.utils.js';
import * as components from './modules/specless.components.js';
import panelModules from './../../src/panels';
const fieldsets = require('./../../src/meta/fieldsets');
const views = require('./../../src/meta/views');
const platform = require('./../../specless.json');
const settings = require('./../../src/meta/settings.json');
const settingsSchema = require('./schemas/settings.js');
const defaultData = require('./../../src/meta/data.json');
const { VERSION } = require('../constants.js');

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
    libraryBuild: VERSION,
    type: 'template',
    panels,
    settings,
    fieldsets,
    views,
    settingsSchema,
    platform,
    defaultData
}