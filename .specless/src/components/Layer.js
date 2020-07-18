import React from 'react';
import { Context } from './Context';

export class Layer extends React.Component {
    static contextType = Context;
    render() {
        const sizingClass = `${this.context._namespace}layer-sizing`;
        const contentClass = `${this.context._namespace}layer-content`
        const classes = this.context.api.useStyles({
            [sizingClass] : {
                width: props => props.width || 'auto',
                height: props => props.height || 'auto',
                top: props => props.top,
                right: props => props.right,
                bottom: props => props.bottom,
                left: props => props.left
            },
            [contentClass] : {
                width: '100%',
                height: '100%',
                position: 'relative'
            }
        }, this.props);
        
        let className = `${this.context._namespace}layer ${classes[sizingClass]}`;
        if (this.props.className) {
            className = className + ' ' + this.props.className;
        }
        const newProps = Object.assign({}, this.props);
        delete newProps.width;
        delete newProps.height;
        delete newProps.left;
        delete newProps.right;
        delete newProps.top;
        delete newProps.bottom;

    
        return (
            <div {...newProps} className={className} ref={this.props.elementRef}>
                {(this.props.image) && (
                    <img className='specless-layer-image' alt="Image" src={this.props.image} draggable={false}/>
                )}
                {(this.props.children) && (
                    <div className={classes[contentClass]}>
                        {this.props.children}
                    </div>
                )}
            </div>
        )
    }
}