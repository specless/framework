import React from 'react';
import { Context } from './Context';
import { Layer } from './Layer';
import { GenIcon } from 'react-icons/lib';
import { Component } from './Component';

const PlayIcon = (props) => {
    return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M128 104.3v303.4c0 6.4 6.5 10.4 11.7 7.2l240.5-151.7c5.1-3.2 5.1-11.1 0-14.3L139.7 97.2c-5.2-3.3-11.7.7-11.7 7.1z"}}]})(props);
}

export class VideoPlayer extends Component {
    static Context = React.createContext({});
    static contextType = Context;
    
    trackers = {};
    
    state = {
        Player: false,
        tracker: null,
        playing: this.props.playing,
        url: this.props.url,
        id: this.props.id,
        wrapper: this.props.elementRef || React.createRef(),
        vast: null,
        error: null,
        vastXml: this.props.vastXml
    }

    handlePlay = () => {
        this.setState({
            playing: true
        })
    }

    loadVAST = (vastSource, mediaType, tracker) => {
        let src = vastSource;
        if (vastSource.startsWith('vast://')) {
            src = vastSource.replace('vast://', 'https://');
        }
        return new Promise((resolve) => {
            this.parseVAST(src, mediaType).then(vast => {
                if (vast.error) {
                    tracker.then(tracker => {
                        tracker.error(vast.error.message, {
                            code: vast.error.code
                        })
                    })
                }

                this.setState({
                    vast
                }, () => {
                    resolve(vast)
                })
            })
        })
    }

    componentDidCatch(err) {
        this.setState({
            renderError: err
        }, () => {
            this.trackError({
                code: 'RENDER_ERROR',
                msg: err.message,
                caughtByComponent: 'VideoPlayer',
                caughtById: this.props.trackingName || this.props.id || null
            })
        })
    }

    componentDidUpdate(prevProps) {
        const state = {
            url: this.state.url,
            tracker: this.state.tracker,
            playing: this.state.playing,
        }
        let hasChanged = false;
        let trackingChanged = false;
        
        if (this.props.playing !== prevProps.playing) {
            hasChanged = true;
            state.playing = this.props.playing;
        }
        
        if (this.props.url !== state.url || this.props.vastXml !== state.vastXml) {
            hasChanged = true;
            trackingChanged = true;
            state.url = this.props.url;
            state.vastXML = this.props.vastXml;
            state.tracker = this.context.api.trackVideo(this.props.trackingName, {
                url: this.props.url || null,
                autoplay: this.props.playing
            });
            
            if (this.props.url && this.props.url.startsWith('vast://')) {
                state.vast = null;
                this.loadVAST(this.props.url, this.props.vastMediaTypes, state.tracker);
            } else if (this.props.vastXml) {
                this.loadVAST(this.props.vastXML, this.props.vastMediaTypes, state.tracker);
            }
        }
        
        if (hasChanged) {
            if (trackingChanged) {
                state.tracker.then((tracker, id) => {
                    state.id = id;
                    this.setState(state);
                })
            } else {
                this.setState(state);
            }
        }
    }

    componentDidMount() {
        const url = `${this.context.constants.templateLibraryRoot}/assets/specless.VideoPlayer.js`;
        const tracker = this.context.api.trackVideo(this.props.trackingName, {
            url: this.props.url || null,
            autoplay: this.props.playing
        });
        
        tracker.then((tracker, id) => {
            this.setState({
                id: id
            })
        })

        import(/* webpackIgnore: true */url).then(mod => {
            this.setState({
                Player: mod.default,
                tracker: tracker
            })
        });

        if (this.props.url && this.props.url.startsWith('vast://')) {
            this.loadVAST(this.props.url, this.props.vastMediaTypes, tracker);
        } else if (this.props.vastXml) {
            this.loadVAST(this.props.vastXML, this.props.vastMediaTypes, tracker);
        }
    }

    render() {

        if (this.state.renderError || this.props.hidden) {
            return <></>
        }

        const Player = this.state.Player;

        const styles = this.context.api.useStyles({
            'video-player-wrapper': {
                overflow: 'hidden',
                boxSizing: 'border-box',
                backgroundColor: (props) => {
                    if (props.style && (props.style.background || props.style.backgroundColor)) {
                        return props.style.background || props.style.backgroundColor
                    } else {
                        return '#000'
                    }
                },
                '@global': {
                    '.video-poster-image img': {
                        objectFit: 'cover'
                    },
                    '.video-poster-image svg': {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: (props) => {
                            if (props.style && props.style.color) {
                                return props.style.color
                            } else {
                                return '#fff'
                            }
                        },
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
        }, this.props)

        const wrapperProps = {
            style: this.props.style || {},
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
        delete playerProps.style;
        playerProps.playing = this.state.playing;
        playerProps.url = this.state.url;
        playerProps.id = this.state.id;
        playerProps.vast = this.state.vast;
        playerProps.backgroundColor = wrapperProps.style.backgroundColor || wrapperProps.style.background;
        playerProps.controlsColor = wrapperProps.style.color;


        if (!Player) {
            return (
                <Layer {...wrapperProps} elementRef={this.state.wrapper}>
                    {this.renderStyleSheet()}
                    {(!this.props.hidePoster) && (
                        <Layer className="video-poster-image" style={{width: '100%', height: '100%', top: 0, left: 0}} image={this.props.posterImage} onClick={this.handlePlay}>
                            <PlayIcon/>
                        </Layer>
                    )}
                </Layer>
            )
        }
        
        return (
            <Layer {...wrapperProps} elementRef={this.state.wrapper}>
                {this.renderStyleSheet()}
                <Player {...playerProps} context={this.context} tracker={this.state.tracker} wrapper={this.state.wrapper} ref={this.props.playerRef} error={this.state.error} Context={VideoPlayer.Context}/>
            </Layer>
        )
    }
}