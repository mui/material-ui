import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import cardReadmeText from './README';
import cardExampleWithAvatarCode from '!raw!./ExampleWithAvatar';
import CardExampleWithAvatar from './ExampleWithAvatar';
import cardExampleExpandableCode from '!raw!./ExampleExpandable';
import CardExampleExpandable from './ExampleExpandable';
import cardExampleControlledCode from '!raw!./ExampleControlled';
import CardExampleControlled from './ExampleControlled';

import cardCode from '!raw!material-ui/Card/Card';
import cardActionsCode from '!raw!material-ui/Card/CardActions';
import cardHeaderCode from '!raw!material-ui/Card/CardHeader';
import cardMediaCode from '!raw!material-ui/Card/CardMedia';
import cardTextCode from '!raw!material-ui/Card/CardText';
import cardTitleCode from '!raw!material-ui/Card/CardTitle';

const descriptions = {
  avatar: 'A `Card` containing each of the card components: `CardHeader` (with avatar), `CardMedia` (with overlay), ' +
  '`CardTitle`, `CardText` & `CardActions`.',
  simple: 'An expandable `Card` with `CardHeader`, `CardText` and `CardActions`. ' +
  'Use the icon to expand the card.',
  controlled: 'A controlled expandable `Card`. Use the icon, the toggle or the ' +
  'buttons to control the expanded state of the card.',
};

const CardPage = () => (
  <div>
    <Title render={(previousTitle) => `Card - ${previousTitle}`} />
    <MarkdownElement text={cardReadmeText} />
    <CodeExample
      title="Card components example"
      description={descriptions.avatar}
      code={cardExampleWithAvatarCode}
    >
      <CardExampleWithAvatar />
    </CodeExample>
    <CodeExample
      title="Expandable example"
      description={descriptions.simple}
      code={cardExampleExpandableCode}
    >
      <CardExampleExpandable />
    </CodeExample>
    <CodeExample
      title="Controlled example"
      description={descriptions.controlled}
      code={cardExampleControlledCode}
    >
      <CardExampleControlled />
    </CodeExample>
    <PropTypeDescription code={cardCode} header="### Card properties" />
    <PropTypeDescription code={cardActionsCode} header="### CardActions properties" />
    <PropTypeDescription code={cardHeaderCode} header="### CardHeader properties" />
    <PropTypeDescription code={cardMediaCode} header="### CardMedia properties" />
    <PropTypeDescription code={cardTextCode} header="### CardText properties" />
    <PropTypeDescription code={cardTitleCode} header="### CardTitle properties" />
  </div>
);

export default CardPage;
