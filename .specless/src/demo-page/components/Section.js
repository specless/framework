import React from 'react';


export const Section = (props) => {
    return <section {...props} className="section">{props.children}</section>
}