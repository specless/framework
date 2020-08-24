import React from 'react';
import { Component } from './Component';

export class Wrapper extends Component {

    state = {
        renderError: null
    }

    componentDidCatch(err) {
        this.setState({
            renderError: err
        }, () => {
            this.trackError({
                code: 'RENDER_ERROR',
                msg: err.message,
                caughtByComponent: 'Wrapper',
                caughtById: this.props.trackingName || this.props.id || null
            })
        })
    }

    render() {

        if (this.state.renderError || this.props.hidden) {
            return <></>
        }
        const { props } = this;

        const elProps = this.mergeProps({
            className: `${this.context._namespace}layout-wrapper`
        })

        if (this.props.hidden) {
            return <></>
        }

        return (
            <div {...elProps}>
                {this.renderStyleSheet()}
                {props.children}
                {this.renderBorderOverlay()}
            </div>
        )
    }
}