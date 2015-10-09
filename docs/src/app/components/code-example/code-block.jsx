const React = require('react');
const { Styles } = require('material-ui');
const { Spacing } = Styles;


class CodeBlock extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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

  shouldComponentUpdate({children}, nextState) {
    return this.props.children !== children;
  }

  render() {
    return (
      <textarea ref="code" value={this.props.children} readOnly={true}/>
    );
  }
}

//for passing default theme context to children
CodeBlock.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

CodeBlock.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = CodeBlock;
