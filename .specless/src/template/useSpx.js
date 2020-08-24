import React from 'react';
import { Context } from '@specless/components';
export const useSpx = () => {
    const { api = {} } = React.useContext(Context);
    return api.spx;
}