import React from 'react';
import { Component } from './Component';

export class Body extends Component {
    render() {
        const { props } = this;

        const elProps = this.mergeProps({
            className: `${this.context._namespace}panel-body`
        })

        return (
            <div {...elProps}>
                {this.renderStyleSheet()}
                {props.children}
                {this.renderBorderOverlay()}
            </div>
        )
    }
}