import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import floatingButtonCode from '!raw!material-ui/lib/floating-action-button';
import floatingButtonReadmeText from './README';
import floatingButtonExampleSimpleCode from '!raw!./ExampleSimple';
import FloatingButtonExampleSimple from './ExampleSimple';


const descriptions = {
  simple: 'Default size and `mini` FABs, in primary (default), `secondary` and `disabled` colors.',
};

const FloatingActionButtonPage = () => (
  <div>
    <MarkdownElement text={floatingButtonReadmeText} />
    <CodeExample description={descriptions.simple} code={floatingButtonExampleSimpleCode}>
      <FloatingButtonExampleSimple />
    </CodeExample>
    <PropTypeDescription code={floatingButtonCode} />
  </div>
);

export default FloatingActionButtonPage;
