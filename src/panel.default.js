import React from 'react';
import { Body, Component } from '@specless/components';

export const config = {
    name: "Default Panel",
    defaultWidth: 300,
    defaultHeight: 400,
    fetchDynamicData: false,
    layouts: [
        {
            id: 'horizontal',
            width: 300,
            height: 250,
            name: "300x250"
        }
    ]
}

export class Panel extends Component {
    render() {
        return (
            <Body>Test</Body>
        )
    }
}