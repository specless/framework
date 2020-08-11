import React from 'react';
import { Context } from '@specless/components';
export const useConsole = () => {
    const { api = {} } = React.useContext(Context);
    return {
        log: api.log,
        warn: api.warn,
        error: api.error
    }
}