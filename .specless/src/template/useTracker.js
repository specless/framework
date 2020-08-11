import React from 'react';
import { Context } from '@specless/components';
export const useTracker = (id) => {
    const { api = {} } = React.useContext(Context);
    return (id) => api.track(id);
}