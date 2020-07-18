import React from 'react';
import { Context } from './Context';
import { Layer } from './Layer';
import { IoIosPlay as PlayIcon } from 'react-icons/io';

export class VideoPlayer extends React.Component {
    static contextType = Context;
    
    trackers = {};
    
    state = {
        Player: false,
        tracker: null,
        playing: this.props.playing,
        url: this.props.url,
        trackingId: this.props.trackingId || this.props.url,
        wrapper: React.createRef(),
        vastData: null,
        vastUrl: null,
        error: null,
        quality: null,
    }

    handlePlay = () => {
        this.setState({
            playing: true
        })
    }

    componentDidUpdate(prevProps) {
        const trackingId = this.props.trackingId || this.props.url;
        const url = this.props.url;
        const state = {
            url: this.state.url,
            tracker: this.state.tracker,
            trackingId: this.state.trackingId,
            playing: this.state.playing
        }
        let hasChanged = false;
        
        if (this.props.playing !== prevProps.playing) {
            hasChanged = true;
            state.playing = this.props.playing;
        }
        
        if (url !== state.url) {
            hasChanged = true;
            state.url = this.props.url
            state.quality = this.chooseQuality();
        }

        if (trackingId !== state.trackingId) {
            hasChanged = true;
            state.trackingId = trackingId;
            state.tracker = this.context.api.trackVideo(trackingId)
        }
        
        if (hasChanged) {
            this.setState(state);
        }
    }

    chooseQuality = () => {
        let width = this.context.width;
        if (Number(this.props.width)) {
            width = this.props.width
        } else if (this.state.wrapper.current && this.state.wrapper.current.offsetWidth) {
            width = this.state.wrapper.current.offsetWidth;
        }
        if (['max', 'best', 'good', 'eco', 'low'].includes(this.props.quality)) {
            return this.props.quality;
        } else {
            if (width < 450) {
                return 'low'
            } else if (width < 630) {
                return 'eco'
            } else if (width < 900) {
                return 'good'
            } else if (width < 1200) {
                return 'best'
            } else {
                return 'max'
            }
        }
    }

    detectVideoSupport = () => {
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

    componentDidMount() {
        const url = `${this.context.constants.templateLibraryRoot}/assets/specless.VideoPlayer.js`;
        const importPromise = import(/* webpackIgnore: true */url);
        const quality = this.chooseQuality();
        importPromise.then(mod => {
            this.setState({
                Player: mod.default,
                tracker: this.context.api.trackVideo(this.state.trackingId),
                quality: quality
            })
        })
        if (this.props.url && this.props.url.startsWith('vastTagUrl=')) {
            const fileTypes = this.detectVideoSupport().join(',');
            const vastTag = escape(this.props.url.replace('vastTagUrl=', ''));
            console.log(vastTag);
            fetch(`https://server.specless.app/vast?cb=${Date.now()}&fileTypes=${fileTypes}&vastTagUrl=${vastTag}`).then(response => {
                response.json().then(vast => {
                    console.log(vast);
                    let vastUrl;
                    if (vast.media && vast.media[quality] && vast.media[quality].fileURL) {
                        vastUrl = vast.media[quality].fileURL;
                    } else if (vast.media) {
                        for (key in vast.media) {
                            if (vast.media[key] && vast.media[key].fileURL) {
                                vastUrl = vast.media[key].fileURL;
                                break
                            }
                        }
                    }
                    this.setState({
                        vastData: vast,
                        vastUrl: vastUrl
                    })
                })
            })
        }
    }

    render() {
        const Player = this.state.Player;
        let waitForVast = false;
        if (this.props.url && this.props.url.startsWith('vastTagUrl=')) {
            waitForVast = true;
        }

        const styles = this.context.api.useStyles({
            'video-player-wrapper': {
                overflow: 'hidden',
                backgroundColor: '#000',
                '@global': {
                    '.video-poster-image img': {
                        objectFit: 'cover'
                    },
                    '.video-poster-image svg': {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#fff',
                        fontSize: 40,
                        backgroundColor: 'rgba(102, 102, 102,0.35)',
                        padding: '9px 7px 9px 11px',
                        borderRadius: '50%',
                        opacity: 0.8
                    },
                    '.video-poster-image:hover svg': {
                        opacity: 1
                    }
                }
            }
        })

        const wrapperProps = {
            width: this.props.width,
            height: this.props.height,
            top: this.props.top,
            bottom: this.props.bottom,
            left: this.props.left,
            onHover: this.props.onHover,
            onMouseEnter: this.props.onMouseEnter,
            onMouseLeave: this.props.onMouseLeave,
            onMouseOver: this.props.onMouseOver,
            onMouseOut: this.props.onMouseOut,
            className: styles['video-player-wrapper']
        }

        if (this.props.className) {
            wrapperProps.className = wrapperProps.className + ' ' + this.props.className;
        }

        const playerProps = Object.assign({}, this.props);
        playerProps.playing = this.state.playing;
        playerProps.url = this.state.url;
        playerProps.trackingId = this.state.trackingId;

        if (this.state.vastUrl) {
            playerProps.url = this.state.vastUrl;
        }

        if (!Player || (waitForVast && !this.state.vastUrl)) {
            return (
                <Layer {...wrapperProps} elementRef={this.state.wrapper}>
                    <Layer className="video-poster-image" width="100%" height="100%" image={this.props.posterImage} top={0} left={0} onClick={this.handlePlay}>
                        <PlayIcon/>
                    </Layer>
                </Layer>
            )
        }
        
        return (
            <Layer {...wrapperProps} elementRef={this.state.wrapper}>
                <Player {...playerProps} context={this.context} tracker={this.state.tracker} wrapper={this.state.wrapper} ref={this.props.playerRef} error={this.state.error} quality={this.state.quality} vastData={this.state.vastData}/>
            </Layer>
        )
    }
}