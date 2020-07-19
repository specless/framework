const path = require('path');
const settings = require('../specless.json');

const PROJECT_ROOT = path.resolve(__dirname, '../');

const LOCAL_ID = path.basename(PROJECT_ROOT);

const BUILD_HASH = require('../.specless.build.json').id;

const PANEL_MODULES = {};
if (settings.panels) {
    for (let key in settings.panels) {
        PANEL_MODULES[key] = path.join(PROJECT_ROOT, settings.panels[key]);
    }
}

const DEMO_PAGE_MODULES = [];
if (settings.demoPages) {
    for (let key in settings.demoPages) {
        DEMO_PAGE_MODULES[key] = path.join(PROJECT_ROOT, settings.demoPages[key]);
    }
}

const BUILD_PATH = path.join(PROJECT_ROOT, '/build');

const DEMO_DATA = path.join(PROJECT_ROOT, settings.dataJson || '/src/data/data.json');

const CONFIG_MODULE = path.join(PROJECT_ROOT, settings.configModule || '/src/config/index.js');

const DYNAMIC_DATA_MODULE = path.join(PROJECT_ROOT, settings.dynamicDataModule || '/src/data/fetch-data.js');

const PLACEMENT_MODULE = path.join(PROJECT_ROOT, settings.placementModule || '/src/placement.js');

const ASSETS_FOLDER = path.join(PROJECT_ROOT, settings.assetsFolder || '/src/assets');

const DEMO_DATA_OUTPUT_NAME = 'data.default.json';

const DEFAULT_DATA_OUTPUT_NAME = 'data.empty.json';

const META_DATA_OUTPUT_NAME = 'data.meta.json';

const SSR_MODULE_OUTPUT_NAME = '__ssr.specless.run.js';

const SSR_PANEL_MODULE_OUTPUT_PREFIX = '__ssr.panel.';

const PROJECT_TYPE = settings.projectType || 'template';

const DEV_PORT = settings.devPort || 3232;

const OPEN_BROWSER_ON_LAUNCH = settings.openBrowserOnLaunch || false;

const NGROK = '1Xiv0o8jSIoU3ZmGud21JFPIHvJ_7zASUUVRssvXcFn8mJYCz';

const PROJECT_NAME = settings.name || 'Untitled Project';

const LIBRARY_BUILD = settings.libraryBuild || null;

const LIBRARY_ROOT = settings.libraryRoot || null;

const CSF_URL = settings.csfUrl || 'https://worker.specless.app/1/csf/1585092194639/csf.remote.mjs';

const SERVER_ROOT = settings.speclessServer || 'https://worker.specless.app/1';

const BUILD_API_HOST = 'us-central1-specless-next.cloudfunctions.net';

const BUILD_API_START = '/api/build/start';

const BUILD_API_UPLOAD = '/api/build/upload';

const BUILD_API_FAILED = '/api/build/failed';

const LIBRARY_ENTRY = path.join(PROJECT_ROOT, '.specless/src/index.js');

const LOCAL_SERVER = `https://${LOCAL_ID}.ngrok.io/`;
const SOCKET_SERVER = LOCAL_SERVER + 'relay';

module.exports = {
    BUILD_HASH,
    BUILD_ID: LIBRARY_BUILD || BUILD_HASH,
    PROJECT_ROOT,
    LOCAL_ID,
    PANEL_MODULES,
    DEMO_PAGE_MODULES,
    BUILD_PATH,
    DEMO_DATA,
    CONFIG_MODULE,
    DYNAMIC_DATA_MODULE,
    PLACEMENT_MODULE,
    ASSETS_FOLDER,
    DEMO_DATA_OUTPUT_NAME,
    DEFAULT_DATA_OUTPUT_NAME,
    META_DATA_OUTPUT_NAME,
    SSR_MODULE_OUTPUT_NAME,
    SSR_PANEL_MODULE_OUTPUT_PREFIX,
    PROJECT_TYPE,
    PROJECT_NAME,
    DEV_PORT,
    OPEN_BROWSER_ON_LAUNCH,
    NGROK,
    LIBRARY_BUILD,
    LIBRARY_ROOT,
    LIBRARY_ENTRY,
    CSF_URL,
    SERVER_ROOT,
    BUILD_API_HOST,
    BUILD_API_START,
    BUILD_API_UPLOAD,
    BUILD_API_FAILED,
    LOCAL_SERVER,
    SOCKET_SERVER
}