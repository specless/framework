import React from 'react';
import { Context } from '@specless/components';
export const usePageGeometry = (callback) => {
    const [ ready, setReady ] = React.useState(false);
    const [ geom, setGeom ] = React.useState({});
    const { api } = React.useContext(Context);
    if (api && !ready) {
        setReady(true);
        api.onPageGeom((pageGeom) => {
            setGeom(pageGeom);
            if (callback) {
                callback(pageGeom);
            }
        })
    }
    return geom
}