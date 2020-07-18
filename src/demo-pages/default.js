import React from 'react';
import { 
    render,
    Page,
    Sidebar,
    Content,
    Section,
    DummyContent,
    DummyImage,
    DummyHeadline,
    DummyQuote,
    AdSlot
} from '@demo-page';

render(() => {
    
    

    return (
        <Page header="sticky">
            <Sidebar>
                <DummyHeadline level={4}/>
                {/* <AdSlot id="ad-slot" width={300} height={250}/> */}
                <DummyContent paragraphs={1}/>
            </Sidebar>
            <Content maxWidth={800}>
                <Section>
                    <DummyHeadline/>
                </Section>
                <Section> 
                    <DummyImage/>
                </Section>
                <Section>
                    <DummyContent paragraphs={3}/>
                </Section>
                <Section>
                    <AdSlot id="ad-slot" width={300} height={400}/>
                </Section>
                <Section>
                    <DummyContent paragraphs={3}/>
                </Section>
                <Section>
                    <DummyQuote/>
                </Section>
                <Section>
                    <DummyContent paragraphs={3}/>
                </Section>
            </Content>
        </Page>
    )
})






