import React from 'react';
import { Context } from '@specless/components';
export const createUseExit = (config) => {
    const [ exit, setExit ] = React.useState({});
    const { api = {} } = React.useContext(Context);
    if (exit.url !== config.url || exit.id !== config.id) {
        setExit(config);
        api.createExit(config);
    }
    return (overrideUrl, fireSilently) => api.exit(config.id, overrideUrl, fireSilently)
}