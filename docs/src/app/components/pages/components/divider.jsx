import React from 'react';
import dividerCode from '!raw!material-ui/lib/divider';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import DividerExampleForm from '../../Divider/ExampleForm';
import dividerExampleFormCode from '!raw!../../Divider/ExampleForm';
import DividerExampleList from '../../Divider/ExampleList';
import dividerExampleListCode from '!raw!../../Divider/ExampleList';
import DividerExampleMenu from '../../Divider/ExampleMenu';
import dividerExampleMenuCode from '!raw!../../Divider/ExampleMenu';
import MarkdownElement from '../../MarkdownElement';
import dividerReadmeText from '../../Divider/README';

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
