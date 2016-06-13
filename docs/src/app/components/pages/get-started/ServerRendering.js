import React from 'react';
import Title from 'react-title-component';

import MarkdownElement from '../../MarkdownElement';
import serverRenderingText from './serverRendering.md';

const ServerRendering = () => (
  <div>
    <Title render={(previousTitle) => `Server Rendering - ${previousTitle}`} />
    <MarkdownElement text={serverRenderingText} />
  </div>
);

export default ServerRendering;
