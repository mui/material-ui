import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import requiredKnowledge from './required-knowledge.md';

const RequiredKnowledge = () => (
  <div>
    <Title render={(previousTitle) => `Required Knowledge - ${previousTitle}`} />
    <MarkdownElement text={requiredKnowledge} />
  </div>
);

export default RequiredKnowledge;
