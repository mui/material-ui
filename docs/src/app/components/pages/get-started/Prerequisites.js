import React from 'react';
import Title from 'react-title-component';

import MarkdownElement from '../../MarkdownElement';
import prerequisitesText from './prerequisites.md';

const Prerequisites = () => (
  <div>
    <Title render={(previousTitle) => `Prerequisites - ${previousTitle}`} />
    <MarkdownElement text={prerequisitesText} />
  </div>
);

export default Prerequisites;
