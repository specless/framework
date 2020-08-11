import React from 'react';
import { Body, Wrapper, Component, Layer } from '@specless/components';
import { useAPI, useData, useConstants, usePanelState, usePageGeometry, usePanelGeometry, useLayout, useExit, useSize, useAdLifespan, createUseExit } from '@specless/template';
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
    
    const openClickThrough = useExit('main');

    return (
        <Body onClick={() => openClickThrough()}></Body>
    )
}

