import React from 'react';
import Title from 'react-title-component';
import CodeExample from '../../CodeExample';
import MarkdownElement from '../../MarkdownElement';
import stylesText from './styles.md';
import stylesOverridingInlineText from './styles-overriding-inline.md';
import StylesOverridingInlineExample from './StylesOverridingInlineExample';
import stylesOverridingInlineExampleCode from '!raw!./StylesOverridingInlineExample';
import stylesOvveridingCssText from './styles-overriding-css.md';
import StylesOverridingCssExample from './StylesOverridingCssExample';
import stylesOvveridingCssExampleCode from '!raw!./StylesOverridingCssExample';

const stylesOvveridingCssExampleCodeWithCss = `${stylesOvveridingCssExampleCode}
/*
  With the following css style:

  .styles-overriding-css-example {
    width: 50% !important;
    margin: 0 auto !important;
    border: 2px solid #FF9800 !important;
    background-color: #ffd699 !important;
  }
*/
`;

const Styles = () => (
  <div>
    <Title render={(previousTitle) => `Styles - ${previousTitle}`} />
    <MarkdownElement text={stylesText} />
    <MarkdownElement text={stylesOverridingInlineText} />
    <CodeExample
      title="Inline Style example"
      code={stylesOverridingInlineExampleCode}
      component={false}
    >
      <StylesOverridingInlineExample />
    </CodeExample>
    <MarkdownElement text={stylesOvveridingCssText} />
    <CodeExample
      title="CSS Style example"
      code={stylesOvveridingCssExampleCodeWithCss}
      component={false}
    >
      <StylesOverridingCssExample />
    </CodeExample>
  </div>
);

export default Styles;
