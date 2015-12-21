import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';
import badgeReadmeText from './README';
import BadgeExampleSimple from './ExampleSimple';
import badgeExampleSimpleCode from '!raw!./ExampleSimple';
import BadgeExampleContent from './ExampleContent';
import badgeExampleContentCode from '!raw!./ExampleContent';
import badgeCode from '!raw!material-ui/lib/badge';

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
