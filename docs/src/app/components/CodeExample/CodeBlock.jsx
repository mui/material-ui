import React from 'react';
import MarkdownElement from '../MarkdownElement';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import StylePropable from 'material-ui/lib/mixins/style-propable';
import FlatButton from 'material-ui/lib/flat-button';
import Transitions from 'material-ui/lib/styles/transitions';

const LINE_MAX = 7;

const styles = {
  root: {
    background: '#f8f8f8',
    borderTop: 'solid 1px #e0e0e0',
  },
  markdown: {
    overflow: 'auto',
    maxHeight: 1400,
    transition: Transitions.create('max-height', '800ms', '0ms', 'ease-in-out'),
  },
  markdownRetracted: {
    maxHeight: LINE_MAX * 18,
  },
  expand: {
    padding: 10,
    textAlign: 'center',
  },
};

const CodeBlock = React.createClass({
  propTypes: {
    children: React.PropTypes.string,
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

    const lineNumber = (text.match(/\n/g) || []).length;

    let expand;
    let style = styles.markdown;

    if (lineNumber > LINE_MAX) {
      let label;

      if (this.state.expand) {
        label = 'Retract the example';
      } else {
        style = StylePropable.mergeStyles(styles.markdown, styles.markdownRetracted);
        label = 'Expand the example';
      }

      expand = (
        <div
          style={styles.expand}
          onTouchTap={this.handleTouchTap}
        >
          <FlatButton label={label} />
        </div>
      );
    }

    return (
      <div style={styles.root}>
        <MarkdownElement
          style={style}
          text={text}
        />
        {expand}
      </div>
    );
  },
});

export default CodeBlock;
