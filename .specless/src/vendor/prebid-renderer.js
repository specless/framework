(function(){
    const DEFAULT_TARGET_CONFIG = {};
    const DEFAULT_CONTAINER_CONFIG = {
        element: document.createElement('iframe')
    };
    const DEFAULT_MOUNT_HANDLER = () => {};
    const DEFAULT_ERROR_HANDLER = (err) => {
        console.error(err)
    };
    
    const GENERATE_TAG = (id, config) => {

    }

    const GENERATE_DYNAMIC_TAG = (configObj, settingsObj) => {
        const config = JSON.stringify(configObj);
        const settings = JSON.stringify(settingsObj);
        const script = document.createElement('script');
        const code = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://worker.specless.app/1/dynamic/start';
        code.type = 'text/javascript';
        code.innerText = `run('sp', ${config}, ${settings})`;
        return {
            script: script,
            code: code
        };
    }

    class SpeclessRenderer {
        constructor(config) {
            this._width = config.width;
            this._height = config.height;
            this._bid = config.bid;
            this._tag = config.tag;
            this._target = Object.assign(DEFAULT_TARGET_CONFIG, config.target);
            this._container = Object.assign(DEFAULT_CONTAINER_CONFIG, config.container);;
            this._onMount = this.onMount || DEFAULT_MOUNT_HANDLER;
            this._onError = this.onError || DEFAULT_ERROR_HANDLER;

            if (!this._width && config.bid) {
                this._width = config.bid.width || 1;
            }

            if (!this._height && config.bid) {
                this._height = config.bid.height || 1;
            }
        }

        _handleError = (error) => {
            if (typeof error === 'string') {
                this._onError(new Error(`Specless Prebid Renderer Error: ${error}`));
            } else {
                this._onError(error)
            }
        }

        _setClassName = (el, config) => {
            if (config.className) {
                if (el.className === '') {
                    el.className = config.className
                } else {
                    el.className = el.className + ' '  + config.className
                }
            }
        }

        _setStyles = (el, config) => {
            if (config.styles) {
                Object.keys(config.styles).forEach((key) => {
                    el.style[key] = config.styles[key];
                })
            }
        }

        _getSpeclessConfig = () => {
            const {
                ad = null,
                adId = null,
                bidder = null,
                auctionId = null,
                bidderCode = null,
                width = null, 
                height = null,
                adUrl = null,
                adResponse = null,
                meta = null,
                adserverTargeting = null,
                cpm = null,
                creativeId = null,
                currency = null,
                dealId = null,
                mediaType = null,
                netRevenue = null,
                originalCpm = null,
                originalCurrency = null,
                params = [],
                requestId = null,
                requestTimestamp = null,
                responseTimestamp = null,
                source = null,
                status = null,
                timeToRespond = null,
                ttl= null,
                vastImpUrl = null,
                vastXml= null
            } = this._bid;

            let adData = {};
            if (adResponse && adResponse.ad) {
                adData = adResponse.ad;
            }
            const config = {
                startTime: performance.now(),
                env: {
                    mode: 'development'
                },
                macros: {
                    "adServer": `prebid-${bidder || bidderCode || 'undefined'}`,
                    "clickTracker": '',
                    "adServerAdUnitId": null,
                    "adServerAdvertiserId": adData.advertiser_id || null,
                    "pageUrl": window.location.href,
                    "pageDomain": window.location.hostname,
                    "adServerCreativeId": adData.creative_id || null,
                    "adServerHeight": height,
                    "adServerLineItemId": null,
                    "adServerPlacementId": null,
                    "isPreview": true,
                    "isPreviewInterface": true,
                    "cachebuster": requestId,
                    "adServerSiteId": null,
                    "adServerOrderId": null,
                    "childDirectedContent": null,
                    "adServerDestination": null,
                    "adServerTagType": "prebid",
                    "adServerWidth": width
                },
                constants: {
                    bid: {
                        ad,
                        adId,
                        bidder,
                        auctionId,
                        bidderCode,
                        width, 
                        height,
                        adUrl,
                        adResponse,
                        meta,
                        adserverTargeting,
                        cpm,
                        creativeId,
                        currency,
                        dealId,
                        mediaType,
                        netRevenue,
                        originalCpm,
                        originalCurrency,
                        params,
                        requestId,
                        requestTimestamp,
                        responseTimestamp,
                        source,
                        status,
                        timeToRespond,
                        ttl,
                        vastImpUrl,
                        vastXml
                    }
                }
            }
            
            return new Promise((resolve, reject) => {
                const uri = new URL(window.location.href);
                const build = uri.searchParams.get('sp[placementBuild]');
                const root = uri.searchParams.get('sp[placementRoot]');
                if (build === 'local' && root) {
                    fetch(root + '/data/default').then((res) => {
                        res.json().then((data) => {
                            config.placementData = data;
                            resolve(config);
                        }).catch((err) => {
                            this._handleError(err);
                            resolve(config)
                        })
                    }).catch(err => {
                        this._handleError(err);
                        resolve(config)
                    })
                } else {
                    resolve(config)
                }
            })
        }

        _getSpeclessSettings = (config, target, container) => {
            const settings = {
                useParentWindowForTop: true,
                hideIndicator: true
            };

            if ((target.contentWindow && target.contentWindow !== self) || (container.contentWindow && container.contentWindow !== self)) {
                settings.paramsWindow = 'parent'
            }

            return settings
        }
        
        render = () => {
            const getConfig = this._getSpeclessConfig();
            let target = this._target.element;
            let container = this._container.element;
            if (typeof this._target.element === 'string') {
                target = document.querySelector(this._target.element);
            }
            if (typeof this._container.element === 'string') {
                try {
                    container = document.createElement(this._container.element);
                } catch (err) {
                    container = DEFAULT_CONTAINER_CONFIG.element;
                    this._handleError(err);
                }
            }
            if (!target) {
                this._handleError('No target element provided. Could not render ad.')
            } else if (!container) {
                this._handleError('No container element provided. Could not render ad.')
            } else {
                this._setClassName(target, this._target);
                this._setClassName(container, this._container);
                this._setStyles(target, this._target);
                this._setStyles(container, this._container);
                getConfig.then(config => {
                    let grandParent = target;
                    let parent = container;
                    if (target.nodeName === 'IFRAME') {
                        try {
                            let slot = target.contentDocument || target.contentWindow.document;
                            grandParent = slot.body;
                        } catch(err) {
                            this._handleError(err);
                        }
                    }
                    grandParent.appendChild(container);
                    const settings = this._getSpeclessSettings(config, target, container);
                    if (container.nodeName === 'IFRAME') {
                        let frame = container.contentDocument || container.contentWindow.document;
                        container.setAttribute('style', `border: 0pt none;`);
                        container.setAttribute('width', this._width);
                        container.setAttribute('height', this._height);
                        parent = frame.body;
                        parent.style.margin = 0;
                        parent.style.padding = 0;
                    }
                    let tag = GENERATE_DYNAMIC_TAG(config, settings);
                    if (tag.before) {
                        parent.appendChild(tag.before);
                    }
                    if (tag.script) {
                        tag.script.addEventListener('load', () => {
                            if (tag.code) {
                                parent.appendChild(tag.code)
                            }
                        })
                        parent.appendChild(tag.script)
                    }
                })
            }
        }
    }
    
    if (window.speclessRenderQue) {
        window.speclessRenderQue.forEach((config) => {
            if (!config.rendered) {
                config.rendered = true;
                config.instance = new SpeclessRenderer(config);
                config.instance.render();
            }
        })
    }
})();

