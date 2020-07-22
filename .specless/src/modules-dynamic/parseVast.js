import { VASTParser, VASTTracker } from 'vast-client';
import { DOMParser } from 'xmldom';

const macroParser = {
    'TIMESTAMP': (value, constants) => {

    },
    'BREAKPOSITION': (value, constants) => {
        return 4
    },
    'ADCOUNT': (value, constants) => {
        return 1
    },
    'TRANSACTIONID': (value, constants) => {

    },
    'PLACEMENTTYPE': (value, constants) => {

    },
    'ADTYPE': (value, constants) => {

    },
    'CLIENTUA': (value, constants) => {

    },
    'SERVERUA': (value, constants) => {

    },
    'DEVICEUA': (value, constants) => {

    },
    'SERVERSIDE': (value, constants) => {

    },
    'LATLONG': (value, constants) => {

    },
    'DOMAIN': (value, constants) => {

    },
    'PAGEURL': (value, constants) => {

    },
    'VASTVERSIONS': (value, constants) => {

    },
    'APIFRAMEWORKS': (value, constants) => {

    },
    'MEDIAMIME': (value, constants) => {

    },
    'PLAYERCAPABILITIES': (value, constants) => {

    },
    'CLICKTYPE': (value, constants) => {

    },
    'PLAYERSTATE': (value, constants) => {

    },
    'INVENTORYSTATE': (value, constants) => {

    },
    'PLAYERSIZE': (value, constants) => {

    },
    'ADPLAYHEAD': (value, constants) => {

    },
    'ASSETURI': (value, constants) => {

    },
    'REGULATIONS': (value, constants) => {

    },
    'GDPRCONSENT': (value, constants) => {

    }
}

const urlParser = (url) => {
    return url;
}

const parseResponse = (vast, mediaTypes) => {
    const vastData = {
        ad: null,
        creative: null,
        media: {},
        tracker: null,
        error: null
    }
    try {
        let allowedTypes = mediaTypes || ['video/mp4'];
        let matched = false;
        if (vast.ads) {
            vast.ads.forEach(ad => {
                if (!matched && ad.creatives) {
                    ad.creatives.forEach((creative) => {
                        if (!matched && creative.mediaFiles) {
                            creative.mediaFiles.forEach((file => {
                                if (allowedTypes.includes(file.mimeType)) {
                                    if (file.width <= 360) {
                                        matched = true;
                                        vastData.media.low = file;
                                    } else if (file.width <= 540 && file.width > 360) {
                                        matched = true;
                                        vastData.media.eco = file
                                    } else if (file.width <= 720 && file.width > 540) {
                                        matched = true;
                                        vastData.media.good = file
                                    } else if (file.width <= 1080 && file.width > 720) {
                                        matched = true;
                                        vastData.media.best = file
                                    } else if (file.width > 1080) {
                                        matched = true;
                                        vastData.media.max = file
                                    }
                                }
                            }))
                        }
                        if (matched && !vastData.creative) {
                            vastData.creative = Object.assign({}, creative);
                            if (vastData.creative.mediaFiles) {
                                delete vastData.creative.mediaFiles
                            }
                        }
                    })
                }

                if (matched && !vastData.ad) {
                    vastData.ad = Object.assign({}, ad);
                    delete vastData.ad.creatives;
                }
            })
        }
        
        if (!vastData.media.max) {
            vastData.media.max = vastData.media.best || vastData.media.good || vastData.media.eco || vastData.media.low;
        }

        if (!vastData.media.low) {
            vastData.media.low = vastData.media.eco || vastData.media.good || vastData.media.best || vastData.media.max;
        }

        if (!vastData.media.eco) {
            vastData.media.eco = vastData.media.low || vastData.media.good || vastData.media.best || vastData.media.max;
        }

        if (!vastData.media.good) {
            vastData.media.good = vastData.media.eco || vastData.media.best || vastData.media.low || vastData.media.max;
        }

        if (!vastData.media.best) {
            vastData.media.best = vastData.media.good || vastData.media.max || vastData.media.eco || vastData.media.low;
        }

        if (!vastData.media.low && !vastData.media.eco && !vastData.media.good && !vastData.media.best && !vastData.media.max) {
            vastData.error = {
                code: 401,
                message: 'No Supported media types'
            }
        }

        if (vastData.ad && vastData.creative) {
            vastData.tracker = new VASTTracker(null, vastData.ad, vastData.creative);
        }
    } catch(err) {
        vastData.error = {
            code: 500,
            message: err.message || `VAST XML parsing error`,
        }
    }
    return vastData;
}

export default ({
    url,
    xml,
    mediaTypes,
    constants
}) => {
    return new Promise((resolve, reject) => {
        const vastParser = new VASTParser();
        vastParser.addURLTemplateFilter(urlParser);
        if (url) {
            vastParser.getAndParseVAST(url).then(vast => {
                const parsedVAST = parseResponse(vast, mediaTypes);
                resolve(parsedVAST)
            }).catch(err => {
                reject(err)
            })
        } else if (xml) {
            const xmlObject = new DOMParser().parseFromString(xml);
            vastParser.parseVAST(xmlObject).then(vast => {
                const parsedVAST = parseResponse(vast, mediaTypes);
                resolve(parsedVAST)
            }).catch(err => {
                reject(err)
            })
        }
    })
}