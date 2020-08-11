import React from 'react';
import { Context } from '@specless/components';
export const useRequest = (id) => {
    const { api = {} } = React.useContext(Context);
    return () => api.request(id);
}