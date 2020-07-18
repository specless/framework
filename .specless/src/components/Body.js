import React from 'react';
import { Context } from './Context';

export class Body extends React.Component {
    static contextType = Context;
    render() {
        const { props } = this;
        let className = `${this.context._namespace}panel-body`
        if (props.className) {
            className = className + ' ' + props.className;
        }
        return (
            <div {...props} className={className}>
                {props.children}
                {(props.border) && (
                    <>
                        <div className={`${this.context._namespace}border specless-border-top`} style={{background: props.border}}/>
                        <div className={`${this.context._namespace}border specless-border-right`} style={{background: props.border}}/>
                        <div className={`${this.context._namespace}border specless-border-bottom`} style={{background: props.border}}/>
                        <div className={`${this.context._namespace}border specless-border-left`} style={{background: props.border}}/>
                    </>
                )}
            </div>
        )
    }
}