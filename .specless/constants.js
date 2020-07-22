const path = require('path');
const specless = require('../specless.json');
const defaults = require('./defaults.js');
const settings = Object.assign({}, defaults, specless);

const PROJECT_ROOT = path.resolve(__dirname, '../');

const SETTINGS_MODULE = path.join(PROJECT_ROOT, '/.specless/src/settings.js');

const PROJECT_ID = settings.projectId || path.basename(PROJECT_ID) || 'default-project';

const BUILD_HASH = require('../.specless.build.json').id;

const DEMO_AD_DATA = require('./.tmp/demo-ad.json');

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

const DEMO_AD = settings.demoAd;

const TMP_DIR = path.join(PROJECT_ROOT, '/.specless/.tmp');

const MODULES = path.join(PROJECT_ROOT, '/.specless/src/modules');

const DYNAMIC_MODULES = path.join(PROJECT_ROOT, '/.specless/src/modules-dynamic');

const DEMO_AD_DATA_PATH = path.join(TMP_DIR, '/demo-ad.json');

const CONFIG_MODULE = path.join(PROJECT_ROOT, settings.configModule || '/src/config/index.js');

const DYNAMIC_DATA_MODULE = path.join(PROJECT_ROOT, settings.dynamicDataModule || '/src/data/fetch-data.js');

const PLACEMENT_MODULE = path.join(PROJECT_ROOT, settings.placementModule || '/src/placement.js');

const ASSETS_FOLDER = path.join(PROJECT_ROOT, settings.assetsFolder || '/src/assets');

const PLACEMENT_META_ENTRY = path.join(PROJECT_ROOT, '/.specless/src/meta.placement.js');

const TEMPLATE_META_ENTRY = path.join(PROJECT_ROOT, '/.specless/src/meta.template.js');

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

const LOCAL_ID = `${PROJECT_ID}-${BUILD_HASH}`;

const LOCAL_SERVER = `https://${LOCAL_ID}.ngrok.io/`;

const SOCKET_SERVER = LOCAL_SERVER + 'relay';

module.exports = {
    BUILD_HASH,
    BUILD_ID: LIBRARY_BUILD || BUILD_HASH,
    PROJECT_ROOT,
    PROJECT_ID,
    DYNAMIC_MODULES,
    LOCAL_ID,
    PANEL_MODULES,
    DEMO_PAGE_MODULES,
    BUILD_PATH,
    DEMO_DATA,
    DEMO_AD,
    DEMO_AD_DATA,
    DEMO_AD_DATA_PATH,
    TMP_DIR,
    CONFIG_MODULE,
    DYNAMIC_DATA_MODULE,
    PLACEMENT_MODULE,
    ASSETS_FOLDER,
    MODULES,
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
    SOCKET_SERVER,
    TEMPLATE_META_ENTRY,
    PLACEMENT_META_ENTRY,
    SETTINGS_MODULE
}