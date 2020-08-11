import React from 'react';
import { Context } from '@specless/components';
export const useUrl = () => {
    const { api = {} } = React.useContext(Context);
    return api.url;
}