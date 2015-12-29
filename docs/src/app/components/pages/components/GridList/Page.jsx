import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import gridListCode from '!raw!material-ui/lib/grid-list/grid-list';
import gridTileCode from '!raw!material-ui/lib/grid-list/grid-tile';
import gridListReadmeText from './README';
import gridListExampleSimpleCode from '!raw!./ExampleSimple';
import GridListExampleSimple from './ExampleSimple';
import gridListExampleComplexCode from '!raw!./ExampleComplex';
import GridListExampleComplex from './ExampleComplex';

const GridListPage = () => (
  <div>
    <MarkdownElement text={gridListReadmeText} />
    <CodeExample code={gridListExampleSimpleCode}>
      <GridListExampleSimple />
    </CodeExample>
    <CodeExample code={gridListExampleComplexCode} >
      <GridListExampleComplex />
    </CodeExample>
    <PropTypeDescription code={gridListCode}/>
    <PropTypeDescription code={gridTileCode}/>
  </div>
);

export default GridListPage;
