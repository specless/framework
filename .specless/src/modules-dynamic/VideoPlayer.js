import React from 'react';
import ReactPlayer from 'react-player';
import players from 'react-player/lib/players';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { Layer, Component } from '@specless/components';
import {
    IoIosPause as PauseIcon,
    IoIosPlay as PlayIcon,
    IoIosWarning as ErrorIcon
} from 'react-icons/io';
import {
    FiVolumeX as MutedIcon,
    FiVolume2 as UnMutedIcon
} from 'react-icons/fi';
import {
    AiOutlineLoading3Quarters as LoadingIcon
} from 'react-icons/ai';
import { VASTTracker } from 'vast-client';

const config = {
    youtube: {
        playerVars: {
            modestbranding: 1
        }
    }
}

const styles = {
    '@global': {
        '.video-player': {
            position: 'absolute',
            top: -1,
            left: -1,
            zIndex: 0
        },
        '@keyframes spin': {
            from: {
                transform: 'rotate(0deg)'
            },
            to: {
                transform: 'rotate(360deg)'
            }
        },
        '.video-player > div': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        '.video-overlay': {
            zIndex: 1
        },
        '.video-controls': {
            color: '#fff',
            zIndex: 2
        },
        '.video-poster-image': {
            zIndex: 3
        },
        '.video-endframe': {
            zIndex: 4
        },
        '.video-controls-button, .video-loading-icon': {
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
            }
        },
        '.video-loading-icon': {
            color: '#fff',
            zIndex: 4,
            top: 0,
            left: 0,
        },
        '.video-loading-icon .spinning': {
            animationName: 'spin',
            animationDuration: '2500ms',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
        },
        '.video-controls-button .icon': {
            position: 'relative',
            '&.play': {
                left: '1px'
            }
        },
        '.video-controls .CircularProgressbar' : {
            width: '100%',
            verticalAlign: 'middle'
        },
        '.video-controls .CircularProgressbar .CircularProgressbar-path': {
            stroke: '#fff',
            strokeLinecap: 'round',
            transition: 'stroke-dashoffset 0.5s ease 0s',
        },
        '.video-controls .CircularProgressbar .CircularProgressbar-trail': {
            stroke: 'transparent',
            strokeLinecap: 'round'
        },
        '.video-controls .CircularProgressbar .CircularProgressbar-text': {
            fill: '#3e98c7',
            fontSize: 20,
            dominantBaseline: 'middle',
            textAnchor: 'middle'
        },
        '.video-controls .CircularProgressbar .CircularProgressbar-background': {
            fill: 'rgba(102, 102, 102,0.35)'
        },
        '.video-controls .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-background': {
            fill: '#3e98c7'
        },
        '.video-controls .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text': {
            fill: '#fff'
        },
        '.video-controls .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path': {
            stroke: '#fff'
        },
        '.video-controls .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail' : {
            stroke: 'transparent'
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
        if (['low', 'eco', 'good', 'best'].includes(this.props.quality)) {
            return this.props.quality
        }

        let width = 480;
        let height = 269;
        if (this.props.wrapper && this.props.wrapper.current) {
            const rect = this.props.wrapper.current.getBoundingClientRect();
            let scale = window.devicePixelRatio;
            if (scale > 1.5) {
                scale = 1.5
            }
            width = rect.width * scale;
            height = rect.height * scale;
        }
        const effectiveType = (navigator.connection && navigator.connection.effectiveType) || '4g'
        const pDim = width >= height ? width : height
        if (effectiveType.includes('2g')){
            return 'low'
        }
        if (effectiveType == '3g' && pDim >= 360){
            return 'eco'
        }
        // NOTE: Order is important
        if (pDim < 360){
            return 'low'
        }
        if (pDim < 480){
            return 'eco'
        }
        if (pDim < 576){
            return 'good'
        }
        return 'best'
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
        if (event.data && event.data.id === this.props.trackingId) {
            if (this.state.assetType === 'vast' && this.props.vast && this.props.vast.tracker) {
                if (!this.vastTrackers[this.props.trackingId]) {
                    this.vastTrackers[this.props.trackingId] = this.props.vast.tracker;
                    const events = [
                        'complete',
                        'clickthrough',
                        'creativeView',
                        'firstQuartile',
                        'midpoint',
                        'mute',
                        'pause',
                        'resume',
                        'rewind',
                        'start',
                        'thirdQuartile',
                        'unmute'
                    ]
                    this.props.vast.tracker.on('clickthrough', (url) => {
                        const clickUrl = url || this.props.vast.creative.videoClickThroughURLTemplate;
                        if (this.props.onClick) {
                            this.props.onClick(clickUrl)
                        }
                    })
                    this.vastTrackers[this.props.trackingId].trackImpression();
                }
                this.trackVastEvent(this.vastTrackers[this.props.trackingId], event);
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
        play: (trusted) => {
            this.props.tracker.then(tracker => {
                tracker.play(trusted)
            })
        },
        pause: (trusted) => {
            this.props.tracker.then(tracker => {
                tracker.pause(trusted)
            })
        },
        mute: (trusted) => {
            this.props.tracker.then(tracker => {
                tracker.mute(trusted)
            })
        },
        unmute: (trusted) => {
            this.props.tracker.then(tracker => {
                tracker.unmute(trusted)
            })
        },
        timeupdate: (timestamp) => {
            this.props.tracker.then(tracker => {
                tracker.timeupdate(timestamp)
            })
        },
        durationchange: (duration) => {
            this.props.tracker.then(tracker => {
                tracker.durationchange(duration)
            })
        },
        error: (err) => {
            this.props.tracker.then(tracker => {
                tracker.error(err)
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

    playVideo = () => {
        this.play(true);
    }

    pauseVideo = () => {
        this.pause(true)
    }

    handleClick = (e) => {
        this.pause(true);
        if (this.props.onClick) {
            if (this.props.vast && this.props.vast.tracker) {
                this.props.vast.tracker.click(e)
            } else {
                this.props.onClick()
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
            this.props.context.api.track('video_meta_data', {
                assetType: this.state.assetType,
                quality: this.state.quality
            })
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
        this.observer.disconnect();
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
        this.props.context.api.useStyles(styles);
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
        playerProps.className = 'video-player';
        playerProps.config = config;

        if (this.state.assetType === 'hosted' && this.props.quality) {
            playerProps.url = this.state.url + '?quality=' + this.props.quality;
        }

        
        playerProps.onReady = () => {
            this.updateState({
                ready: true
            }, () => {
                if (this.props.onReady) {
                    this.props.onReady()
                }
            })
        }
        
        playerProps.onStart = () => {
            this.updateState({
                started: true
            }, () => {
                if (this.props.onStart) {
                    this.props.onStart()
                }
            })
        }

        playerProps.onPlay = () => {
            this.tracker.play(this.state.lastTrusted);
            this.updateState({
                playing: true,
                ended: false,
                shouldResume: false,
                hasPlayed: true,
                lastTrusted: undefined
            }, () => {
                if (this.props.onPlay) {
                    this.props.onPlay()
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
                    this.props.onPause()
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
                        this.props.onProgress({ played, loaded, playedSeconds, loadedSeconds})
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
                    this.props.onDuration(duration)
                }
            })
        }

        playerProps.onBuffer = () => {
            this.updateState({
                buffering: true
            }, () => {
                if (this.props.onBuffer) {
                    this.props.onBuffer()
                }
            })
        }

        playerProps.onBufferEnd = () => {
            this.updateState({
                buffering: false
            }, () => {
                if (this.props.onBufferEnd) {
                    this.props.onBufferEnd()
                }
            })
        }

        playerProps.onError = (err) => {
            this.tracker.error(err);
            this.updateState({
                error: true,
                playing: false,
                buffering: false
            }, () => {
                if (this.props.onError) {
                    this.props.onError(err)
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
                    this.props.onEnded()
                }
            })
        }

        if (this.props.pauseWhenNotVisible && this.state.shouldResume) {
            playerProps.playing = true;
        }

        if (this.props.pauseWhenNotVisible && !this.state.inView) {
            playerProps.playing = false;
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

        console.log(this.state.quality);

        return (
            <>
                {(playerProps.url) && (
                    <ReactPlayer {...playerProps}/>
                )}
                <Layer style={{width: '100%', height: '100%', top: 0, left: 0}} className="video-overlay" onClick={this.handleClick}>
                    {this.props.children}
                </Layer>
                <Layer style={{
                    width: '100%',
                    height: 42,
                    left: 0,
                    bottom: 0
                }} className="video-controls">
                    <Layer
                        style={{
                            width: 30,
                            height: 30
                        }}
                        className="video-controls-button toggle-playback"
                        onClick={() => this.togglePlayback(true)}
                    >
                        <CircularProgressbarWithChildren value={this.state.played * 100} background backgroundPadding={2}>
                            {(this.state.playing) ? (
                                <PauseIcon className="icon pause"/>
                            ) : (
                                <PlayIcon className="icon play"/>
                            )}
                        </CircularProgressbarWithChildren>
                    </Layer>
                    <Layer
                        style={{
                            width: 30,
                            height: 30
                        }}
                        className='video-controls-button toggle-mute'
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
                {(!this.state.hasPlayed) && (
                    <Layer className="video-poster-image" style={{width: '100%', height: '100%', top: 0, left: 0}} image={this.props.posterImage} onClick={() => this.play(true)}>
                        <PlayIcon/>
                    </Layer>
                )}
                {(!this.state.hasPlayed && playerProps.playing && !error) && (
                    <Layer className="video-loading-icon">
                        <LoadingIcon className="icon spinning"/>
                    </Layer>
                )}
                {(error) && (
                    <Layer className="video-loading-icon">
                        <ErrorIcon className="icon"/><span style={{marginLeft: 6, fontSize: 12, top: -4, position: 'relative'}}>{error.code}</span>
                    </Layer>
                )}
                {(this.props.endFrame && this.state.ended) && (
                    <Layer className="video-endframe" style={{width: '100%', height: '100%', top: 0, left: 0}} image={this.props.posterImage} onClick={() => this.play(true)}>
                        {this.props.endFrame}
                    </Layer>
                )}
            </>
        )
    }
}

export default VideoPlayer