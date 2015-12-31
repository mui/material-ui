import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import iconButtonCode from '!raw!material-ui/lib/icon-button';
import iconButtonReadmeText from './README';
import iconButtonExampleSimpleCode from '!raw!./ExampleSimple';
import IconButtonExampleSimple from './ExampleSimple';
import iconButtonExampleTooltipCode from '!raw!./ExampleTooltip';
import IconButtonExampleTooltip from './ExampleTooltip';
import iconButtonExampleTouchCode from '!raw!./ExampleTouch';
import IconButtonExampleTouch from './ExampleTouch';
import iconButtonExampleMaterialCode from '!raw!./ExampleMaterial';
import IconButtonExampleMaterial from './ExampleMaterial';


const IconButtonPage = () => (
  <div>
    <MarkdownElement text={iconButtonReadmeText} />
    <CodeExample code={iconButtonExampleSimpleCode}>
      <IconButtonExampleSimple/>
    </CodeExample>
    <CodeExample code={iconButtonExampleTooltipCode}>
      <IconButtonExampleTooltip/>
    </CodeExample>
    <CodeExample code={iconButtonExampleTouchCode}>
      <IconButtonExampleTouch/>
    </CodeExample>
    <CodeExample code={iconButtonExampleMaterialCode}>
      <IconButtonExampleMaterial/>
    </CodeExample>
    <PropTypeDescription code={iconButtonCode} />
  </div>
);

export default IconButtonPage;
