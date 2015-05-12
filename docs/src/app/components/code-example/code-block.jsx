var React = require('react');
var hljs = require('highlight.js');
var mui = require('mui');
var Spacing = mui.Styles.Spacing;

class CodeBlock extends React.Component {

  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidMount() {
    hljs.highlightBlock(React.findDOMNode(this));
  }

  componentDidUpdate(prevProps, prevState) {
    hljs.highlightBlock(React.findDOMNode(this));
  }

  getStyles() {
    var borderColor = this.context.muiTheme.palette.borderColor;
    return {
      padding: Spacing.desktopGutter,
      margin: '0',
      borderRadius: '0 0 2px 2px',
      borderTop: 'solid 1px ' + borderColor
    };
  }

  render() {
    return (
      <pre style={this.getStyles()}>
        <code>{this.props.children}</code>
      </pre>
    );
  }
}

CodeBlock.contextTypes = {
  muiTheme: React.PropTypes.object
}

module.exports = CodeBlock;
