var React = require('react'),
  hljs = require('highlight.js');

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
    return (
      <pre className="code-block">
        <code>{this.props.children}</code>
      </pre>
    );
  }

}

module.exports = CodeBlock;
