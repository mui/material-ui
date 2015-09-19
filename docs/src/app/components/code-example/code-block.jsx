let React = require('react');
let { Styles } = require('material-ui');
let { Spacing } = Styles;


class CodeBlock extends React.Component {

  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    var code = React.findDOMNode(this.refs.code);
    require([
      "codemirror/lib/codemirror.js",
      "codemirror/mode/htmlmixed/htmlmixed.js",
    ], function(Codemirror){
      Codemirror.fromTextArea(code, {
        mode: "htmlmixed",
        readOnly: true,
      });
    });
  }

  shouldComponentUpdate({children}, nextState){
    return this.props.children !== children;
  }

  render() {
    return (
      <textarea ref="code" value={this.props.children} readOnly={true}/>
    );
  }
}

CodeBlock.contextTypes = {
  muiTheme: React.PropTypes.object
}

module.exports = CodeBlock;
