const React = require('react');

const {
  ClearFix,
  Paper,
  Styles,
} = require('material-ui');

const {
  Spacing,
  Typography,
} = Styles;

const CodeBlock = require('./code-block');
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;

const CodeExample = React.createClass({

  propTypes : {
    code: React.PropTypes.string.isRequired,
    layoutSideBySide: React.PropTypes.bool,
  },

  contextTypes : {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  render() {

    let {
      children,
      code,
      layoutSideBySide,
    } = this.props;

    let palette = this.state.muiTheme.rawTheme.palette;
    let borderColor = palette.borderColor;
    let canvasColor = palette.canvasColor;

    let styles = {
      root: {
        backgroundColor: canvasColor,
        marginBottom: 32,
        overflow: 'hidden',
      },
      exampleLabel: {
        color: borderColor,
        padding: 8,
        marginBottom: 0,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium,
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: Spacing.desktopGutter,
        margin: 0,
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null,
      },
    };

    return (
      <Paper style={styles.root}>
        <ClearFix style={styles.exampleBlock}>{children}</ClearFix>
        <CodeBlock style={styles.codeBlock}>{code}</CodeBlock>
      </Paper>
    );
  },
});

module.exports = CodeExample;
