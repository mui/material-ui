import React from 'react';
import Title from 'react-title-component';

import MarkdownElement from '../../MarkdownElement';
import contributingText from '../../../../../../CONTRIBUTING.md';

const Contributing = () => (
  <div>
    <Title render={(previousTitle) => `Contributing - ${previousTitle}`} />
    <MarkdownElement text={contributingText} />
  </div>
);

export default Contributing;
