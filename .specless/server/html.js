const { 
    BUILD_PATH,
    SSR_MODULE_OUTPUT_NAME,
    SSR_PANEL_MODULE_OUTPUT_PREFIX,
    DEMO_DATA_OUTPUT_NAME,
    DEFAULT_DATA_OUTPUT_NAME
} = require('../constants');
const importFresh = require('import-fresh');
const path = require('path');

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
    const speclessModule = path.join(BUILD_PATH, SSR_MODULE_OUTPUT_NAME);
    const panelModulePath = path.join(BUILD_PATH, `${SSR_PANEL_MODULE_OUTPUT_PREFIX}${panelId}.js`);
    const emptyData = path.join(BUILD_PATH, DEFAULT_DATA_OUTPUT_NAME);
    const defaultData = path.join(BUILD_PATH, DEMO_DATA_OUTPUT_NAME);
    const serverRoot = 'https://' + req.hostname;
    const specless = importFresh(speclessModule);
    const panelModule = importFresh(panelModulePath);
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
    
    if (constants.templateConfig === 'empty') {
        data = importFresh(emptyData)
    }
    const props = {
        constants,
        panel,
        data
    }
    
    const html = specless.renderPanel({}, Panel, renderTarget, props);
    res.type('text/html');
    res.status(200).send(html);
}