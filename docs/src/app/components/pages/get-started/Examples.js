import React from 'react';
import Title from 'react-title-component';

import MarkdownElement from '../../MarkdownElement';
import examplesText from './examples.md';

const Examples = () => (
  <div>
    <Title render={(previousTitle) => `Examples - ${previousTitle}`} />
    <MarkdownElement text={examplesText} />
  </div>
);

export default Examples;
