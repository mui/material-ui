import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import gridListReadmeText from 'material-ui/GridList/examples/README';
import gridListExampleSimpleCode from '!raw!material-ui/GridList/examples/ExampleSimple';
import GridListExampleSimple from 'material-ui/GridList/examples/ExampleSimple';
import gridListExampleComplexCode from '!raw!material-ui/GridList/examples/ExampleComplex';
import GridListExampleComplex from 'material-ui/GridList/examples/ExampleComplex';
import gridListCode from '!raw!material-ui/lib/GridList/GridList';
import gridTileCode from '!raw!material-ui/lib/GridList/GridTile';

const descriptions = {
  simple: 'A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).',
  complex: 'This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the ' +
  'tile. The tiles have a customised title, positioned at the top and with a custom gradient `titleBackground`.',
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
    <CodeExample
      title="Complex example"
      description={descriptions.complex}
      code={gridListExampleComplexCode}
    >
      <GridListExampleComplex />
    </CodeExample>
    <PropTypeDescription header="### GridList Properties" code={gridListCode} />
    <PropTypeDescription header="### GridTile Properties" code={gridTileCode} />
  </div>
);

export default GridListPage;
