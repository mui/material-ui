import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dividerReadmeText from './README';
import DividerExampleForm from './ExampleForm';
import dividerExampleFormCode from '!raw!./ExampleForm';
import DividerExampleList from './ExampleList';
import dividerExampleListCode from '!raw!./ExampleList';
import DividerExampleMenu from './ExampleMenu';
import dividerExampleMenuCode from '!raw!./ExampleMenu';
import dividerCode from '!raw!material-ui/lib/Divider/Divider';

const descriptions = {
  simple: 'Here, `Divider` is used to separate [TextField](/#/components/text-field) components. ' +
  'It defaults to "full-bleed" (full width).',
  inset: 'The `inset` parameter allows the divider to to align with inset content, ' +
  'such as inset [List](http://localhost:3000/#/components/list) components.',
  menu: '`Divider` can alo be used in [Menus](/#/components/menu).',
};

const DividerPage = () => {
  return (
    <div>
      <Title render={(previousTitle) => `Divider - ${previousTitle}`} />
      <MarkdownElement text={dividerReadmeText} />
      <CodeExample
        title="Form divider"
        description={descriptions.simple}
        code={dividerExampleFormCode}
      >
        <DividerExampleForm />
      </CodeExample>
      <CodeExample
        title="Inset divider"
        description={descriptions.inset}
        code={dividerExampleListCode}
      >
        <DividerExampleList />
      </CodeExample>
      <CodeExample
        title="Menu divider"
        description={descriptions.menu}
        code={dividerExampleMenuCode}
      >
        <DividerExampleMenu />
      </CodeExample>
      <PropTypeDescription code={dividerCode} />
    </div>
  );
};

export default DividerPage;
