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
  simple: 'A simple example of `GridTileList` component based on SPEAK UI.',
  complex: 'Material-ui original `GridList` component. This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the ' +
  'tile. The tiles have a customised title, positioned at the top and with a custom gradient `titleBackground`.',
};
const GridListPage = () => (
  <div>
    <Title render={(previousTitle) => `Grid List - ${previousTitle}`} />
    <MarkdownElement text={gridListReadmeText} />
    <CodeExample
      title="SPEAK like GridTileList"
      description={descriptions.simple}
      code={gridListExampleSimpleCode}
    >
      <GridListExampleSimple />
    </CodeExample>
    
    <CodeExample
      title="Original Material-ui GridList"
      description={descriptions.complex}
      code={gridListExampleSimpleCode}
    >
      <GridListExampleComplex />
    </CodeExample>
   
    <PropTypeDescription header="### GridList Properties" code={gridListCode} />
    <PropTypeDescription header="### GridTile Properties" code={gridTileCode} />
  </div>
);

export default GridListPage;
