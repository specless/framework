import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/lib/style/index.less';
export { Page, Sidebar, Content }  from './components/Page';
export { DummyContent } from './components/DummyContent';
export { DummyImage } from './components/DummyImage';
export { DummyHeadline } from './components/DummyHeadline';
export { Section } from './components/Section';
export { DummyQuote } from './components/DummyQuote';
export { AdSlot } from './components/AdSlot';

export const render = (Page) => {
    ReactDOM.render(<Page/>, document.getElementById('root'));
}