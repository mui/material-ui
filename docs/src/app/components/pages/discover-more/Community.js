import React from 'react';
import Title from 'react-title-component';

import MarkdownElement from '../../MarkdownElement';
import communityText from './community.md';

const Community = () => (
  <div>
    <Title render={(previousTitle) => `Community - ${previousTitle}`} />
    <MarkdownElement text={communityText} />
  </div>
);

export default Community;
