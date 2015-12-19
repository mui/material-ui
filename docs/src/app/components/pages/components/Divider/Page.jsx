import React from 'react';
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
import dividerCode from '!raw!material-ui/lib/Divider';

const DividerPage = () => {
  return (
    <div>
      <MarkdownElement text={dividerReadmeText} />
      <CodeExample code={dividerExampleFormCode}>
        <DividerExampleForm />
      </CodeExample>
      <CodeExample code={dividerExampleListCode}>
        <DividerExampleList />
      </CodeExample>
      <CodeExample code={dividerExampleMenuCode}>
        <DividerExampleMenu />
      </CodeExample>
      <PropTypeDescription code={dividerCode}/>
    </div>
  );
};

export default DividerPage;
