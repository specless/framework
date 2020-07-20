import React from 'react';
import { Body, Wrapper, Component, Layer } from '@specless/components';
import placeholderLogo from '@assets/dummy-logo.png';

export const config = {
    name: "Default Panel",
    defaultWidth: 300,
    defaultHeight: 300,
    fetchDynamicData: false,
    layouts: [
        {
            id: 'square',
            name: 'Square Layout',
            width: 400,
            height: 400
        },
        {
            id: 'rectangle',
            name: 'Rectangle Layout',
            width: 600,
            height: 400
        }
    ]
}

export class Panel extends Component {
    render() {
        const { data, layout } = this.props;
        let logoUrl = placeholderLogo;
        let headline = 'Headline Goes Here';
        
        // check if logo and headline fields have been populated, if so, use those values instead.
        if (data.general) {
            if (data.general.logo) {
                logoUrl = data.general.logo
            }
            if (data.headline) {
                headline = data.general.headline
            }
        }

        // define styles for the logo for each layout
        const logoStyles = {
            square: {
                width: this.spx(64),
                height: this.spx(64),
                left: this.spx(168),
                top: this.spx(100)
            },
            rectangle: {
                width: this.spx(80),
                height: this.spx(80),
                left: this.spx(260),
                top: this.spx(80)
            }
        }
        // define styles for the headline
        const headlineStyles = {
            width: '100%',
            height: 'auto',
            padding: this.spx(24),
            fontSize: this.spx(18),
            bottom: 0,
            left: 0,
            textAlign: 'center'
        }

        if (layout.id === 'rectangle') {
            headlineStyles.fontSize = this.spx(24);
        }


        return (
            <Body style={{backgroundColor: 'white'}} onClick={this.exit('main')}>
                <Wrapper>
                    <Layer image={this.url(logoUrl)} style={logoStyles[layout.id]}/>
                    <Layer style={headlineStyles}>{headline}</Layer>
                </Wrapper>
            </Body>
        )
    }
}