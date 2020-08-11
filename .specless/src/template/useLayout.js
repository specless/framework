import React from 'react';
import { Context } from '@specless/components';
export const useLayout = () => {
    const { layout } = React.useContext(Context);
    return layout || {};
}