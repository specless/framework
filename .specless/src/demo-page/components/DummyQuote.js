import React from 'react';
import { DummyHeadline } from './DummyHeadline';

export const DummyQuote = () => {
    return (
        <blockquote 
            className="dummy dummy-blockquote"
            style={{
                paddingLeft: 48,
                borderLeft: '6px solid rgba(0,0,0,0.1)'
            }}
        >
            <DummyHeadline level={2}/>
        </blockquote>
    )
}