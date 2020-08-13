import { VASTParser, VASTTracker } from 'vast-client';
import { DOMParser } from 'xmldom';

const macroParser = {
    'TIMESTAMP': (constants) => {
        return ''
    },
    'BREAKPOSITION': (constants) => {
        return ''
    },
    'ADCOUNT': (constants) => {
        return ''
    },
    'TRANSACTIONID': (constants) => {
        return ''
    },
    'PLACEMENTTYPE': (constants) => {
        return ''
    },
    'ADTYPE': (constants) => {
        return ''
    },
    'CLIENTUA': (constants) => {
        return ''
    },
    'SERVERUA': (constants) => {
        return ''
    },
    'DEVICEUA': (constants) => {
        return ''
    },
    'SERVERSIDE': (constants) => {
        return ''
    },
    'LATLONG': (constants) => {
        return ''
    },
    'DOMAIN': (constants) => {
        return ''
    },
    'PAGEURL': (constants) => {
        return ''
    },
    'VASTVERSIONS': (constants) => {
        return ''
    },
    'APIFRAMEWORKS': (constants) => {
        return ''
    },
    'MEDIAMIME': (constants) => {
        return ''
    },
    'PLAYERCAPABILITIES': (constants) => {
        return ''
    },
    'CLICKTYPE': (constants) => {
        return ''
    },
    'PLAYERSTATE': (constants) => {
        return ''
    },
    'INVENTORYSTATE': (constants) => {
        return ''
    },
    'PLAYERSIZE': (constants) => {
        return ''
    },
    'ADPLAYHEAD': (constants) => {
        return ''
    },
    'ASSETURI': (constants) => {
        return ''
    },
    'REGULATIONS': (constants) => {
        return ''
    },
    'GDPRCONSENT': (constants) => {
        return ''
    }
}

const urlParser = (url, constants) => {
    try {
        Object.keys(macroParser).forEach(macro => {
            if (url.includes(`[${macro}]`)) {
                url = url.replace(`[${macro}]`, macroParser[macro](constants))
            }
        })
        
        if (url.endsWith('&correlator=')) {
            url = url + constants.correlator
        }
    } catch(err) { }

    return url;
}

const detectVideoSupport = () => {
    const formats = {
        'video/webm': [
            'video/webm; codecs="vp8, vorbis"',
            'video/webm; codecs="vp9"'
        ],
        'video/ogg': [
            'video/ogg; codecs="theora"'
        ]
    }
    const support = ['video/mp4'];
    try {
        const video = document.createElement('video');
        for (let type in formats) {
            let allowed = true;
            formats[type].forEach(codec => {
                const canPlay = video.canPlayType(codec);
                if (allowed && canPlay !== 'probably') {
                    allowed = false;
                }
            })
            if (allowed) {
                support.push(type)
            }
        }
    } catch(err) {

    }
    return support;
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
        let allowedTypes = mediaTypes || detectVideoSupport() || ['video/mp4'];
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
                code: 403,
                message: 'VAST response declared unsupported MIME types for all MediaFiles'
            }
        }

        if (vastData.ad && vastData.creative) {
            vastData.tracker = new VASTTracker(null, vastData.ad, vastData.creative);
        }

    } catch(err) {
        vastData.error = {
            code: 100,
            message: err.message || `VAST XML parsing error`
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
        const emptyResponse = {
            ad: null,
            creative: null,
            media: {},
            tracker: null,
        }
        vastParser.on('VAST-error', ({ERRORCODE, ERRORMESSAGE}) => {
            const messages = {
                101: 'VAST schema validation error',
                301: 'VAST redirect timeout reached',
                302: 'Wrapper limit reached',
                303: 'Empty VAST response returned'
            }
            resolve({
                error: {
                    code: ERRORCODE,
                    message: ERRORMESSAGE || messages[ERRORCODE]
                },
                ...emptyResponse
            })
        })

        vastParser.on('VAST-resolved', ({ error }) => {
            if (error) {
                resolve({
                    error: {
                        code: 100,
                        message: error.message
                    },
                    ...emptyResponse
                })
            }
          });
        
        vastParser.addURLTemplateFilter((urlString) => {
            return urlParser(urlString, constants);
        });

        if (url) {
            vastParser.getAndParseVAST(url).then(vast => {
                const parsedVAST = parseResponse(vast, mediaTypes);
                resolve(parsedVAST);
            }).catch(err => {
                resolve({
                    error: {
                        code: 100,
                        message: err.message
                    },
                    ...emptyResponse
                })
            })
        } else if (xml) {
            const xmlObject = new DOMParser().parseFromString(xml);
            vastParser.parseVAST(xmlObject).then(vast => {
                const parsedVAST = parseResponse(vast, mediaTypes);
                resolve(parsedVAST);
            }).catch(err => {
                resolve({
                    error: {
                        code: 100,
                        message: err.message
                    }, 
                    ...emptyResponse
                })
            })
        }
    })
}

export const Parser = VASTParser;
export const Tracker = VASTTracker;
export const XMLParser = DOMParser;