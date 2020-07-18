const { SPECLESS_SETTINGS, SETTINGS } = require('./../constants');
const importFresh = require('import-fresh');
const path = require('path');
const buildDir = path.resolve(__dirname, '../../build');

const parseQuery = (urlParams) => {
    for (let key in urlParams) {
        if (Number(urlParams[key])) {
            urlParams[key] = Number(urlParams[key])
        } else if (urlParams[key] === 'true') {
            urlParams[key] = true
        } else if (urlParams[key] === 'false') {
            urlParams[key] = false
        } else if (urlParams[key] === 'null') {
            urlParams[key] = null
        } else if (urlParams[key] === 'undefined') {
            urlParams[key] = undefined
        } else if (typeof urlParams[key] === 'object' && urlParams[key] !== null) {
            urlParams[key] = parseQuery(urlParams[key])
        }
    }
    return urlParams;
}


module.exports = (req, res) => {
    const panelId = req.params.panel || 'default';
    const speclessModule = buildDir + '/__ssr.specless.run.js';
    const panelModulePath = buildDir + `/__ssr.panel.${panelId}.js`;
    const emptyData = buildDir + '/data.empty.json';
    const defaultData = buildDir + '/data.default.json';
    const serverRoot = 'https://' + req.hostname;
    const specless = importFresh(speclessModule);
    const panelModule = importFresh(panelModulePath);
    const settings = importFresh(SETTINGS);
    const query = parseQuery(req.query);
    const panel = query.panel || {};
    const constants = query.constants || {};
    const data = importFresh(defaultData);
    const renderTarget = 'ssr';
    const Panel = panelModule.Panel;
    panel.config = panelModule.config;
    panel.id = panelId;
    panel.connected;
    panel.layout = {};
    constants.templateRoot = serverRoot;
    constants.templateAssetsPath = `${serverRoot}/assets`;
    constants.templateDynamicDataUrl = `${serverRoot}/data/dynamic`;
    constants.isPreview = true;
    const exits = [];
    const trackers = [];
    
    settings.exits.forEach(exit => {
        exits.push({
            id: exit.id,
            url: `https://specless.app/test-exit?id=${exit.id}&name=${exit.name}`
        })
    })

    settings.trackers.forEach(tracker => {
        trackers.push({
            id: tracker.id,
            urls: []
        })
    })
    
    if (constants.templateConfig === 'empty') {
        data = importFresh(emptyData)
    }
    const props = {
        constants,
        panel,
        data,
        exits,
        trackers
    }
    
    const html = specless.renderPanel({}, Panel, renderTarget, props);
    res.type('text/html');
    res.status(200).send(html);
}