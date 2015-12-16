import React from 'react';
import badgeCode from '!raw!material-ui/lib/badge';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import MarkdownElement from '../../MarkdownElement';
import badgeReadmeText from '../../Badge/README';
import BadgeExampleSimple from '../../Badge/ExampleSimple';
import badgeExampleSimpleCode from '!raw!../../Badge/ExampleSimple';
import BadgeExampleContent from '../../Badge/ExampleContent';
import badgeExampleContentCode from '!raw!../../Badge/ExampleContent';

const BadgePage = () => {
  return (
    <div>
      <MarkdownElement text={badgeReadmeText} />
      <CodeExample code={badgeExampleSimpleCode}>
        <BadgeExampleSimple />
      </CodeExample>
      <CodeExample code={badgeExampleContentCode}>
        <BadgeExampleContent />
      </CodeExample>
      <PropTypeDescription code={badgeCode}/>
    </div>
  );
};

export default BadgePage;
