import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import badgeReadmeText from './README';
import BadgeExampleSimple from './ExampleSimple';
import badgeExampleSimpleCode from '!raw!./ExampleSimple';
import BadgeExampleContent from './ExampleContent';
import badgeExampleContentCode from '!raw!./ExampleContent';
import badgeCode from '!raw!material-ui/lib/Badge/Badge';

const descriptions = {
  simple: 'Two examples of badges containing text, using primary and secondary colors. ' +
  'The badge is applied to its children - an icon for the first example, and an ' +
  '[Icon Button](/#/components/icon-button) with tooltip for the second.',
  further: 'Badges containing an [Icon Button](/#/components/icon-button) and text, ' +
  'applied to an icon, and text.',

};

const BadgePage = () => (
  <div>
    <Title render={(previousTitle) => `Badge - ${previousTitle}`} />
    <MarkdownElement text={badgeReadmeText} />
    <CodeExample
      title="Simple examples"
      description={descriptions.simple}
      code={badgeExampleSimpleCode}
    >
      <BadgeExampleSimple />
    </CodeExample>
    <CodeExample
      title="Further examples"
      description={descriptions.further}
      code={badgeExampleContentCode}
    >
      <BadgeExampleContent />
    </CodeExample>
    <PropTypeDescription code={badgeCode} />
  </div>
);

export default BadgePage;
