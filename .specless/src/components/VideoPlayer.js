import React from 'react';
import { Context } from './Context';
import { Layer } from './Layer';
import { IoIosPlay as PlayIcon } from 'react-icons/io';
import { parseVAST } from '@specless/utils';

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
        vast: null,
        error: null,
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
            state.url = this.props.url;
            if (this.props.url && this.props.url.startsWith('vast://')) {
                state.vast = null;
                const vastURL = this.props.url.replace('vast://', 'https://');
                this.context.api.parseVAST(vastURL, this.props.mediaType).then(vast => {
                    this.setState({
                        vast
                    })
                })
            }
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

    componentDidMount() {
        const url = `${this.context.constants.templateLibraryRoot}/assets/specless.VideoPlayer.js`;
        import(/* webpackIgnore: true */url).then(mod => {
            this.setState({
                Player: mod.default,
                tracker: this.context.api.trackVideo(this.state.trackingId)
            })
        });
        if (this.props.url && this.props.url.startsWith('vast://')) {
            const vastURL = this.props.url.replace('vast://', 'https://');
            this.context.api.parseVAST(vastURL, this.props.mediaType).then(vast => {
                this.setState({
                    vast: vast
                })
            })
        }
    }

    render() {
        const Player = this.state.Player;

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
            style: this.props.style,
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
        playerProps.vast = this.state.vast;


        if (!Player) {
            return (
                <Layer {...wrapperProps} elementRef={this.state.wrapper}>
                    <Layer className="video-poster-image" style={{width: '100%', height: '100%', top: 0, left: 0}} image={this.props.posterImage} onClick={this.handlePlay}>
                        <PlayIcon/>
                    </Layer>
                </Layer>
            )
        }
        
        return (
            <Layer {...wrapperProps} elementRef={this.state.wrapper}>
                <Player {...playerProps} context={this.context} tracker={this.state.tracker} wrapper={this.state.wrapper} ref={this.props.playerRef} error={this.state.error}/>
            </Layer>
        )
    }
}