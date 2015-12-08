import React from 'react';
import avatarCode from '!raw!material-ui/avatar';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import AvatarExampleSimple from '../../Avatar/ExampleSimple';
import avatarExampleSimpleCode from '!raw!../../Avatar/ExampleSimple';
import MarkdownElement from '../../MarkdownElement';
import avatarReadmeText from '../../Avatar/README';

export default class AvatarsPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MarkdownElement text={avatarReadmeText} />
        <CodeExample code={avatarExampleSimpleCode}>
          <AvatarExampleSimple />
        </CodeExample>
        <PropTypeDescription code={avatarCode}/>
      </div>
    );
  }
}
