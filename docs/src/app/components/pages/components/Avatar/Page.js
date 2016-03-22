import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import avatarReadmeText from './README';
import AvatarExampleSimple from './ExampleSimple';
import avatarExampleSimpleCode from '!raw!./ExampleSimple';
import avatarCode from '!raw!material-ui/lib/Avatar/Avatar';

const description = 'Examples of `Avatar` using an image, [Font Icon](/#/components/font-icon), ' +
  '[SVG Icon](/#/components/svg-icon) and "Letter" (string), with and without custom colors.';

const AvatarsPage = () => (
  <div>
    <Title render={(previousTitle) => `Avatar - ${previousTitle}`} />
    <MarkdownElement text={avatarReadmeText} />
    <CodeExample
      code={avatarExampleSimpleCode}
      title="Examples"
      description={description}
    >
      <AvatarExampleSimple />
    </CodeExample>
    <PropTypeDescription code={avatarCode} />
  </div>
);

export default AvatarsPage;
