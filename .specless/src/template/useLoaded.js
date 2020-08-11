import React from 'react';
import { Context } from '@specless/components';
export const useLoaded = (callback) => {
    const [ ready, setReady ] = React.useState(false);
    const [ loaded, setLoaded ] = React.useState(false);
    const { api } = React.useContext(Context);
    if (api && !ready) {
        setReady(true);
        api.onceLoaded().then(() => {
            setLoaded(true);
            if (callback) {
                callback();
            }
        })
    }
    return loaded
}