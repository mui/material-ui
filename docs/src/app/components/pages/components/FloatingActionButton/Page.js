import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import floatingButtonReadmeText from './README';
import floatingButtonExampleSimpleCode from '!raw!./ExampleSimple';
import FloatingButtonExampleSimple from './ExampleSimple';
import floatingButtonCode from '!raw!material-ui/FloatingActionButton/FloatingActionButton';

const FloatingActionButtonPage = () => (
  <div>
    <Title render={(previousTitle) => `Floating Action Button - ${previousTitle}`} />
    <MarkdownElement text={floatingButtonReadmeText} />
    <CodeExample code={floatingButtonExampleSimpleCode}>
      <FloatingButtonExampleSimple />
    </CodeExample>
    <PropTypeDescription code={floatingButtonCode} />
  </div>
);

export default FloatingActionButtonPage;
