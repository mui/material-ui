import React from 'react';
import Title from 'react-title-component';
import MarkdownElement from '../../MarkdownElement';
import usingContextText from './using-context.md';

const UsingContext = () => {
  return (
    <div>
      <Title render={(previousTitle) => `Using Context - ${previousTitle}`} />
      <MarkdownElement text={usingContextText} />
    </div>
  );
};

export default UsingContext;
