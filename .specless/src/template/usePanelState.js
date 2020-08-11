import React from 'react';
import { Context } from '@specless/components';
export const usePanelState = (callback) => {
    const [ ready, setReady ] = React.useState(false);
    const { api, panel } = React.useContext(Context);
    const [ panelState, setPanelState ] = React.useState(panel);
    if (api && !ready) {
        setReady(true);
        api.onPanelState((newState) => {
            setPanelState(newState);
            if (callback) {
                callback(newState);
            }
        })
    }
    return panelState;
}