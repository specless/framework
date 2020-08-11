import React from 'react';
import { Context } from '@specless/components';
export const useSize = (callback) => {
    const { width, height } = React.useContext(Context);
    const [ first, setFirst ] = React.useState(true);
    const [ size, setSize ] = React.useState({ width, height});
    if (size.width !== width || size.height !== height) {
        setSize({width, height});
        if (callback) {
            callback({width, height});
        }
    }
    if (first) {
        callback({width, height});
        setFirst(false);
    }
    return { width, height }
}