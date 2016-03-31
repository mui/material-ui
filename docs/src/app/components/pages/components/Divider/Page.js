import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dividerReadmeText from 'material-ui/Divider/examples/README';
import DividerExampleForm from 'material-ui/Divider/examples/ExampleForm';
import dividerExampleFormCode from '!raw!material-ui/Divider/examples/ExampleForm';
import DividerExampleList from 'material-ui/Divider/examples/ExampleList';
import dividerExampleListCode from '!raw!material-ui/Divider/examples/ExampleList';
import DividerExampleMenu from 'material-ui/Divider/examples/ExampleMenu';
import dividerExampleMenuCode from '!raw!material-ui/Divider/examples/ExampleMenu';
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
