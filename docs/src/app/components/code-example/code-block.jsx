let React = require('react');
let hljs = require('highlight.js');
let { Styles } = require('material-ui');
let { Spacing } = Styles;


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

  render() {

    let borderColor = this.context.muiTheme.palette.borderColor;

    let styles = {
      padding: Spacing.desktopGutter,
      margin: 0,
      borderRadius: '0 0 2px 2px',
      borderTop: 'solid 1px ' + borderColor,
    };

    return (
      <pre style={styles}>
        <code>{this.props.children}</code>
      </pre>
    );
  }
}

CodeBlock.contextTypes = {
  muiTheme: React.PropTypes.object
}

module.exports = CodeBlock;
