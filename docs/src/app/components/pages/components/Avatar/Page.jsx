import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import avatarReadmeText from './README';
import AvatarExampleSimple from './ExampleSimple';
import avatarExampleSimpleCode from '!raw!./ExampleSimple';
import avatarCode from '!raw!material-ui/lib/avatar';

const AvatarsPage = () => (
  <div>
    <MarkdownElement text={avatarReadmeText} />
    <CodeExample code={avatarExampleSimpleCode}>
      <AvatarExampleSimple />
    </CodeExample>
    <PropTypeDescription code={avatarCode}/>
  </div>
);

export default AvatarsPage;
