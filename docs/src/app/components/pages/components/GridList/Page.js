import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import gridListReadmeText from './README';
import gridListExampleSimpleCode from '!raw!./ExampleSimple';
import GridListExampleSimple from './ExampleSimple';
import gridListExampleComplexCode from '!raw!./ExampleComplex';
import GridListExampleComplex from './ExampleComplex';
import gridListCode from '!raw!material-ui/GridList/GridList';
import gridTileCode from '!raw!material-ui/GridList/GridTile';

const descriptions = {
  simple: 'A simple example of a `GridList`.',  
};

const GridListPage = () => (
  <div>
    <Title render={(previousTitle) => `Grid List - ${previousTitle}`} />
    <MarkdownElement text={gridListReadmeText} />
    <CodeExample
      title="Simple example"
      description={descriptions.simple}
      code={gridListExampleSimpleCode}
    >
      <GridListExampleSimple />
    </CodeExample>
   
    <PropTypeDescription header="### GridList Properties" code={gridListCode} />
    <PropTypeDescription header="### GridTile Properties" code={gridTileCode} />
  </div>
);

export default GridListPage;
