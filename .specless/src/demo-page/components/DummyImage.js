import React from 'react'
import dummy1 from './../images/dummy-1.svg';
import dummy2 from './../images/dummy-1.svg';
import dummy3 from './../images/dummy-1.svg';
import dummy4 from './../images/dummy-1.svg';
import dummy5 from './../images/dummy-1.svg';
import dummy6 from './../images/dummy-1.svg';
const images = [
    dummy1,
    dummy2,
    dummy3,
    dummy4,
    dummy5,
    dummy6
]

class DummyImageGenerator extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const index = this.props.image || 0;
        const image = images[index];

        return (
            <img src={image} alt="Image" {...this.props} className="dummy dummy-image"/>
        )

    }
}

export const DummyImage = DummyImageGenerator