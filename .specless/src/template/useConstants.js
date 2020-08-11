import React from 'react';
import { Context } from '@specless/components';
export const useConstants = () => {
    const { constants } = React.useContext(Context);
    return constants || {};
}