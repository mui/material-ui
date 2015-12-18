import React from 'react';
import cardCode from '!raw!material-ui/lib/card/card';
import CodeExample from '../../code-example/code-example';
import PropTypeDescription from '../../PropTypeDescription';
import MarkdownElement from '../../MarkdownElement';
import CardExampleWithAvatar from '../../Card/ExampleWithAvatar';
import cardExampleWithAvatarCode from '!raw!../../Card/ExampleWithAvatar';
import CardExampleWithoutAvatar from '../../Card/ExampleWithoutAvatar';
import cardExampleWithoutAvatarCode from '!raw!../../Card/ExampleWithoutAvatar';
import cardReadmeText from '../../Card/README';

export default class CardPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MarkdownElement text={cardReadmeText} />
        <CodeExample code={cardExampleWithAvatarCode}>
          <CardExampleWithAvatar />
        </CodeExample>
        <CodeExample code={cardExampleWithoutAvatarCode}>
          <CardExampleWithoutAvatar />
        </CodeExample>
        <PropTypeDescription code={cardCode} />
      </div>
    );
  }
}
