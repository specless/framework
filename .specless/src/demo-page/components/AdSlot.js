import React from 'react';
import '../../vendor/prebid-renderer.js';
import { createUseStyles } from 'react-jss';
const queryString = require('query-string');

const styles = createUseStyles({
    adSlot: {
        '@global': {
            '> div': {
                width: (props) => `${props.width || 1}px !important`,
                height: (props) => `${props.height || 1}px !important`,
                margin: '0 auto',
                display: 'block !important'
            },
            '> div > iframe': {
                width: (props) => `${props.width || 1}px !important`,
                height: (props) => `${props.height || 1}px !important`
            }
        }
    }
})

const speclessTag = ``

const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const parseQueryString = (search) => {
    const obj = queryString.parse(search, {arrayFormat: 'bracket', parseBooleans: true});
    const newParams = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const splitKey = key.split('[');
        if (splitKey.length === 2) {
            const newKey = splitKey[1].replace(']', '');
            newParams[newKey] = value;
        }
    })
    return newParams
}

class AdSlotComponent extends React.Component {
    constructor(props) {
        super(props)
        this.slotId = `ad-slot-${makeid(10)}`
    }

    displaySlot = () => {
        googletag.cmd.push(() => { 
            googletag.display(this.slotId)
        });
    }

    setupPrebid = (keyValues) => {
        window.googletag = window.googletag || {cmd: []};
        window.pbjs = window.pbjs || {};
        var pbjs = window.pbjs;
        var googletag = window.googletag;
        pbjs.que = pbjs.que || [];
        var PREBID_TIMEOUT = 5000;

        var adUnits = [{
            code: this.slotId,
            mediaTypes: {
                video: {
                    playerSize: [640, 480],
                    context: 'outstream'
                }
            },
            bids: [
                {
                    bidder: 'appnexus',
                    params: {
                        placementId: 13232385,
                        video: {
                            skippable: true,
                            playback_method: ['auto_play_sound_off']
                        }
                    }
                }
            ],
            renderer: {
                url: LOCAL_SERVER + 'assets/vendor.prebid-renderer.js',
                render: (bid) => {
                    window.speclessRenderQue = window.speclessRenderQue || [];
                    window.speclessRenderQue.push({
                        bid: bid,
                        tag: 'dynamic',
                        target: {
                            element: document.getElementById(this.slotId).querySelector('iframe'),
                            className: 'my-whatever',
                            styles: {}
                        },
                        container: {
                            element: 'div',
                            className: 'my-container',
                            styles: {}
                        },
                        onMount: (e) => {
                            console.log(e)
                        }
                    })
                }
            }
        }];

        pbjs.que.push(function() {
            pbjs.addAdUnits(adUnits);
            pbjs.requestBids({
                bidsBackHandler: initAdserver
            });
        });

        function initAdserver() {
            console.log('init');
            if (pbjs.initAdserverSet) return;
            pbjs.initAdserverSet = true;
            googletag.cmd.push(function() {
                pbjs.que.push(function() {
                    console.log('prebid que')
                    pbjs.setTargetingForGPTAsync();
                    googletag.pubads().refresh();
                });
            });
        }

        setTimeout(function() {
            initAdserver();
        }, PREBID_TIMEOUT);
    }

    defineSlot = (keyValues) => {
        let adUnit = '/13149244/specless-next-ad-unit';
        if (this.props.prebid) {
            adUnit = '/13149244/specless-next-prebid-appnexus'
        }
        window.googletag = window.googletag || {cmd: []};
        googletag.cmd.push(() => {
            let slot = googletag.defineSlot(adUnit, [[1,1]], this.slotId).addService(googletag.pubads())
            Object.keys(keyValues).forEach((key) => {
                slot = slot.setTargeting(key, `${keyValues[key]}`)
            })
            if (this.props.safeframe) {
                slot.setForceSafeFrame(true);
            }
            if (this.props.prebid) {
                googletag.pubads().disableInitialLoad();
                googletag.pubads().enableSingleRequest();
            }
            googletag.enableServices();
        });
        this.displaySlot()
    }

    componentDidMount() {
        const urlParams = parseQueryString(window.location.search);
        const keyValues = urlParams;
        keyValues.slot_width = this.props.width || 1;
        keyValues.slot_height = this.props.height || 1;
        if (urlParams.placementBuild === 'local') {
            urlParams.placement_data_url = `${urlParams.placementRoot}/data/default`
        }
        if (this.props.prebid) {
            this.setupPrebid(keyValues)
        }

        this.defineSlot(keyValues)
    }

    render() {

        const classNames = styles(this.props);

        return (
            <div className={`ad-slot-wrapper ${classNames.adSlot}`} id={this.slotId}/>
        )
    }
}

export const AdSlot = AdSlotComponent;