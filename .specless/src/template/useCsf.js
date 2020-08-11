import React from 'react';
import { Context } from '@specless/components';
export const useCsf = (callback) => {
    const [ ready, setReady ] = React.useState(false);
    const [ csf, setCsf ] = React.useState(null);
    const { api } = React.useContext(Context);
    if (api && !ready) {
        setReady(true);
        api.onceConnected().then((instance) => {
            setCsf(instance);
            if (callback) {
                callback(instance);
            }
        })
    }
    return csf
}