import React from 'react';
import Title from 'react-title-component';

import MarkdownElement from '../../MarkdownElement';
import relatedProjectsText from './related-projects.md';

const RelatedProjects = () => (
  <div>
    <Title render={(previousTitle) => `Related Projects - ${previousTitle}`} />
    <MarkdownElement text={relatedProjectsText} />
  </div>
);

export default RelatedProjects;
