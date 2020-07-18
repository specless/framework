import React from 'react';
import { LoremIpsum } from "lorem-ipsum";
import { Typography } from 'antd';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 12,
        min: 8
    }
});

class DummyHeadlineGenerator extends React.Component {
    constructor(props) {
        super(props)
        this.title = lorem.generateSentences(1);
    }

    render() {
        const level = this.props.level || 1;
        return (
            <Typography.Title className="dummy dummy-title" level={level}>
                {this.title}
            </Typography.Title>
        )
    }
}

export const DummyHeadline = DummyHeadlineGenerator;

