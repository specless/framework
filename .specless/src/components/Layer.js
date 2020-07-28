import React from 'react';
import { Component } from './Component';

export class Layer extends Component {
    render() {
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