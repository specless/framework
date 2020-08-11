import React from 'react';
import { Context } from '@specless/components';
export const useConnection = (callback) => {
    const [ ready, setReady ] = React.useState(false);
    const [ connected, setConnected ] = React.useState(false);
    const { api } = React.useContext(Context);
    if (api && !ready) {
        setReady(true);
        api.onceConnected().then(() => {
            setConnected(true);
            if (callback) {
                callback();
            }
        })
    }
    return connected
}