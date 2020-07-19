import React, { h } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'preact-render-to-string';
import * as utils from './modules/specless.utils.js';
import * as components from '@specless/components';
import { JssProvider, SheetsRegistry } from 'react-jss';

console.log(LIBRARY_ROOT, SERVER_ROOT, LIBRARY_BUILD);

export const renderPanel = (csf, Panel, renderTarget, settings) => {
    const { Controller } = components;
    const { panel, constants, data } = settings;
    if (!panel.config) {
        panel.config = {
            name: '',
            defaultWidth: 300,
            defaultHeight: 250,
            layouts: [],
            exits: {},
            trackers: {},
            timers: {},
            dimensions: {}
        }
    }

    if (!settings._namespace) {
        settings._namespace = `specless-${Math.random().toString(36).substring(2, 4) + Math.random().toString(36).substring(2, 4)}--`;
    }

    if (!panel.config.defaultWidth) {
        panel.config.defaultWidth = 300
    }

    if (!panel.config.defaultHeight) {
        panel.config.defaultHeight = 250
    }

    if (!panel.config.layouts) {
        panel.config.layouts = []
    }

    if (!panel.initialWidth) {
        panel.initialWidth = panel.config.defaultWidth
    }

    if (!panel.initialHeight) {
        panel.initialHeight = panel.config.defaultHeight
    }

    if (!panel.stylesheets) {
        panel.stylesheets = []
    }

    if (!panel.scripts) {
        panel.scripts = []
    }
    
    if (!constants.serverRoot) {
        constants.serverRoot = SERVER_ROOT;
    }

    if (constants.templateBuild) {
        if (!constants.templateRoot) {
            constants.templateRoot = `${constants.serverRoot}/builds/${constants.templateBuild}`
        }
        
        if (!constants.templateAssetsPath) {
            constants.templateAssetsPath = `${constants.templateRoot}/assets`
        }

        if (!constants.templateDynamicDataUrl) {
            constants.templateDynamicDataUrl = `${constants.templateRoot}/data/dynamic`
        }
    }
    
    if (!constants.csfUrl) {
        if (CSF_URL) {
            constants.csfUrl = CSF_URL
        }
    }

    if (!constants.templateLibraryRoot) {
        if (LIBRARY_ROOT) {
            constants.templateLibraryRoot = LIBRARY_ROOT
        } else if (LIBRARY_BUILD) {
            constants.templateLibraryBuild = LIBRARY_BUILD;
            const serverRoot = constants.serverRoot || SERVER_ROOT;
            constants.templateLibraryRoot = `${serverRoot}/builds/${LIBRARY_BUILD}`;
        } else {
            constants.templateLibraryRoot = constants.templateRoot || '';
        }
    }

    if (renderTarget === 'ssr') {
        const stylesheets = new SheetsRegistry();
        panel.ssr = true;
        const html = render(<JssProvider classNamePrefix={settings._namespace} registry={stylesheets}><Controller {...settings} csf={csf} PanelComponent={Panel}/></JssProvider>);
        return '<!DOCTYPE html>' + html.replace('%%%STYLESHEETS%%%', stylesheets.toString());
    } else {
        if (panel.ssr) {
            panel.fromSSR = true
        }
        panel.ssr = false;
        const root = renderTarget;
        const panelRoot = document.getElementById(`specless-panel-${panel.id}`);
        ReactDOM.render(<JssProvider classNamePrefix={settings._namespace}><Controller {...settings} PanelComponent={Panel} csf={csf}/></JssProvider>, root, panelRoot)
    }
}