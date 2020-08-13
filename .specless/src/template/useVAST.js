import React from 'react';
import { Context } from '@specless/components';
import { parseVAST } from '@specless/utils';

const isURL = (string) => {
    try {
        new URL(string);
    } catch (_) {
        return false;  
    }
    return true;
}

export const useVAST = (source) => {
    const [ requested, setRequested ] = React.useState(false);
    const [ vastSource, setSource ] = React.useState(source);

    const [ VAST, setVAST] = React.useState({
        loaded: false,
        ad: null,
        creative: null,
        media: null,
        tracker: null,
    });

    const { constants = {} } = React.useContext(Context);
    const config = {
        constants
    }
    if (isURL(source)) {
        config.url = source
    } else {
        config.xml = source
    }

    if (!requested || source !== vastSource) {
        setRequested(true);
        setSource(source);
        parseVAST(config).then((vast) => {
            setVAST({
                loaded: true,
                ...vast
            })
        }).catch(err => {
            setVAST({
                loaded: true,
                error: err,
                ad: null,
                creative: null,
                media: null,
                tracker: null
            })
        })
    }

    return VAST
}