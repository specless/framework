import React from 'react';
import { Context } from '@specless/components';
export const usePanelGeometry = (callback) => {
    const [ ready, setReady ] = React.useState(false);
    const [ geom, setGeom ] = React.useState({});
    const { api } = React.useContext(Context);
    if (api && !ready) {
        setReady(true);
        api.onPanelGeom((panelGeom) => {
            setGeom(panelGeom);
            if (callback) {
                callback(panelGeom);
            }
        })
    }
    return geom
}