import React from 'react';
import { Context } from './Context';

const getStyles = (element, context) => {
    const { spx } = context.api;
    const style = {
        top: 0,
        left: 0,
        pointerEvents: 'auto',
        position: 'absolute'
    };
    if (element.type === 'video' || element.type === 'carousel') {
        style.backgroundColor = '#000000';
    }

    if (element.styles) {
        style.backgroundColor = element.styles.backgroundColor || style.backgroundColor;
        style.borderColor = element.styles.borderColor;
        style.borderRadius = spx(element.styles.borderRadius);
        style.borderStyle = element.styles.borderStyle;
        style.borderWidth = spx(element.styles.borderWidth);
        style.paddingTop = spx(element.styles.paddingTop);
        style.paddingRight = spx(element.styles.paddingRight);
        style.paddingBottom = spx(element.styles.paddingBottom);
        style.paddingLeft = spx(element.styles.paddingLeft);
        style.marginTop = spx(element.styles.marginTop);
        style.marginRight = spx(element.styles.marginRight);
        style.marginBottom = spx(element.styles.marginBottom);
        style.marginLeft = spx(element.styles.marginLeft);
        style.opacity = element.styles.opacity || 1;
        style.transform = 'translateX(0) translateY(0) scale(1) rotate(0)';

        if (element.styles.shadowX || element.styles.shadowY || element.styles.shadowBlur) {
            const shadowX = spx(element.styles.shadowX || 0);
            const shadowY = spx(element.styles.shadowY || 0);
            const shadowBlur = spx(element.styles.shadowBlur || 0);
            style.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${element.styles.shadowColor}`;
        }
    }
    return style
}

const getDefaultProps = (element) => {
    const styles = element.styles || {};
    return {
        x: 0,
        y: 0,
        scale: 1,
        opacity: styles.opacity || 1,
        rotate: 0
    }
}

const getAnimationProps = (element) => {
    const animation = element.animation || {};
    const styles = element.styles || {};
    const props = {
        x: 0,
        y: 0,
        scale: 1,
        opacity: styles.opacity || 1,
        rotate: 0
    }

    if (animation.translateXEnabled) {
        props.x = animation.translateX;
    }

    if (animation.translateYEnabled) {
        props.y = animation.translateY;
    }

    if (animation.scaleEnabled) {
        props.scale = animation.scale;
    }

    if (animation.opacityEnabled) {
        props.opacity = animation.opacity;
    }

    if (animation.rotateEnabled) {
        props.rotate = animation.rotate;
    }

    return props
}

const getActions = (element, runAction, listeners) => {
    const actions = {};
    const actionProps = {};
    if (element.actions) {
        element.actions.forEach(item => {
            if (item.event && item.target && item.action) {
                if (!actions[item.event]) {
                    actions[item.event] = [];
                }
                actions[item.event].push(item);
            }
        })
    }

    if (listeners) {
        for (let key in listeners) {
            if (!actions[key]) {
                actions[key] = [];
            }
            actions[key].push(listeners[key])
        }
    }

    for (let key in actions) {
        actionProps[key] = (arg1, arg2) => {
            actions[key].forEach((item) => {
                if (typeof item === 'function') {
                    item(arg1, arg2);
                } else {
                    runAction(item);
                }
            })
        }
    }

    return actionProps
}

const renderText = ({element, settings, context, runAction}) => {
    let styleEl = <></>;
    const textStyles = {};
    const actionProps = getActions(element, runAction);
    
    if (element.textStyles) {
        
        textStyles.fontFamily = element.textStyles.fontFamily;
        textStyles.fontSize = context.api.spx(element.textStyles.fontSize);
        textStyles.fontWeight = element.textStyles.fontWeight;
        textStyles.color = element.textStyles.color;
        textStyles.textTransform = element.textStyles.textTransform;
        textStyles.lineHeight = element.textStyles.lineHeight;
        textStyles.letterSpacing = element.textStyles.letterSpacing + 'em';
        textStyles.textAlign = element.textStyles.textAlign;
        textStyles.display = 'inline-block';
        
        if (element.textStyles.fontFamily) {
            const fontFamily = element.textStyles.fontFamily.split(' ').join('+');
            const fontWeight = textStyles.fontWeight || 400;
            styleEl = (
                <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css?family=${fontFamily}:${fontWeight}&display=block')`}}/>
            )
        }
    }
    return (
        <>
            {styleEl}
            <span style={textStyles} {...actionProps}>
                {element.text}
            </span>
        </>
    )
}

const renderImage = ({element, settings, context, style, runAction}) => {
    const image = context.api.url(element.image);
    const actionProps = getActions(element, runAction);
    return (
        <img src={image} style={{
            display: 'inline-block',
            top: 0,
            left: 0,
            width: style.width || '100%',
            height: style.height || '100%',
            objectFit: element.objectFit
        }} {...actionProps}/>
    )
}

const renderVideo = ({element, settings, context, style, createRef, runAction, state, listeners}) => {
    const { VideoPlayer } = context.componentLibrary;
    const actionProps = getActions(element, runAction, listeners);
    const playerProps = Object.assign({
        url: context.api.url(element.video),
        width: style.width || '100%',
        height: style.height || '100%',
        style: {
            top: 0,
            left: 0
        },
        playerRef: createRef(element.id),
    }, element.videoSettings, actionProps);

    if (playerProps.posterImage) {
        playerProps.posterImage = context.api.url(playerProps.posterImage);
    }

    if (state.hidden || ['hidden', 'hiding', 'showing'].includes(state.visibility)) {
        playerProps.playing = false;
    }

    return <VideoPlayer key={element.id} {...playerProps}/>
}

const renderCarousel = ({element, settings, context, style, createRef, state, runAction}) => {
    const { Carousel } = context.componentLibrary;
    const [slideIndex, setSlide] = React.useState(0);
    const actionProps = getActions(element, runAction, {
        onSlideChange: (index) => {
            setSlide(index)
        }
    });
    const carouselProps = Object.assign({}, element.carousel, actionProps);
    carouselProps.width = style.width || '100%';
    carouselProps.height = style.height || '100%';
    let slides = [];
    if (element.slides && element.slides.items) {
        slides = element.slides.items
    }
    return (
        <Carousel {...carouselProps} carouselRef={createRef(element.id)} key={element.id}>
            {slides.map((slide, index) => {
                let content = <></>;
                if (!slide.objectFit) {
                    slide.objectFit = 'cover'
                }
                const style = getStyles(slide, context);
                style.width = '100%';
                style.height = '100%';
                style.position = 'relative';
                style.boxSizing = 'border-box';

                if (slide.type === 'video') {
                    let playing = false;
                    if (slide.videoSettings && slide.videoSettings.playing) {
                        playing = true;
                    }
                    const [isPlaying, setPlaying] = React.useState(playing);
                    const videoSettings = Object.assign({}, slide.videoSettings);
                    videoSettings.playing = isPlaying;
                    if (slideIndex !== index) {
                        videoSettings.playing = false
                    }
                    const slideSettings = Object.assign({}, slide, {
                        videoSettings
                    })
                    content = renderVideo({
                        element: slideSettings,
                        settings: {},
                        context: context,
                        style: style,
                        state,
                        runAction,
                        createRef,
                        listeners: {
                            onPlay: () => {
                                setPlaying(true)
                            },
                            onPause: () => {
                                setPlaying(false)
                            }
                        }
                    })
                } else if (slide.type === 'image') {
                    content = renderImage({
                        element: slide,
                        settings: {},
                        context: context,
                        style: style,
                        state,
                        createRef
                    })
                }

                return (
                    <Carousel.Slide key={slide.id} id={slide.id}>
                        <div style={style}>
                            {content}
                        </div>
                    </Carousel.Slide>
                )
            })}
        </Carousel>
    )
}

const elementTypes = {
    text: renderText,
    image: renderImage,
    video: renderVideo,
    carousel: renderCarousel
}

export class Elements extends React.Component {
    static contextType = Context;

    constructor(props) {
        super(props);
        this.refs = {};
        this.tweenLibrary = new Promise((resolve, reject) => {
            this.resolveLoad = resolve;
            this.rejectLoad = reject;
        })
    }

    state = {
        animate: false,
        visibility: 0,
        viewportProgressY: 0,
        parallaxReady: false,
        interactive: false,
        videoStarted: false,
        animatedItems: [],
        elementsState: {},
        hiddenElements: {}
    }

    tween = (config) => {
        this.tweenLibrary.then(Tween => {
            Tween(config);
        })
    }

    createRef = (id) => {
        if (!this.refs[id]) {
            this.refs[id] = React.createRef();
        }
        return this.refs[id];
    }

    getElement = (id) => {
        let elements = {
            items: []
        }
        let element = {
            id: id
        }
        
        if (this.props.elements) {
            if (typeof this.props.elements === 'string') {
                elements = JSON.parse(this.props.elements);
            } else {
                elements = this.props.elements;
            }
        }

        if (elements.items) {
            elements.items.forEach(item => {
                if (item.id === id) {
                    element = item;
                }
            })
        }

        if (!id) {
            return elements.items || []
        }

        return element
    }

    getElementState = (id) => {
        const design = this.getElementDesign(id);
        const element = this.getElement(id);
        let state = {
            hidden: false,
            visibility: 'shown',
            hasShown: true,
            animation: 'animatedIn'
        }
        if (this.state.elementsState[id]) {
            state = Object.assign({}, this.state.elementsState[id]);
        } else {
            if (element.animation && element.animation.enabled) {
                if (element.animation.trigger !== 'animate') {
                    state.visibility = 'hidden';
                }
                state.animation = 'animatedOut';
                if (design.hidden) {
                    state.hasShown = false;
                }
            }
        }
        if (design.hidden) {
            state.hidden = true;
        }

        return state
    }

    getElementDesign = (id) => {
        let design = {};
        let element = {}
        if (this.props.design) {
            if (typeof this.props.design === 'string') {
                design = JSON.parse(this.props.design);
            } else {
                design = this.props.design;
            }
        }
        if (design.items && design.items[id]) {
            element = design.items[id];
        }
        return element;
    }

    hideStart = (id) => {
        const { elementsState } = this.state;
        const state = this.getElementState(id);
        const element = this.getElement(id);
        if (!state.hidden) {
            if (state.visibility !== 'hiding' && !state.visibility !== 'hidden') {
                if (element.animation && element.animation.enabled) {
                    state.visibility = 'hiding';
                    state.animation = 'animatingOut';
                    let duration = (element.animation.duration || 0) * 1000;
                    elementsState[id] = state;
                    this.setState({
                        elementsState
                    })
                    setTimeout(() => {
                        this.hideEnd(id);
                    }, duration)
                } else {
                    this.hideEnd(id);
                }
            }
        }
    }

    hideEnd = (id) => {
        const { elementsState } = this.state;
        const state = this.getElementState(id);
        const element = this.getElement(id);
        state.visibility = 'hidden';
        state.animation = 'animatedOut';
        elementsState[id] = state;
        this.setState({
            elementsState
        })
    }

    showStart = (id) => {
        const { elementsState } = this.state;
        const state = this.getElementState(id);
        const element = this.getElement(id);
        if (!state.hidden) {
            if (state.visibility !== 'showing' && state.visibility !== 'shown') {
                if (element.animation && element.animation.enabled) {
                    state.visibility = 'showing';
                    state.animation = 'animatingIn';
                    state.hasShown = true;
                    elementsState[id] = state;
                    let duration = (element.animation.duration || 0) * 1000;
                    this.setState({
                        elementsState
                    })
                    window.setTimeout(() => {
                        this.showEnd(id);
                    }, duration)
                } else {
                    this.showEnd(id);
                }
            }
        }
    }

    showEnd = (id) => {
        const { elementsState } = this.state;
        const state = this.getElementState(id);
        const element = this.getElement(id);
        state.visibility = 'shown';
        state.animation = 'animatedIn';
        elementsState[id] = state;
        this.setState({
            elementsState
        })
    }

    animateIn = (id) => {
        const { elementsState } = this.state;
        const state = this.getElementState(id);
        const element = this.getElement(id);
        if (element.animation && element.animation.enabled) {
            state.animation = 'animatingIn';
            elementsState[id] = state;
            let duration = (element.animation.duration || 0) * 1000;
            this.setState({
                elementsState
            })
            window.setTimeout(() => {
                const newState = this.getElementState(id);
                const newElementsState = this.state.elementsState;
                newState.animation = 'animatedIn';
                newElementsState[id] = newState;
                this.setState({
                    elementsState: newElementsState
                });
            }, duration)
        }
    }

    animateOut = (id) => {
        const { elementsState } = this.state;
        const state = this.getElementState(id);
        const element = this.getElement(id);
        if (element.animation && element.animation.enabled) {
            state.animation = 'animatingOut';
            elementsState[id] = state;
            let duration = (element.animation.duration || 0) * 1000;
            this.setState({
                elementsState
            })
            window.setTimeout(() => {
                const newState = this.getElementState(id);
                const newElementsState = this.state.elementsState;
                newState.animation = 'animatedOut';
                newElementsState[id] = newState;
                this.setState({
                    elementsState: newElementsState
                });
            }, duration)
        }
    }

    runAction = (action) => {
        const ref = this.refs[action.target];
        if (action.target === '_ad') {
            if (action.action === 'fireTracker') {
                this.context.api.track(action.argument);
            } else if (action.action === 'openClickThrough') {
                this.context.api.exit(action.argument);
            } else if (action.action === 'requestClose') {
                this.context.api.request('close');
            } else if (action.action === 'requestExpand') {
                this.context.api.request('expand');
            } else if (action.action === 'requestCollapse') {
                this.context.api.request('collapse');
            }
        } else {
            if (action.action === 'hide') {
                this.hideStart(action.target);
            } else if (action.action === 'show') {
                this.showStart(action.target);
            } else if (action.action === 'animateIn') {
                this.animateIn(action.target);
            } else if (action.action === 'animateOut') {
                this.animateOut(action.target);
            } else if (ref && ref.current && ref.current[action.action]) {
                ref.current[action.action](action.argument)
            }
        }
    }

    componentDidMount() {
        const elements = this.getElement();
        elements.forEach((element) => {
            if (element.animation && element.animation.enabled && !this.resolved) {
                import(/* webpackIgnore: true */`${this.context.constants.templateLibraryRoot}/assets/specless.Tween.js`).then(module => {
                    this.resolved = true;
                    this.resolveLoad(module.default);
                }).catch(err => {
                    this.rejectLoad(err);
                })
            }
        })

        this.context.api.onPanelGeom((geom) => {
            if (this.state.visibility !== geom.visibility || this.state.viewportProgressY !== geom.viewportProgressY) {
                this.setState({
                    visibility: geom.visibility,
                    viewportProgressY: geom.viewportProgressY,
                    parallaxReady: true
                }, () => {
                    const elements = this.getElement();
                    elements.forEach((element) => {
                        if (element.animation && element.animation.enabled) {
                            if (element.animation.trigger === 'visibility') {
                                const percent = element.animation.triggerPercent || 0;
                                if (this.state.visibility > percent) {
                                    let delay = 0;
                                    if (element.animation.delay) {
                                        delay = element.animation.delay * 1000;
                                    }
                                    setTimeout(() => this.showStart(element.id), delay);
                                }
                            } else if (element.animation.trigger === 'scroll') {
                                const percent = element.animation.triggerPercent || 0;
                                if (this.state.viewportProgressY > percent) {
                                    let delay = 0;
                                    if (element.animation.delay) {
                                        delay = element.animation.delay * 1000;
                                    }
                                    setTimeout(() => this.showStart(element.id), delay);
                                }
                            }
                        }
                    })
                })
            }
        })

        // this.context.api.onceLoaded().then(() => {
        //     console.log('page-loaded');
        // })

        this.context.api.onLifespanEvent((event) => {
            const elements = this.getElement();
            if (event.name === 'show') {
                elements.forEach((element) => {
                    if (element.animation && element.animation.enabled) {
                        if (element.animation.trigger === 'immediately') {
                            let delay = 0;
                            if (element.animation.delay) {
                                delay = element.animation.delay * 1000;
                            }
                            setTimeout(() => this.showStart(element.id), delay);
                        }
                    }
                })
            }
            if (event.name === 'interactive') {
                elements.forEach((element) => {
                    if (element.animation && element.animation.enabled) {
                        if (element.animation.trigger === 'interacted') {
                            let delay = 0;
                            if (element.animation.delay) {
                                delay = element.animation.delay * 1000;
                            }
                            setTimeout(() => this.showStart(element.id), delay);
                        }
                    }
                })
            }
            if (event.name === 'videoPlay') {
                elements.forEach((element) => {
                    if (element.animation && element.animation.enabled) {
                        if (element.animation.trigger === 'video') {
                            let delay = 0;
                            if (element.animation.delay) {
                                delay = element.animation.delay * 1000;
                            }
                            setTimeout(() => this.showStart(element.id), delay);
                        }
                    }
                })
            }
        })
    }
    
    render() {
        const { spx, url } = this.context.api;
        const { Layer, Wrapper } = this.context.componentLibrary;
        let elements = {
            items: []
        }
        let design = {
            items: []
        }
        
        if (this.props.elements) {
            if (typeof this.props.elements === 'string') {
                elements = JSON.parse(this.props.elements);
            } else {
                elements = this.props.elements;
            }
        }
        
        if (this.props.design) {
            if (typeof this.props.design === 'string') {
                design = JSON.parse(this.props.design);
            } else {
                design = this.props.design;
            }
        }
        
        return (
            <>
                {(elements.items.slice(0).reverse().map((element) => {
                    const state = this.getElementState(element.id);
                    state.animationProps = getDefaultProps(element);
                    let renderElement = true;
                    let hidden = false;

                    if (element.type === 'video') { console.log(state.animation) };
                    
                    if (state.visibility === 'hidden') {
                        renderElement = false;
                        hidden = true;
                    }

                    if (state.hasShown) {
                        renderElement = true
                    }
                    
                    if (!elementTypes[element.type]) {
                        renderElement = false;
                    }

                    if (['animatingOut', 'animatedOut'].includes(state.animation)) {
                        state.animationProps = getAnimationProps(element);
                    }

                    if (state.hidden) {
                        hidden = true;
                        state.animationProps = getAnimationProps(element);
                        if (!state.hasShown) {
                            renderElement = false;
                        }
                    }

                    if (state.visibility === 'hidden' || state.visibility === 'hiding') {
                        state.animationProps = getAnimationProps(element);
                    }

                    if (!renderElement) {
                        return <></>
                    }

                    if (design && design.items) {
                        const settings = design.items[element.id] || {};
                        const style = getStyles(element, this.context);
                        let image;
                        let wrapper = 'safe-area';
                        let width = 150;
                        let height;
                        if (settings.layout) {
                            if (settings.positionFrom === 'top-left' || !settings.positionFrom) {
                                style.left = spx(settings.layout.x);
                                style.top = spx(settings.layout.y);
                            } else if (settings.positionFrom === 'bottom-left') {
                                style.left = spx(settings.layout.x);
                                style.top = 'auto';
                                style.bottom = settings.layout.y;
                            } else if (settings.positionFrom === 'bottom-right') {
                                style.left = 'auto';
                                style.right = spx(settings.layout.x);
                                style.bottom = spx(settings.layout.y);
                                style.top = 'auto';
                            } else if (settings.positionFrom === 'top-right') {
                                style.top = spx(settings.layout.y);
                                style.right = spx(settings.layout.x);
                                style.bottom = 'auto';
                                style.left = 'auto';
                            }
                            width = settings.layout.width || 150;
                            height = settings.layout.height;
                        }
                        const aspectProp = element.type + 'Aspect';
                        if (!height) {
                            if (element[aspectProp] && element[aspectProp].width && element[aspectProp].height) {
                                const aspect = element[aspectProp].height/element[aspectProp].width;
                                height = width * aspect;
                            } else {
                                height = 150
                            }
                        }
                        style.width = spx(width);
                        style.height = spx(height);

                        if (settings.wrapper === 'ad-boundary') {
                            wrapper = 'ad-boundary';
                        }

                        if (element.type === 'text' || element.type === 'image') {
                            style.overflow = 'hidden';
                        }

                        let content = elementTypes[element.type]({
                            element,
                            settings,
                            style,
                            runAction: this.runAction,
                            createRef: this.createRef,
                            context: this.context,
                            state
                        })

                        let wrapperTransform = `translateX(0%) translateY(0%)`


                        if (element.parallax && element.parallax.enabled) {
                            const distance = element.parallax.distance || 100;
                            const direction = element.parallax.direction || 'vertical';
                            const progress = this.state.viewportProgressY;
                            let offset = 0;
                            let percent = 0;
                            let x = 0;
                            let y = 0;
                            if (progress > 50) {
                                percent = (progress - 50) / 50;
                                offset = distance * percent;
                                if (direction === 'vertical') {
                                    y = offset;
                                } else {
                                    x = offset;
                                }
                            } else if (progress < 50) {
                                percent = 1 - (progress/50);
                                offset = distance * percent;
                                if (direction === 'vertical') {
                                    offset = offset * -1;
                                    y = offset;
                                } else {
                                    offset = offset * -1;
                                    x = offset;
                                }
                            }

                            wrapperTransform = `translateX(${x}) translateY(${y}%)`;

                        }

                        let wrapperStyles = {
                            width: '100%',
                            height: '100%',
                            top: 0,
                            left: 0,
                            position: 'absolute',
                            pointerEvents: 'none',
                            transform: wrapperTransform
                        }

                        if (wrapper === 'safe-area') {
                            if (this.props.safeArea && this.props.safeArea.length > 0) {
                                wrapperStyles.width = this.props.safeArea[0] + 'px' || '100%';
                                wrapperStyles.height = this.props.safeArea[1] + 'px' || '100%';
                                wrapperStyles.margin = '0 auto';
                                wrapperStyles.left = `calc((100% - ${wrapperStyles.width})/2)`
                            }
                        }

                        if (state.animationProps) {
                            style.opacity = state.animationProps.opacity;
                            style.transform = `translateX(${spx(state.animationProps.x)}px) translateY(${spx(state.animationProps.y)}px) rotate(${state.animationProps.rotate}deg) scale(${state.animationProps.scale})`
                        }

                        if (element.animation && element.animation.enabled) {
                            const duration = element.animation.duration || 0;
                            const ease = element.animation.easing || 'linear';
                            style.transition = `opacity ${duration}s ${ease}, transform ${duration}s ${ease}, visibility ${duration}s ${ease}`;
                        }

                        if (hidden) {
                            style.visibility = 'hidden'
                        } else {
                            style.visibility = 'visible'
                        }

                        if (element.type === 'text') {
                            style.width = 'auto';
                            style.height = 'auto';
                            style.display = 'inline-block';
                            style.maxWidth = 'none';
                            style.maxHeight = 'none';
                        }


                        let el = (
                            <div key={element.id} className="specless-element-wrapper" style={wrapperStyles}>
                                <div key={element.id + '-element'} className="specless-element" style={style}>
                                    {content}
                                </div>
                            </div>
                        )

                        // if (element.animation && element.animation.enabled) {
                        //     let before = Object.assign({}, style);
                        //     let translateX = 'translateX(0)';
                        //     let translateY = 'translateY(0)';
                        //     let scale = 'scale(1)';
                        //     let rotate = 'rotate(0)';
                        //     let opacity = style.opacity;
                        //     if (element.animation.opacityEnabled) {
                        //         opacity = element.animation.opacity;
                        //     }
                        //     if (element.animation.translateXEnabled) {
                        //        translateX = `translateX(${spx(element.animation.translateX || 0)}px)`;
                        //     }
                        //     if (element.animation.translateYEnabled) {
                        //         translateY = `translateY(${spx(element.animation.translateY || 0)}px)`;
                        //     }
                        //     if (element.animation.scaleEnabled) {
                        //         scale = `scale(${spx(element.animation.scale || 0)})`;
                        //     }
                        //     if (element.animation.rotateEnabled) {
                        //         rotate = `rotate(${spx(element.animation.rotate || 0)}deg)`;
                        //     }
                        //     before.transform = `${translateX} ${translateY} ${scale} ${rotate}`;
                        //     before.opacity = opacity;

                        //     // let startAnimation = false;
                        //     // if (this.state.animate) {
                        //     //     if (element.animation.trigger === 'immediately' || !element.animation.trigger) {
                        //     //         startAnimation = true
                        //     //     } else if (element.animation.trigger === 'visibility') {
                        //     //         if (this.state.visibility >= element.animation.triggerPercent) {
                        //     //             startAnimation = true
                        //     //         }
                        //     //     } else if (element.animation.trigger === 'scroll') {
                        //     //         if (this.state.viewportProgressY >= element.animation.triggerPercent) {
                        //     //             startAnimation = true
                        //     //         }
                        //     //     } else if (element.animation.trigger === 'interacted') {
                        //     //         if (this.state.interactive) {
                        //     //             startAnimation = true
                        //     //         }
                        //     //     } else if (element.animation.trigger === 'video') {
                        //     //         if (this.state.videoStarted) {
                        //     //             startAnimation = true
                        //     //         }
                        //     //     }
                        //     // }
                        //     let startStyles = style;
                        //     let endStyles = style;

                        //     if (runAnimation) {
                        //         if (animateIn) {
                        //             startStyles = before;
                        //             endStyles = style;
                        //         } else if (animateOut) {
                        //             startStyles = style;
                        //             endStyles = before;
                        //         }
                        //     } else {
                        //         if (state.visibility === 'hidden') {
                        //             style.visibility = 'hidden';
                        //         }
                        //     }

                        //     el = (
                        //         <div key={element.id} className="specless-element-wrapper" style={wrapperStyles}>
                        //             <Animate easeType={element.animation.easing || 'linear'} start={startStyles} end={endStyles} play={runAnimation} duration={element.animation.duration || 0.25} delay={element.animation.delay || 0} onComplete={() => {
                        //                 if (animateIn) {
                        //                     this.showEnd(element.id);
                        //                 } else if (animateOut) {
                        //                     this.hideEnd(element.id);
                        //                 }
                        //             }} render={(props) => {
                        //                 const currentStyles = Object.assign({}, props.style);
                        //                 if (this.state.animatedItems.includes(element.id)) {
                        //                     currentStyles.transition = 'none';
                        //                 }
                        //                 return (
                        //                     <div key={element.id + '-element animating'} className="specless-element" style={currentStyles}>
                        //                         {content}
                        //                     </div>
                        //                 )
                        //             }}/>
                        //         </div>
                        //     )
                        // }

                        return el
                        
                        // if (wrapper === 'ad-boundary') {
                        //     return el
                        // }

                        // let wrapperWidth = '100%';
                        // let wrapperHeight = '100%';
                        // if (this.props.safeArea && this.props.safeArea.length > 0) {
                        //     wrapperWidth = this.props.safeArea[0] + 'px' || '100%';
                        //     wrapperHeight = this.props.safeArea[1] + 'px' || '100%';
                        // }

                        // return (
                        //     <div style={{
                        //         margin: '0 auto',
                        //         width: wrapperWidth,
                        //         height: wrapperHeight,
                        //         position: 'absolute',
                        //         top: 0,
                        //         left: `calc((100% - ${wrapperWidth})/2)`,
                        //         pointerEvents: 'none'
                        //     }}>
                        //         {el}
                        //     </div>
                        // )

                    } else {
                        return <></>
                    }
                }))}
            </>
        )
    }
}