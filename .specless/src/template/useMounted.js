import React from 'react';
import { Context } from '@specless/components';
export const useMounted = (callback) => {
    const [ ready, setReady ] = React.useState(false);
    const [ mounted, setMounted ] = React.useState(false);
    const { api } = React.useContext(Context);
    if (api && !ready) {
        setReady(true);
        api.onceMounted().then(() => {
            setMounted(true);
            if (callback) {
                callback();
            }
        })
    }
    return mounted
}