import React, {createElement} from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
// import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

// import formCode from '!raw!material-ui/Form/Form';
import formReadmeText from './README';

// read all examples
const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter((item) => !!item.match(/[e,E]xample/));
const examples = keys.reduce((memo, key) => {
  memo[key.match(/([^\/]+)\.js$/)[1]] = context(key).default;
  return memo;
}, {});

examples.code = {
  InlineExample: require('!raw!./InlineExample'),
};

examples.descriptions = {
  InlineExample: 'Basic form,often used for login',
  public: 'Form Component public defcription',
};

const FormPage = () => (
  <div>
    <Title render={(previousTitle) => `Form - ${previousTitle}`} />
    <MarkdownElement text={formReadmeText} />
    {
      Object.keys(examples).filter((item) => !!item.match(/[e,E]xample/)).map((exampleName) => {
        return (
          <CodeExample
            key={exampleName}
            title={exampleName}
            description={examples.descriptions[exampleName]}
            code={examples.code[exampleName]}
          >
            {
              createElement(examples[exampleName], {})
            }
          </CodeExample>
        );
      })
    }
  </div>
);

export default FormPage;
