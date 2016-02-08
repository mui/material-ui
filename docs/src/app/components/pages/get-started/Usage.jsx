import React from 'react';
import Title from 'react-title-component';

import MarkdownElement from '../../MarkdownElement';
import usageText from './usage.md';

const Usage = () => (
  <div>
    <Title render={(previousTitle) => `Usage - ${previousTitle}`} />
    <MarkdownElement text={usageText} />
  </div>
);

export default Usage;
