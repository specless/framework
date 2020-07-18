import React from 'react'; 
import { Context } from './Context';
import { getLayout, createUseStyles }  from '@specless/utils';

const publicApiMethods = [
    'useStyles',
    'spx',
    'url',
    'exit',
    'track',
    'request',
    'log',
    'warn',
    'error',
    'onceConnected',
    'onceLoaded',
    'onPageGeom',
    'onPanelGeom',
    'onPanelResize',
    'onPanelError',
    'fetchDynamicData',
    'fetchVAST',
    'trackVideo',
    'createExit',
    'onLifespanEvent'
]

const defaultPanelState = {
    initialWidth: 300,
    initialHeight: 250,
    currentLayout: {},
    config: {},
    scripts: [],
    stylesheets: [],
    ssr: false,
    fromSSR: false,
    connected: false,
    noResize: false,
    id: 'default',
    canAutoplay: true,
    forceMuted: false,
    forcePaused: false,
    isTagless: false,
    error: null
}

export class Controller extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            csf: this.props.csf,
            panel: Object.assign({}, defaultPanelState, this.props.panel),
            constants: this.props.constants || {},
            data: this.props.data || {},
            PanelComponent: this.props.PanelComponent,
            layout: {}
        }

        this.state.width = this.props.panel.initialWidth;
        this.state.height = this.props.panel.initialHeight;

        this.panelRef = React.createRef();
        
        this.updatePanel = (panelData, dontSendToOuter, callback) => {
            const newPanelData = Object.assign(this.state.panel, panelData);
            this.setState({
                panel: newPanelData
            }, callback)
            if (!dontSendToOuter && this.updateStateStore) {
                this.updateStateStore(newPanelData)
            }
        }
        
        this.updateData = (data, callback) => {
            const newData = Object.assign(this.state.data, data);
            this.setState({
                data: newData
            }, callback)
        }
        
        this.updateConstants = (constants, callback) => {
            const newConstants = Object.assign(this.state.constants, constants);
            this.setState({
                constants: newConstants
            }, callback)
        }
        this.state.layout = getLayout(this.state.panel.config.layouts || [], this.state.width, this.state.height);

        this.connectionPromise = new Promise((resolve, reject) => {
            this.resolveConnection = resolve;
            this.rejectConnection = reject;
        })

        this.loadPromise = new Promise((resolve) => {
            this.resolveLoad = resolve
        })

        this.mountedPromise = new Promise((resolve, reject) => {
            this.resolveMounted = resolve;
            this.rejectMounted = reject;
        })

    }

    videoTrackers = {};


    onceConnected = () => {
        return this.connectionPromise
    }

    onceMounted = () => {
        return this.mountedPromise
    }

    onceLoaded = () => {
        return this.loadPromise
    }

    fetchDynamicData = () => {
        
    }

    exit = (id, overrideUrl, fireTraffickedUrlSilently) => {
        this.connectionPromise.then(csf => {
            csf.exit(id, overrideUrl, fireTraffickedUrlSilently)
        })
    }

    track = (id) => {
        this.connectionPromise.then(csf => {
            csf.track(id)
        })
    }

    createExit = (config) => {
        this.connectionPromise.then(csf => {
            csf._exit.create(config);
        })
    }

    trackVideo = (id) => {
        return new Promise((resolve, reject) => {
            if (this.videoTrackers[id]) {
                resolve(this.videoTrackers[id])
            } else {
                this.connectionPromise.then(csf => {
                    this.videoTrackers[id] = csf.trackVideo(id);
                    resolve(this.videoTrackers[id]);
                })
            }
        })
    }

    useStyles = (styles, props) => {
        return createUseStyles(styles)(props);
    }

    createUseStyles = createUseStyles;

    spx = (px) => {
        const { layout } = this.state;
        if ( layout.scale) {
            return px * layout.scale
        }
        return px
    }

    url = (asset) => {
        const { constants } = this.state;
        if (asset && (
                asset.startsWith('http://') 
                || asset.startsWith('https://')
                || asset.startsWith('//')
                || asset.startsWith('data:')
                || asset.startsWith('vastTagUrl')
            )
        ) {
            return asset
        } else if (asset && (
                asset.startsWith('/uploads/')
                || asset.startsWith('/file-cacher?')
                || asset.startsWith('/file-cacher/?')
            )
        ) {
            return constants.serverRoot + asset;
        } else if (!asset) {
            return asset
        }
        return constants.templateAssetsPath + '/' + asset;
    }

    onPageGeom = (callback) => {
        this.connectionPromise.then(csf => {
            csf.pageGeom.getStream().addListener({
                next: callback
            })
        })
    }

    onPanelGeom = (callback) => {
        this.connectionPromise.then(csf => {
            csf.measure.getStream().addListener({
                next: callback
            })
        })
    }

    onLifespanEvent = (callback) => {
        this.connectionPromise.then(csf => {
            csf.lifespan.getStreamWithHistory().addListener({
                next: callback
            })
        })
    }

    onPanelResize = (callback) => {
        return this.on('panelResize', callback);
    }

    onPanelError = (callback) => {
        return this.on('panelError', callback);
    }

    log = (msg, data) => {
        this.connectionPromise.then(csf => {
            csf.log(msg, data)
        })
    }

    warn = (msg, data) => {
        this.connectionPromise.then(csf => {
            csf.warn(msg, data)
        })
    }

    error = (msg, data) => {
        this.connectionPromise.then(csf => {
            csf.error(msg, data)
        })
    }

    fetchVAST = (url) => {
        return new Promise((resolve, reject) => {
            if (!url) {
                reject();
            } else {
                let vastUrl = url;
                if (url.startsWith('vastTagUrl=')) {
                    vastUrl = url.replace('vastTagUrl=', '');
                }
                
                fetch(`http://localhost:5001/specless-next/us-central1/server/vast`, { 
                    method: 'POST',   
                    body:JSON.stringify({
                        url: vastUrl,
                        constants: this.state.constants
                    })
                })
            }
        })
    }

    request = (action) => {
        return new Promise((resolve, reject) => {
            this.connectionPromise.then(csf => {
                csf.request(action).then(response => {
                    resolve(response)
                }).catch(err => {
                    reject(err);
                })
            })
        })
    }

    

    handleResize = () => {
        const { panel } = this.state;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const layout = getLayout(panel.config.layouts || [], width, height);
        if (this.state.panel.currentLayout.id !== layout.id) {
            this.updatePanel({
                currentLayout: layout
            })
        }
        this.setState({
            width,
            height,
            layout
        }, () => {
            this.trigger('panelResize', {
                width,
                height,
                layout
            })
        })
    }

    componentDidCatch(err) {
        this.error(`Uncaught Error: ${err.message}`);
        this.trigger('panelError', err);
        this.updatePanel({
            error: err
        })
    }

    trigger = (eventName, data) => {
        this.onceMounted().then(() => {
            const event = new CustomEvent(`specless_${this.props._namespace}_${eventName}`, {
                detail: data
            });
            window.dispatchEvent(event);
        })
    }

    on = (eventName, handler) => {
        const name = `specless_${this.props._namespace}_${eventName}`;
        const newHandler = ({detail}) => {
            if (handler) {
                handler(detail)
            }
        }
        this.onceMounted().then(() => {
            window.addEventListener(name, newHandler)
        })
        
        return () => {
            this.onceMounted().then(() => {
                window.removeEventListener(name, newHandler)
            })
        }
    }

    componentDidMount() {
        this.resolveMounted();
        const { panel, constants, csf } = this.state;
        let hasConnected = false; 

        if (document.getElementById('specless-ssr-styles')) {
            document.getElementById('specless-ssr-styles').remove();
        }
        
        if ((panel.fromSSR || panel.isTagless) && !panel.noResize) {
            this.handleResize();
            window.addEventListener('resize', this.handleResize);
        }

        if (panel.fromSSR) {
            window.addEventListener('load', () => {
                this.resolveLoad()
            })
            // window.addEventListener('error', (err) => {
            //     console.error(err);
            // }, {
            //     capture: true
            // });
        } else {
            this.onceConnected(() => {
                this.resolveLoad()
            })
        }

        if (!panel.isTagless) {
            const { CSFInner } = csf;
            CSFInner.connect({
                creative: this.state.data,
                panel: Object.assign(this.state.panel, {
                    connected: true
                })
            }).then((instance) => {
                this.updateStateStore = instance.updateStateStore;
                instance.creativeStore.getStream().addListener({
                    next: data => {
                        this.updateData(data)
                    }
                })

                instance.constantsStore.getStream().addListener({
                    next: allConstants => {
                        const newConst = Object.assign(allConstants, constants);
                        this.updateConstants(newConst, () => {
                            if (!hasConnected) {
                                this.resolveConnection(instance);
                            }
                            hasConnected = false;
                            instance.stateStore.getStream().addListener({
                                next: data => {
                                    this.updatePanel(data, true)
                                }
                            })
                        })
                    }
                })

                // TODO: Hookup listener for resizing if the panel is not being rendered from SSR
            });
        } else {
            // TODO: Handle initializing CSF on the panel when in tagless mode
        }
    }

    render() {
        const { panel, constants, data, PanelComponent, width, height, layout } = this.state;
        const api = {};
        
        publicApiMethods.forEach(method => {
            api[method] = this[method]
        })
        
        if (panel.ssr || panel.fromSSR) {
            this.useStyles({
                '@global': {
                    'html, body': {
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'transparent'
                    },
                    body: {
                        margin: 0
                    },
                    '#specless-panel-root': {
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        margin: 0
                    }
                }
            })
        }

        const styles = this.useStyles({
            'panel-container': {
                userSelect: 'none',
                cursor: 'pointer',
                boxSizing: 'border-box',
                margin: 0,
                color: 'rgba(0,0,0,.65)',
                fontSize: () => this.spx(14),
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',
                fontVariant: 'tabular-nums',
                lineHeight: 1.5,
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                position: 'relative',
                '@global': {
                    'img': {
                        userDrag: 'none'
                    },
                    [`.${this.props._namespace}panel-body`]: {
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        boxSizing: 'border-box'
                    },
                    [`.${this.props._namespace}layout-wrapper`]: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        boxSizing: 'border-box',
                        margin: '0 auto',
                        overflow: 'visible',
                        minWidth: ({layout}) => layout.minWidth,
                        maxWidth: ({layout}) => layout.maxWidth,
                        minHeight: ({layout}) => layout.minHeight,
                        maxHeight: ({layout}) => layout.maxHeight,
                        top: (state) => {
                            const { layout, height } = state;
                            let top = 0;
                            if ( height && layout && layout.maxHeight && height > layout.maxHeight) {
                                top = (height - layout.maxHeight)/2;
                            }
                            return top
                        },
                        left: (state) => {
                            const { layout, width } = state;
                            let left = 0;
                            if ( width && layout && layout.maxWidth && width > layout.maxWidth) {
                                left = (width - layout.maxWidth)/2;
                            }
                            return left
                        }
                    },
                    [`.${this.props._namespace}layer`]: {
                        position: 'absolute',
                        display: 'inline-block',
                        boxSizing: 'border-box',
                    },
                    [`.${this.props._namespace}layer > .specless-layer-image`] : {
                        position: 'absolute',
                        display: 'inline-block',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    },
                    [`.${this.props._namespace}border`]: {
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        zIndex: 100,
                        '&.specless-border-top': {
                            width: '100%',
                            top: 0
                        },
                        '&.specless-border-bottom': {
                            width: '100%',
                            bottom: 0
                        },
                        '&.specless-border-left': {
                            height: 'calc(100% - 2px)',
                            top: 1,
                            left: 0
                        },
                        '&.specless-border-right': {
                            height: 'calc(100% - 2px)',
                            top: 1,
                            right: 0
                        }
                    }
                }
            }
        }, this.state);

        const panelProps = {
            data,
            panel,
            constants,
            api,
            width,
            height,
            layout,
            _namespace: this.props._namespace,
            ref: this.panelRef
        }

        if (!panel.ssr) {
            return (
                <div id={`specless-panel-${panel.id}`} className={styles['panel-container']}>
                    <Context.Provider value={panelProps}>
                        <PanelComponent {...panelProps}/>
                    </Context.Provider>
                </div>
            )
        } else {

            const currentData = JSON.stringify({
                _namespace: this.props._namespace,
                panel,
                constants,
                data,
                exits: this.props.exits,
                trackers: this.props.trackers
            })

            return (
                <html>
                    <head>
                        <base href={`${constants.templateAssetsPath}/`}/>
                        <meta name="viewport" content="width=device-width, initial-scale=1"/>
                        <style type="text/css" id="specless-ssr-styles">
                            {`%%%STYLESHEETS%%%`}
                        </style>
                        {panel.stylesheets.map((stylesheet) => {
                            return (
                                <link rel="stylesheet" href={stylesheet}/>
                            )
                        })}
                    </head>
                    <body>
                        <div id="specless-panel-root">
                            <div id={`specless-panel-${panel.id}`} className={styles['panel-container']}>
                                <Context.Provider value={panelProps}>
                                    <PanelComponent {...panelProps}/>
                                </Context.Provider>
                            </div>
                        </div>
                        <script type="module" dangerouslySetInnerHTML={{__html: `
                            import { renderPanel } from '${constants.templateLibraryRoot}/assets/specless.run.js';
                            import { Panel } from '${constants.templateAssetsPath}/panel.${panel.id}.js';
                            import * as csf from '${constants.csfUrl}';
                            renderPanel(csf, Panel, document.getElementById('specless-panel-root'), ${currentData});
                        `}}/>
                        {panel.scripts.map((script) => {
                            return (
                                <script src={script}/>
                            )
                        })}
                    </body>
                </html>
            )
        }
    }
}