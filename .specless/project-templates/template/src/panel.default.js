import React from 'react';
import { Body, Wrapper, Component, Layer } from '@specless/components';
import { useData, useLayout, useSpx, useUrl, useExit } from '@specless/template';
import placeholderLogo from '@assets/dummy-logo.png';
import stylesheet from './styles.less';

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

export const Panel = () => {

    const data = useData();
    const layout = useLayout();
    const url = useUrl();
    const spx = useSpx();
    const handleClickThrough = useExit();
    let logoUrl = placeholderLogo;
    let headline = 'Headline Goes Here';
    
    // check if logo and headline fields have been populated, if so, use those values instead.
    if (data.general) {
        if (data.general.logo) {
            logoUrl = data.general.logo
        }
        if (data.general.headline) {
            headline = data.general.headline
        }
    }

    // define styles for the logo for each layout
    const logoStyles = {
        square: {
            width: spx(64),
            height: spx(64),
            left: spx(168),
            top: spx(100)
        },
        rectangle: {
            width: spx(80),
            height: spx(80),
            left: spx(260),
            top: spx(80)
        }
    }
    // define styles for the headline
    const headlineStyles = {
        width: '100%',
        height: 'auto',
        padding: spx(24),
        fontSize: spx(18),
        bottom: 0,
        left: 0,
        textAlign: 'center'
    }

    // Change the font size when the layout is 'rectange'
    if (layout.id === 'rectangle') {
        headlineStyles.fontSize = spx(24);
    }

    return (
        <Body onClick={() => handleClickThrough()} className="body" stylesheet={stylesheet}>
            <Wrapper>
                <Layer image={url(logoUrl)} style={logoStyles[layout.id]}/>
                <Layer style={headlineStyles}>{headline}</Layer>
            </Wrapper>
        </Body>
    )
}