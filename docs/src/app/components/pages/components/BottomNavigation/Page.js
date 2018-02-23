import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import bottomNavigationReadmeText from './README';
import BottomNavigationExampleSimple from './ExampleSimple';
import bottomNavigationExampleSimpleCode from '!raw!./ExampleSimple';
import bottomNavigationCode from '!raw!material-ui/BottomNavigation/BottomNavigation';
import bottomNavigationItemCode from '!raw!material-ui/BottomNavigation/BottomNavigationItem';

const BottomNavigationPage = () => (
  <div>
    <Title render={(previousTitle) => `Bottom Navigation - ${previousTitle}`} />
    <MarkdownElement text={bottomNavigationReadmeText} />
    <CodeExample
      code={bottomNavigationExampleSimpleCode}
      title="Simple example"
    >
      <BottomNavigationExampleSimple />
    </CodeExample>
    <PropTypeDescription header="### BottomNavigation Properties" code={bottomNavigationCode} />
    <PropTypeDescription header="### BottomNavigationItem Properties" code={bottomNavigationItemCode} />
  </div>
);

export default BottomNavigationPage;
