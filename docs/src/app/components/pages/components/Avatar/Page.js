import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import avatarReadmeText from './README';
import AvatarExampleSimple from './ExampleSimple';
import avatarExampleSimpleCode from '!raw!./ExampleSimple';
import avatarCode from '!raw!material-ui/Avatar/Avatar';

const AvatarsPage = () => (
  <div>
    <Title render={(previousTitle) => `Avatar - ${previousTitle}`} />
    <MarkdownElement text={avatarReadmeText} />
    <CodeExample
      code={avatarExampleSimpleCode}
      title="Examples"
    >
      <AvatarExampleSimple />
    </CodeExample>
    <PropTypeDescription code={avatarCode} />
  </div>
);

export default AvatarsPage;
