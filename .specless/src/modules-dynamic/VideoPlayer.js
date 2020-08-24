import React from 'react';
import ReactPlayer from 'react-player';
import players from 'react-player/lib/players';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Layer, Component } from '@specless/components';
import { GenIcon } from 'react-icons/lib';
// import {
//     IoIosPause as PauseIcon,
//     IoIosPlay as PlayIcon,
//     IoIosWarning as ErrorIcon,
//     IoIosRefresh as RestartIcon
// } from 'react-icons/io';
// import {
//     FiVolumeX as MutedIcon,
//     FiVolume2 as UnMutedIcon
// } from 'react-icons/fi';
// import {
//     AiOutlineLoading3Quarters as LoadingIcon
// } from 'react-icons/ai';

const PauseIcon = (props) => {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M199.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8zM375.9 416h-63.8c-4.5 0-8.1-3.6-8.1-8V104c0-4.4 3.6-8 8.1-8h63.8c4.5 0 8.1 3.6 8.1 8v304c0 4.4-3.6 8-8.1 8z"}}]})(props);
}
const PlayIcon = (props) => {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M128 104.3v303.4c0 6.4 6.5 10.4 11.7 7.2l240.5-151.7c5.1-3.2 5.1-11.1 0-14.3L139.7 97.2c-5.2-3.3-11.7.7-11.7 7.1z"}}]})(props);
}
const ErrorIcon = (props) => {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M228.9 79.9L51.8 403.1C40.6 423.3 55.5 448 78.9 448h354.3c23.3 0 38.2-24.7 27.1-44.9L283.1 79.9c-11.7-21.2-42.5-21.2-54.2 0zM273.6 214L270 336h-28l-3.6-122h35.2zM256 402.4c-10.7 0-19.1-8.1-19.1-18.4s8.4-18.4 19.1-18.4 19.1 8.1 19.1 18.4-8.4 18.4-19.1 18.4z"}}]})(props);
}
const RestartIcon = (props) => {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 336.1c-70.7 0-128-57.3-128-128.1s57.3-128.1 128-128.1v-37c0-6.4 7.1-10.2 12.4-6.7l72.9 52.6c4.9 3.3 4.7 10.6-.4 13.6L268 196.7c-5.3 3.1-12-.8-12-6.9v-41.9c-60.3 0-109.2 49.7-108.1 110.2 1.1 59.1 50.3 106.7 109.5 106 55.9-.7 101.8-43.7 106.3-99 .4-5.2 4.7-9.1 9.9-9.1 5.8 0 10.4 4.9 9.9 10.7-5.4 66-60.4 117.4-127.5 117.4z"}}]})(props);
}
const MutedIcon = (props) => {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}},{"tag":"line","attr":{"x1":"23","y1":"9","x2":"17","y2":"15"}},{"tag":"line","attr":{"x1":"17","y1":"9","x2":"23","y2":"15"}}]})(props);
}
const UnMutedIcon = (props) => {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","strokeWidth":"2","strokeLinecap":"round","strokeLinejoin":"round"},"child":[{"tag":"polygon","attr":{"points":"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}},{"tag":"path","attr":{"d":"M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"}}]})(props);
}
const LoadingIcon = (props) => {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 1024 1024"},"child":[{"tag":"path","attr":{"d":"M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"}}]})(props);
}

const styles = {
    '@global': {
        '@keyframes specless-video-spin': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(360deg)'
            }
        }
    },
    'videoPlayer': {
        position: 'absolute',
        top: -1,
        left: -1,
        zIndex: 0,
        '@global': {
            '> div': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            },
        }
    },
    'videoOverlay': {
        zIndex: 1
    },
    'videoControls': {
        color: (props) => {
            return props.controlsColor || '#fff';
        },
        zIndex: 2,
        '@global': {
            '.CircularProgressbar' : {
                width: '100%',
                verticalAlign: 'middle'
            },
            '.CircularProgressbar .CircularProgressbar-path': {
                stroke: (props) => {
                    return props.controlsColor || '#fff';
                },
                strokeLinecap: 'round',
                transition: 'stroke-dashoffset 0.5s ease 0s',
            },
            '.CircularProgressbar .CircularProgressbar-trail': {
                stroke: 'transparent',
                strokeLinecap: 'round'
            },
            '.CircularProgressbar .CircularProgressbar-text': {
                fill: '#3e98c7',
                fontSize: 20,
                dominantBaseline: 'middle',
                textAnchor: 'middle'
            },
            '.CircularProgressbar .CircularProgressbar-background': {
                fill: 'rgba(102, 102, 102,0.35)'
            },
            '.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-background': {
                fill: '#3e98c7'
            },
            '.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text': {
                fill: (props) => {
                    return props.controlsColor || '#fff';
                }
            },
            '.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path': {
                stroke: (props) => {
                    return props.controlsColor || '#fff';
                }
            },
            '.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail' : {
                stroke: 'transparent'
            }
        }
    },
    'videoPosterImage': {
        zIndex: 3
    },
    'videoEndframe': {
        zIndex: 1,
    },
    'videoButton': {
        fontSize: 18,
        margin: 6,
        opacity: 0.8,
        '&:hover': {
            opacity: 1
        },
        '&.toggle-playback': {
            left: 0
        },
        '&.toggle-mute': {
            right: 0
        },
        '@global': {
            '.icon': {
                position: 'relative',
                '&.play': {
                    left: '1px'
                },
                '&.restart': {
                    top: '-1px',
                    transform: 'scaleX(-1)'
                }
            }
        }
    },
    'videoLoadingIcon': {
        color: (props) => {
            return props.controlsColor || '#fff';
        },
        zIndex: 4,
        top: 0,
        left: 0,
        '@global': {
            '.spinning': {
                animationName: 'specless-video-spin',
                animationDuration: '2500ms',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear'
            }
        }
    }
}

const getPlayerType = (url) => {
    for (const Player of players) {
        if (Player.canPlay(url)) {
            if (Player.displayName) {
                return Player.displayName.toLowerCase()
            }
        }
    }
    return 'fileplayer'
}

const getAssetType = (props) => {
    const playerType = getPlayerType(props.url);
    if (playerType === 'fileplayer') {
        if (props.url.startsWith('vast://')) {
            return 'vast'
        } else if (props.url.startsWith('https://worker.specless.app/1/uploads/')) {
            return 'hosted'
        } else {
            return 'external'
        }
    } else {
        return playerType
    }
}

class VideoPlayer extends Component {

    state = {
        ready: false,
        started: false,
        playing: this.props.playing,
        played: 0,
        hasPlayed: false,
        loaded: 0,
        playedSeconds: 0,
        loadedSeconds: 0,
        duration: 0,
        currentTime: 0,
        buffering: false,
        muted: true,
        userMuted: false,
        ended: false,
        error: null,
        url: this.props.url,
        playerType: getPlayerType(this.props.url),
        assetType: getAssetType(this.props),
        inView: false,
        shouldResume: false,
        quality: null
    }

    getVideoQuality = () => {
        if (['low', 'eco', 'good', 'best', 'max', 'original'].includes(this.props.quality)) {
            return this.props.quality
        }

        let width = 480;
        let height = 269;
        let hiDPI = false;
        if (this.props.wrapper && this.props.wrapper.current) {
            const rect = this.props.wrapper.current.getBoundingClientRect();
            let scale = window.devicePixelRatio;
            if (scale > 1.5) {
                scale = 1.5;
                hiDPI = true;
            }
            width = rect.width;
            height = rect.height;
        }
        const effectiveType = (navigator.connection && navigator.connection.effectiveType) || '4g'
        const pDim = width >= height ? width : height
        
        if (effectiveType.includes('2g')){
            return 'low'
        }
        
        if (effectiveType.includes('3g')) {
            return 'eco'
        }

        if (pDim < 361){
            if (hiDPI) {
                return 'eco'
            } else {
                return 'low'
            }
        }
        if (pDim < 481){
            if (hiDPI) {
                return 'good'
            } else {
                return 'eco'
            }
        }
        
        if (pDim < 577){
            if (hiDPI) {
                return 'best'
            } else {
                return 'good'
            }
        }

        if (pDim < 721){
            if (hiDPI) {
                return 'max'
            } else {
                return 'best'
            }
        }

        return 'max'
    }

    vastTrackers = {};

    trackVastEvent = (vast, event) => {
        const progressUpdate = () => vast.setProgress(this.state.playedSeconds);
        const tracker = {
            videoDuration: () => {
                vast.setDuration(event.data.duration);
            },
            videoPlay: () => {
                if (vast.started === true) {
                    vast.setPaused(false)
                }
                vast.started = true
            },
            videoPause: () => {
                vast.setPaused(true)
            },
            videoMute: () => {
                vast.setMuted(false)
            },
            videoUnmute: () => {
                vast.setMuted(true)
            },
            videoComplete: () => {
                if (!vast.completed) {
                    vast.complete()
                }
                vast.completed = true
            },
            videoProgress: progressUpdate,
            videoFirstQuartile: progressUpdate,
            videoMidpoint: progressUpdate,
            videoThirdQuartile: progressUpdate
        }

        if (tracker[event.name]) {
            tracker[event.name]()
        }
    }

    adLifespanEventRecorded(event) {
        if (event.data && event.data.id === this.props.id) {
            if (this.state.assetType === 'vast' && this.props.vast && this.props.vast.tracker) {
                
                this.props.vast.tracker.on('clickthrough', (url) => {
                    const clickUrl = url || this.props.vast.creative.videoClickThroughURLTemplate;
                    if (this.props.onClick) {
                        this.props.onClick({
                            ...this.externalAPI,
                            clickUrl: clickUrl
                        })
                    }
                })
                
                this.trackVastEvent(this.props.vast.tracker, event);

                // this.vastTrackers[this.props.id].trackImpression();
                // if (!this.vastTrackers[this.props.id]) {
                //     this.vastTrackers[this.props.id] = this.props.vast.tracker;
                //     this.props.vast.tracker.on('clickthrough', (url) => {
                //         const clickUrl = url || this.props.vast.creative.videoClickThroughURLTemplate;
                //         if (this.props.onClick) {
                //             this.props.onClick(clickUrl)
                //         }
                //     })
                //     this.vastTrackers[this.props.id].trackImpression();
                // }
                // this.trackVastEvent(this.vastTrackers[this.props.id], event);
            }
        }
    }

    handleObserver = (entries) => {
        let threshold = this.props.visibilityThreshold || 0.3;
        let inView = this.state.inView;
        
        entries.forEach((entry) => {
            if (entry.intersectionRatio < threshold) {
                inView = false
            } else {
                inView = true
            }
        })

        if (!inView && this.state.playing) {
            this.updateState({
                inView,
                shouldResume: true
            })
        } else {
            this.updateState({
                inView
            })
        }
    }

    player = React.createRef();

    tracker = {
        play: (trusted, data) => {
            this.props.tracker.then(tracker => {
                tracker.play(trusted, data)
            })
        },
        pause: (trusted, data) => {
            this.props.tracker.then(tracker => {
                tracker.pause(trusted, data)
            })
        },
        mute: (trusted, data) => {
            this.props.tracker.then(tracker => {
                tracker.mute(trusted, data)
            })
        },
        unmute: (trusted, data) => {
            this.props.tracker.then(tracker => {
                tracker.unmute(trusted, data)
            })
        },
        timeupdate: (timestamp, data) => {
            this.props.tracker.then(tracker => {
                tracker.timeupdate(timestamp, data)
            })
        },
        durationchange: (duration, data) => {
            this.props.tracker.then(tracker => {
                tracker.durationchange(duration, data)
            })
        },
        error: (message, data) => {
            this.props.tracker.then(tracker => {
                tracker.error(message, data)
            })
        },
        metadataupdate: (data) => {
            this.props.tracker.then(tracker => {
                tracker.metadataupdate(data)
            })
        }
    };

    pause = (trusted) => {
        this.updateState({
            playing: false,
            lastTrusted: trusted
        })
    }

    play = (trusted) => {
        let muted = this.state.muted;
        if (!this.state.userMuted && trusted) {
            muted = false;
        }
        this.updateState({
            playing: true,
            lastTrusted: trusted,
            muted
        })
    }

    handleClick = (e) => {
        this.pause(true);
        if (this.props.onClick) {
            if (this.props.vast && this.props.vast.tracker) {
                this.props.vast.tracker.click(e)
            } else {
                this.props.onClick(this.externalAPI);
            }
        }
    }

    handleHover = (e) => {
        if (this.props.onHover) {
            this.props.onHover(e)
        }
    }

    togglePlayback = (trusted) => {
        if (this.state.playing) {
            this.pause(trusted)
        } else {
            this.play(trusted)
        }
    }

    toggleMute = (trusted) => {
        this.updateState({
            muted: !this.state.muted,
            userMuted: true
        }, () => {
            if (this.state.muted) {
                this.tracker.mute(trusted)
                if (this.props.onMute) {
                    this.props.onMute()
                }
            } else {
                this.tracker.unmute(trusted)
                if (this.props.onUnmute) {
                    this.props.onUnmute()
                }
            }
        })
    }

    mute = () => {
        this.updateState({
            muted: true,
            userMuted: true
        }, () => {
            this.tracker.mute(true)
            if (this.props.onMute) {
                this.props.onMute()
            }
        })
    }

    unMute = () => {
        this.updateState({
            muted: false,
            userMuted: true
        }, () => {
            this.tracker.unmute(true)
            if (this.props.onUnmute) {
                this.props.onUnmute()
            }
        })
    }

    updateState = (state, callback) => {
        if (this.mounted) {
            this.setState(state, callback)
        }
    }

    componentDidMount() {
        this.mounted = true;
        
        this.observer = new IntersectionObserver(this.handleObserver, {
            threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        })

        if (this.props.wrapper && this.props.wrapper.current) {
            this.observer.observe(this.props.wrapper.current)
        }

        this.updateState({
            assetType: getAssetType(this.props),
            playerType: getPlayerType(this.state.url),
            quality: this.getVideoQuality()
        }, () => {
            this.tracker.metadataupdate({
                url: this.state.url,
                assetType: this.state.assetType,
                playerType: this.state.playerType,
                quality: this.state.quality,
                autoplay: this.props.playing
            })

            if (this.props.onSetup) {
                this.props.onSetup(this.externalAPI)
            }
        })

        
        this.observer = new IntersectionObserver(this.handleObserver, {
            threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        })

        if (this.props.wrapper && this.props.wrapper.current) {
            this.observer.observe(this.props.wrapper.current)
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== this.state.url) {
            this.updateState({
                url: this.props.url,
                playerType: getPlayerType(this.props.url),
                assetType: getAssetType(this.props),
                quality: this.getVideoQuality(),
                duration: 0,
                played: 0,
                playedSeconds: 0,
                loaded: 0,
                loadedSeconds: 0,
                ended: false,
            }, () => {
                this.tracker.metadataupdate({
                    url: this.state.url,
                    assetType: this.state.assetType,
                    playerType: this.state.playerType,
                    quality: this.state.quality,
                    autoplay: this.props.playing
                })
                if (this.props.onSetup) {
                    this.props.onSetup(this.externalAPI)
                }
            })
        }

        if (this.props.playing !== prevProps.playing) {
            this.updateState({
                playing: this.props.playing
            })
        }
    }
    
    render() {
        let error;
        const classNames = this.props.context.api.useStyles(styles, this.props);
        const propNames = [
            'playing',
            'loop',
            'light',
            'muted',
            'playbackRate',
            'progressiveInterval',
            'config'
        ]
        
        const playerProps = {};
        
        const config = {
            youtube: {
                playerVars: {
                    modestbranding: 1,
                    controls: 1,
                    widget_referrer: this.constants.pageDomain,
                    rel: 0,
                    playsinline: 1,
                    fs: 0,
                    color: 'white',
                    disablekb: 1
                }
            }
        }

        for (let key in this.props) {
            if (propNames.includes(key)) {
                playerProps[key] = this.props[key];
            }
        }

        playerProps.width = 'calc(100% + 2px)';
        playerProps.height = 'calc(100% + 2px)';
        playerProps.playsinline = true;
        playerProps.muted = this.state.muted;
        playerProps.volume = null;
        playerProps.playing = this.state.playing;
        playerProps.ref = this.player;
        playerProps.progressInterval = 200;
        playerProps.className = classNames.videoPlayer;
        playerProps.config = Object.assign({}, config, this.props.config);

        if (this.state.assetType === 'hosted' && this.props.quality) {
            playerProps.url = this.state.url + '?quality=' + this.props.quality;
        }

        
        playerProps.onReady = () => {
            this.updateState({
                ready: true
            }, () => {
                if (this.props.onReady) {
                    this.props.onReady(this.externalAPI)
                }
            })
        }
        
        playerProps.onStart = () => {
            this.updateState({
                started: true
            }, () => {
                if (this.props.onStart) {
                    this.props.onStart(this.externalAPI)
                }
            })
        }

        playerProps.onPlay = () => {
            this.tracker.play(this.state.lastTrusted, {
                resume: (this.state.hasPlayed && !this.state.ended),
                rewind: (this.state.hasPlayed && this.state.ended)
            });
            this.updateState({
                playing: true,
                ended: false,
                shouldResume: false,
                hasPlayed: true,
                lastTrusted: undefined
            }, () => {
                if (this.props.onPlay) {
                    this.props.onPlay(this.externalAPI)
                }
            })
        }

        playerProps.onPause = () => {
            this.tracker.pause(this.state.lastTrusted);
            this.updateState({
                playing: false,
                lastTrusted: undefined
            }, () => {
                if (this.props.onPause) {
                    this.props.onPause(this.externalAPI)
                }
            })
        }

        playerProps.onProgress = ({ played, loaded, playedSeconds, loadedSeconds}) => {
            this.tracker.timeupdate(playedSeconds);
            let ended = this.state.ended;
            if (played !== 1) {
                ended = false
            }
            if (this.state.playing) {
                this.updateState({
                    ended,
                    played,
                    loaded,
                    playedSeconds,
                    loadedSeconds,
                }, () => {
                    if (this.props.onProgress) {
                        this.props.onProgress(this.externalAPI)
                    }
                })
            }
        }

        playerProps.onDuration = (duration) => {
            this.tracker.durationchange(duration);
            this.updateState({
                duration
            }, () => {
                if (this.props.onDuration) {
                    this.props.onDuration(this.externalAPI)
                }
            })
        }

        playerProps.onBuffer = () => {
            this.updateState({
                buffering: true
            }, () => {
                if (this.props.onBuffer) {
                    this.props.onBuffer(this.externalAPI)
                }
            })
        }

        playerProps.onBufferEnd = () => {
            this.updateState({
                buffering: false
            }, () => {
                if (this.props.onBufferEnd) {
                    this.props.onBufferEnd(this.externalAPI)
                }
            })
        }

        playerProps.onError = (err) => {
            const error = {
                code: 405
            }
            
            if (err.target && err.target.error) {
                if (err.target.error.code === 1) {
                    error.message = 'MediaFile Display Error: Request Aborted by User'
                } else if (err.target.error.code === 2) {
                    error.message = 'MediaFile Display Error: Network Error'
                } else if (err.target.error.code === 3) {
                    error.message = 'MediaFile Display Error: Decode Error'
                } else if (err.target.error.code === 4) {
                    error.message = 'MediaFile Display Error: Source Not Supported'
                } else {
                    error.message = 'MediaFile Display Error: Playback Error'
                }
            }

            this.tracker.error(error.message, {
                code: error.code
            });

            if (this.props.vast && this.props.vast.tracker) {
                this.props.vast.tracker.errorWithCode(error.code)
            }

            this.updateState({
                error: error,
                playing: false,
                buffering: false
            }, () => {
                if (this.props.onError) {
                    this.props.onError(this.externalAPI)
                }
            })
        }

        playerProps.onEnded = () => {
            let hasPlayed = this.state.hasPlayed;
            if (this.props.resetOnEnd) {
                hasPlayed = false;
            }
            this.updateState({
                hasPlayed,
                ended: true,
                playing: false
            }, () => {
                if (this.props.onError) {
                    this.props.onEnded(this.externalAPI)
                }
            })
        }

        if (this.props.pauseWhenNotVisible && this.state.shouldResume) {
            playerProps.playing = true;
        }

        if (this.props.pauseWhenNotVisible && !this.state.inView) {
            playerProps.playing = false;
        }

        if (this.state.error) {
            error = this.state.error
        }

        if (this.state.assetType === 'hosted') {
            if (this.state.quality) {
                playerProps.url = this.state.url + `?quality=${this.state.quality}`
            }
        } else if (this.state.assetType === 'vast') {
            if (this.props.vast && this.props.vast.error) {
                error = this.props.vast.error
            } else if (this.props.vast && this.props.vast.media && this.props.vast.media[this.state.quality]) {
                playerProps.url = this.props.vast.media[this.state.quality].fileURL;
            }
        } else {
            playerProps.url = this.state.url;
        }

        this.externalAPI = {
            ...this.state,
            play: () => this.play(true),
            pause: () => this.pause(true),
            mute: this.mute,
            unMute: this.unMute,
            toggleMute: () => this.toggleMute(true),
            togglePlayback: () => this.togglePlayback(true),
            setCurrentTime: (time) => this.updateState({
                currentTime: time
            }),
            handleClick: (e) => this.handleClick(e)
        }

        const VideoContext = this.props.Context;

        return (
            <VideoContext.Provider value={this.externalAPI}>
                {(playerProps.url) && (
                    <ReactPlayer {...playerProps}/>
                )}
                {(['vast', 'hosted', 'external'].includes(this.state.assetType)) && (
                    <Layer style={{width: '100%', height: '100%', top: 0, left: 0}} className={`${classNames.videoOverlay} video-overlay`} onClick={this.handleClick}>
                        {(this.props.renderOverlay) && (
                            <>
                                {this.props.renderOverlay(this.externalAPI)}
                            </>
                        )}
                    </Layer>
                )}
                {(!this.props.hideControls && ['vast', 'hosted', 'external'].includes(this.state.assetType)) && (
                    <Layer style={{
                        width: '100%',
                        height: 42,
                        left: 0,
                        bottom: 0
                    }} className={`${classNames.videoControls} video-controls`}>
                        <Layer
                            style={{
                                width: 30,
                                height: 30
                            }}
                            className={`${classNames.videoButton} toggle-playback`}
                            onClick={() => this.togglePlayback(true)}
                        >
                            <CircularProgressbarWithChildren value={this.state.played * 100} background backgroundPadding={2}>
                                {(this.state.playing) ? (
                                    <PauseIcon className="icon pause"/>
                                ) : (
                                    <>
                                        {(this.state.ended) ? (
                                            <RestartIcon className="icon restart"/>
                                        ) : (
                                            <PlayIcon className="icon play"/>
                                        )}
                                    </>
                                )}
                            </CircularProgressbarWithChildren>
                        </Layer>
                        <Layer
                            style={{
                                width: 30,
                                height: 30
                            }}
                            className={`${classNames.videoButton} video-controls-button toggle-mute`}
                            onClick={() => this.toggleMute(true)}
                        >
                            <CircularProgressbarWithChildren value={0} background backgroundPadding={2}>
                                {(this.state.muted) ? (
                                    <MutedIcon className="icon"/>
                                ) : (
                                    <UnMutedIcon className="icon"/>
                                )}
                            </CircularProgressbarWithChildren>
                        </Layer>
                    </Layer>
                )}
                {(!this.state.hasPlayed && ['vast', 'hosted', 'external'].includes(this.state.assetType) && !this.props.hidePoster) && (
                    <Layer className={`${classNames.videoPosterImage} video-poster-image`} style={{width: '100%', height: '100%', top: 0, left: 0}} image={this.props.posterImage} onClick={() => this.play(true)}>
                        <PlayIcon/>
                    </Layer>
                )}
                {(!this.state.hasPlayed && playerProps.playing && !error && !this.props.hideLoadingIcon) && (
                    <Layer className={`${classNames.videoButton} ${classNames.videoLoadingIcon} video-loading-icon`}>
                        <LoadingIcon className="icon spinning"/>
                    </Layer>
                )}
                {(error && !this.props.hideErrorIcon) && (
                    <Layer className={`${classNames.videoButton} ${classNames.videoLoadingIcon} video-error-icon`}>
                        <ErrorIcon className="icon"/><span style={{marginLeft: 6, fontSize: 12, top: -4, position: 'relative'}}>{error.code}</span>
                    </Layer>
                )}
                {(this.state.ended && (this.props.endFrameImage || this.props.renderEndFrame)) && (
                    <Layer className={`${classNames.videoEndframe} video-endframe`} style={{width: '100%', height: '100%', top: 0, left: 0}} image={this.props.endFrameImage} onClick={this.props.onEndFrameClick}>
                        {(this.props.renderEndFrame) && (
                            <>
                                {this.props.renderEndFrame(this.externalAPI)}
                            </>
                        )}
                    </Layer>
                )}
            </VideoContext.Provider>
        )
    }
}

export default VideoPlayer