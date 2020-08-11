import React from 'react';
import { Context } from '@specless/components';
export const useData = () => {
    const { data } = React.useContext(Context);
    return data || {};
}