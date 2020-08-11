import React from 'react';
import { Context } from '@specless/components';
export const useExit = (id) => {
    const { api = {} } = React.useContext(Context);
    return (overrideUrl, fireSilently) => api.exit(id, overrideUrl, fireSilently)
}