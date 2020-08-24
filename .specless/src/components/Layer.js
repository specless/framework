import React from 'react';
import { Component } from './Component';

export class Layer extends Component {

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
                caughtByComponent: 'Layer',
                caughtById: this.props.trackingName || this.props.id || null
            })
        })
    }

    render() {

        if (this.state.renderError || this.props.hidden) {
            return <></>
        }

        const contentClass = `${this.context._namespace}layer-content`;
        const className = `${this.context._namespace}layer`;
        const classes = this.context.api.useStyles({
            [contentClass] : {
                width: '100%',
                height: '100%',
                position: 'relative'
            }
        }, this.props);
        const newProps = this.mergeProps({
            className
        })
        delete newProps.onLoad;
        delete newProps.onError;

        if (this.props.hidden) {
            return <></>
        }

    
        return (
            <div {...newProps}>
                {this.renderStyleSheet()}
                {(this.props.image) && (
                    <img className='specless-layer-image' alt="Image Layer" src={this.props.image} draggable={false} ref={this.props.imageRef} onLoad={this.props.onLoad} onError={this.props.onError}/>
                )}
                {(this.props.children) && (
                    <div className={classes[contentClass]} ref={this.props.contentRef}>
                        {this.props.children}
                    </div>
                )}
                {this.renderBorderOverlay()}
            </div>
        )
    }
}