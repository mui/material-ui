import React from 'react';
import MarkdownElement from '../MarkdownElement';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const CodeBlock = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
  },
  mixins: [
    PureRenderMixin,
  ],
  render() {
    const text = `\`\`\`js
${this.props.children}
    \`\`\``;

    return (
      <div className="CodeMirror">
        <MarkdownElement text={text} />
      </div>
    );
  },
});

export default CodeBlock;
