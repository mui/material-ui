import React from 'react';
import MarkdownElement from '../MarkdownElement';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from 'material-ui/lib/mixins/style-propable';
import Transitions from 'material-ui/lib/styles/transitions';
import CodeBlockTitle from './CodeBlockTitle';

const styles = {
  root: {
    background: '#f8f8f8',
    borderTop: 'solid 1px #e0e0e0',
  },
  markdown: {
    overflow: 'auto',
    maxHeight: 1400,
    transition: Transitions.create('max-height', '800ms', '0ms', 'ease-in-out'),
    marginTop: 0,
    marginBottom: 0,
  },
  markdownRetracted: {
    maxHeight: 0,
  },
  description: {
    background: '#ffffff',
    overflow: 'auto',
    padding: '10px 20px 0',
    marginTop: 0,
    marginBottom: 0,
  },
  codeBlockTitle: {
    cursor: 'pointer',
  },
};

const CodeBlock = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
    description: React.PropTypes.string,
    title: React.PropTypes.string,
  },
  mixins: [
    PureRenderMixin,
  ],
  getInitialState: function() {
    return {
      expand: false,
    };
  },
  handleTouchTap() {
    this.setState({
      expand: !this.state.expand,
    });
  },
  render() {
    const text = `\`\`\`js
${this.props.children}
    \`\`\``;

    const descriptionStyle = styles.description;
    let codeStyle;

    if (this.state.expand) {
      codeStyle = styles.markdown;
    } else {
      codeStyle = StylePropable.mergeStyles(styles.markdown, styles.markdownRetracted);
    }

    return (
      <div style={styles.root}>
        <div onTouchTap={this.handleTouchTap} style={styles.codeBlockTitle}>
          <CodeBlockTitle title={this.props.title} />
        </div>
        <MarkdownElement style={codeStyle} text={text} />
        <MarkdownElement style={descriptionStyle} text={this.props.description} />
      </div>
    );
  },
});

export default CodeBlock;
