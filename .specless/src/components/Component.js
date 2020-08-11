import React from 'react';
import { Context } from './Context';
const events = [
    'panelDidConnect',
    'panelDidLoad',
    'panelGeometryUpdated',
    'pageGeometryUpdated',
    'adLifespanEventRecorded',
    'panelDidShow',
    'panelDidHide',
    'panelDidResize',
    'panelDidCatch'
]

const passThroughProps = [
    // Standard Attrs
    'accesskey',
    'align',
    'background',
    'bgcolor',
    'class',
    'contenteditable',
    'contextmenu',
    'draggable',
    'height',
    'hidden',
    'id',
    'item',
    'itemprop',
    'spellcheck',
    'subject',
    'tabindex',
    'title',
    'valign',
    'width',
    // React Specific
    'className',
    'style',
    'htmlFor',
    'suppressContentEditableWarning',
    'suppressHydrationWarning',
    'onChange',
    'value',
    'tabIndex',
    'readOnly',
    'onClick',
    'onContextMenu',
    'onDoubleClick',
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onGotPointerCapture',
    'onLostPointerCapture',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerOver',
    'onPointerOut',
    'onSelect',
    'onTouchCancel',
    'onTouchEnd',
    'onTouchMove',
    'onTouchStart',
    'onScroll',
    'onWheel',
    'onLoad',
    'onError',
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
    'onTransitionEnd',
    'onToggle',
    'onInput',
    'onInvalid',
    'onReset',
    'onSubmit',
    'onFocus',
    'onBlur',
    'onKeyDown',
    'onKeyPress',
    'onKeyUp',
]


export class Component extends React.Component {
    static contextType = Context;
    constructor(props, context) {
        super(props, context);
        this.data = context.data;
        this.constants = context.constants;
        this.panel = context.panel;
        this.layout = context.layout;
        this.width = context.width;
        this.height = context.height;
        

        const { api } = this.context;
        for (let key in api) {
            this[key] = api[key];
        }
        
        this.mergeProps = (overrides) => {
            const newProps = {};
            for (let key in this.props) {
                if (passThroughProps.includes(key)) {
                    newProps[key] = this.props[key];
                } else if (key.startsWith('data-') || key.startsWith('aria-')) {
                    newProps[key] = this.props[key];
                }
            }

            if (overrides.style) {
                newProps.style = Object.assign(newProps.style || {}, overrides.style)
            }

            if (overrides.className && newProps.className) {
                newProps.className = overrides.className + ' ' + newProps.className;
            } else if (overrides.className) {
                newProps.className = overrides.className
            }

            for (let key in overrides) {
                if (!['style', 'className'].includes(key)) {
                    newProps[key] = overrides[key];
                }
            }

            newProps.ref = this.props.elementRef;

            return newProps;
        }

        this.renderStyleSheet = () => {
            if (this.props.stylesheet) {
                return <style ref={this.props.styleSheetRef}>{this.props.stylesheet}</style>
            } else {
                return <></>
            }
        }

        this.renderBorderOverlay = () => {
            if (this.props.border) {
                const styles = {
                    background: this.props.border,
                    pointerEvents: 'none'
                }
                return (
                    <>
                        <div className={`${this.context._namespace}border specless-border-top`} style={styles}/>
                        <div className={`${this.context._namespace}border specless-border-right`} style={styles}/>
                        <div className={`${this.context._namespace}border specless-border-bottom`} style={styles}/>
                        <div className={`${this.context._namespace}border specless-border-left`} style={styles}/>
                    </>
                )
            } else {
                return <></>
            }
        }

        events.forEach(handler => {
            if (typeof this[handler] === 'function') {
                this[handler] = this[handler].bind(this);
            }
        })


        if (typeof this.panelDidConnect === 'function') {
            api.onceConnected().then((csf) => {
                this.panelDidConnect(csf);
            })
        }

        if (typeof this.panelDidLoad === 'function') {
            api.onceLoaded().then(() => {
                this.panelDidLoad()
            })
        }

        if (typeof this.panelGeometryUpdated === 'function') {
            api.onPanelGeom(this.panelGeometryUpdated)
        }

        if (typeof this.pageGeometryUpdated === 'function') {
            api.onPageGeom(this.pageGeometryUpdated)
        }

        if (typeof this.adLifespanEventRecorded === 'function') {
            api.onLifespanEvent(this.adLifespanEventRecorded)
        }

        if (typeof this.panelDidResize === 'function') {
            api.onPanelResize(this.panelDidResize)
        }

        if (typeof this.panelDidCatch === 'function') {
            api.onPanelError(this.panelDidError)
        }

        if (typeof this.adLifespanEventRecorded === 'function') {
            api.onLifespanEvent(this.adLifespanEventRecorded)
        }

        if (typeof this.panelDidShow === 'function') {
            api.onceConnected().then((csf) => {
                csf.measure.getStream('showing').addListener({
                    next: ({showing}) => {
                        if (showing) {
                            this.panelDidShow()
                        }
                    }
                })
            })
        }
        
        if (typeof this.panelDidHide === 'function') {
            api.onceConnected().then((csf) => {
                csf.measure.getStream('hidden').addListener({
                    next: ({hidden}) => {
                        if (hidden) {
                            this.panelDidHide()
                        }
                    }
                })
            })
        }
    }
}