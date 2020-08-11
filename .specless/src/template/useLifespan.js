import React from 'react';
import { Context } from '@specless/components';
export const useLifespan = (callback) => {
    const [ ready, setReady ] = React.useState(false);
    const [ events, setEvents ] = React.useState([]);
    const { api } = React.useContext(Context);
    if (api && !ready) {
        setReady(true);
        api.onLifespanEvent((event) => {
            let newEvents = [...events, event];
            setEvents(newEvents);
            if (callback) {
                callback(event);
            }
        })
    }
    return events
}