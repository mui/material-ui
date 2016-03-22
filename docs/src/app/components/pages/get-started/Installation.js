import React from 'react';
import Title from 'react-title-component';

import MarkdownElement from '../../MarkdownElement';
import installationText from './installation.md';

const Installation = () => (
  <div>
    <Title render={(previousTitle) => `Installation - ${previousTitle}`} />
    <MarkdownElement text={installationText} />
  </div>
);

export default Installation;
