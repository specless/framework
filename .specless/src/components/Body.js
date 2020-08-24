import React from 'react';
import { Component } from './Component';
import { css, cx } from '@emotion/core';

export class Body extends Component {

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
                caughtByComponent: 'Body',
                caughtById: this.props.trackingName || this.props.id || null
            })
        })
    }

    render() {
        if (this.state.renderError || this.props.hidden) {
            return <></>
        }
        
        const { props } = this;

        const styles = css`
            background-color: red;
        `

        const elProps = this.mergeProps({
            className: `${this.context._namespace}panel-body`
        })

        return (
            <div {...elProps} css={styles}>
                {this.renderStyleSheet()}
                {props.children}
                {this.renderBorderOverlay()}
            </div>
        )
    }
}