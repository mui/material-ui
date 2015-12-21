import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';
import cardReadmeText from './README';
import cardExampleWithAvatarCode from '!raw!./ExampleWithAvatar';
import CardExampleWithAvatar from './ExampleWithAvatar';
import cardExampleWithoutAvatarCode from '!raw!./ExampleWithoutAvatar';
import CardExampleWithoutAvatar from './ExampleWithoutAvatar';
import cardCode from '!raw!material-ui/lib/card/card';

export default class CardPage extends React.Component {
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
