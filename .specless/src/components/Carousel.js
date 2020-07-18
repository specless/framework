import React from 'react';
import { Context } from './Context';

class CarouselComponent extends React.Component {
    static contextType = Context;
    static Context = React.createContext({});
    
    state = {
        CarouselComponent: null
    }

    componentDidMount() {
        const url = `${this.context.constants.templateLibraryRoot}/assets/specless.Carousel.js`;
        import(/* webpackIgnore: true */url).then(mod => {
            this.setState({
                CarouselComponent: mod.default,
            })
        })
    }

    render() {
        let el = <></>
        const { CarouselComponent } = this.state;
        const { componentLibrary } = this.context;
        const { Layer } = componentLibrary;
        const styleProps = Object.assign({}, this.props.styles || {}, this.props.style);
        let shadowX = styleProps.shadowX || 0;
        let shadowY = styleProps.shadowY || 0;
        let shadowBlur = styleProps.shadowBlur || 0;
        let shadowColor = styleProps.shadowColor || 'transparent';
        if (!styleProps.boxShadow) {
            styleProps.boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}`;
        }
        delete styleProps.shadowX;
        delete styleProps.shadowY;
        delete styleProps.shadowBlur;
        delete styleProps.shadowColor;

        if (CarouselComponent) {
            el = <CarouselComponent context={this.context} {...this.props} ref={this.props.carouselRef}/>
        } else {
            if (this.props.children && this.props.children[0]) {
                const firstProps = this.props.children[0].props;
                el = <div {...firstProps}/>
            }
        }

        return (
            <CarouselComponent.Context.Provider value={this.props}>
                <Layer height={this.props.height} width={this.props.width} style={styleProps}>
                    {el}
                </Layer>
            </CarouselComponent.Context.Provider>
        )
    }
}

class Slide extends React.Component {
    static contextType = CarouselComponent.Context;

    render() {
        const { height } = this.context;
        
        return (
            <div style={{height: height}} className="carousel-slide">{this.props.children}</div>
        )
    }
}

CarouselComponent.Slide = Slide;

export const Carousel = CarouselComponent;