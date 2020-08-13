import React from 'react';
import { Body, VideoPlayer } from '@specless/components';
import { useVAST, useUrl } from '@specless/template';
import placeholderLogo from '@assets/dummy-logo.png';
import stylesheet from './styles.less';

const vasttag = `vast://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=`;

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
    const url = useUrl()
    return (
        <Body>
            <VideoPlayer url={url(vasttag)} playing style={{
                width: '100%',
                height: '100%'
            }} onClick={(url) => {
                console.log(url)
            }} quality="best"/>
        </Body>
    )
}

