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

export class Component extends React.Component {
    static contextType = Context;
    
    constructor(props, context) {
        super(props, context);
        const { api } = this.context;
        for (let key in api) {
            this[key] = api[key];
        }

        events.forEach(handler => {
            if (typeof this[handler] === 'function') {
                this[handler] = this[handler].bind(this);
            }
        })


        if (typeof this.panelDidConnect === 'function') {
            api.onceConnected().then(() => {
                this.panelDidConnect();
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