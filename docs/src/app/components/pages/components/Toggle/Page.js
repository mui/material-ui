import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import toggleReadmeText from './README';
import ToggleExampleSimple from './ExampleSimple';
import toggleExampleSimpleCode from '!raw!./ExampleSimple';
import toggleCode from '!raw!material-ui/Toggle/Toggle';

const description = 'The second example is selected by default using the `defaultToggled` property. The third ' +
  'example is disabled using the `disabled` property. The final example uses the `labelPosition` property to ' +
  'position the label on the right.';

const TogglePage = () => (
  <div>
    <Title render={(previousTitle) => `Toggle - ${previousTitle}`} />
    <MarkdownElement text={toggleReadmeText} />
    <CodeExample
      title="Examples"
      description={description}
      code={toggleExampleSimpleCode}
    >
      <ToggleExampleSimple />
    </CodeExample>
    <PropTypeDescription code={toggleCode} />
  </div>
);

export default TogglePage;
