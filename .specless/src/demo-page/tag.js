const settings = require('./../../../src/meta/settings.json');
const defaultBuild = settings.general.defaultTemplateBuild;
const defaultConfig = settings.general.defaultTemplateConfig;
const defaultPanels = settings.general.defaultPanels;

export const tag =  (csf, placement) => {
    
    const getUrlParams = () => {
        const urlParams = Object.fromEntries(new URLSearchParams(location.search));
        console.log(urlParams);
        for (let key in urlParams) {
            if (Number(urlParams[key])) {
                urlParams[key] = Number(urlParams[key])
            } else if (urlParams[key] === 'true') {
                urlParams[key] = true
            } else if (urlParams[key] === 'false') {
                urlParams[key] = false
            } else if (urlParams[key].split(',').length > 1) {
                urlParams[key] = urlParams[key].split(',')
            }
        }
        return urlParams;
    }
    
    const start = (placement, params, panels, placementData) => {
        new csf({
            startTime: performance.now(),
            env: {
                mode: 'development'
            },
            constants: params,
            panels,
            placementData
        }).start(placement);
    }
    
    const params = getUrlParams();
    let panels, placementData;
    
    if (params.panels && Array.isArray(params.panels)) {
        panels = [];
        params.panels.forEach((id) => {
            panelsConfig.push({ id })
        })
        delete params.panels;
    }

    if (!params.tag && !params.templateBuild) {
        params.templateBuild = defaultBuild;
        if (!panels) {
            panels = defaultPanels;
        }
    }
    
    if (!params.tag && !params.templateConfig) {
        params.templateConfig = defaultConfig;
    }

    if (!params.tag && params.placementConfig === 'demo') {
        fetch('./data.demo.json').then((res) => {
            res.json().then(data => {
                placementData = data;
                start(placement, params, panels, placementData)
            })
        })
    } else if (!params.tag && params.placementConfig && params.placementConfig !== 'default') {
        fetch(`https://server.specless.app/data/${params.placementConfig}`).then((res) => {
            res.json().then(data => {
                placementData = data;
                start(placement, params, panels, placementData)
            })
        })
    } else if (!params.tag) {
        fetch('./data.default.json').then((res) => {
            res.json().then(data => {
                placementData = data;
                start(placement, params, panels, placementData)
            })
        })
    } else {
        start(placement, params, panels, placementData)
    }
}