import React from 'react';
import { LoremIpsum } from "lorem-ipsum";
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});

class DummyContentGenerator extends React.Component {
    constructor(props) {
        super(props)
        this.paragraphs = [];
        this.count = this.props.paragraphs || 1;
        let count = 0;

        const generateText = () => {
            if (count < this.count) {
                this.paragraphs.push(lorem.generateParagraphs(1));
                count = count + 1;
                generateText()
            }
        }

        generateText();
    }

    render() {
        return (
            <section className="dummy">
                {
                    this.paragraphs.map((paragraph) => {
                        return <p>{paragraph}</p>
                    })
                }
            </section>
        )
    }
}

export const DummyContent = DummyContentGenerator;
