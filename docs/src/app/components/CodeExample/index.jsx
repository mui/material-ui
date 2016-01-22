import React from 'react';
import CodeBlock from './CodeBlock';
import ClearFix from 'material-ui/lib/clearfix';
import Paper from 'material-ui/lib/paper';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

const CodeExample = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    code: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    layoutSideBySide: React.PropTypes.bool,
    title: React.PropTypes.string,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
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
    let canvasColor = palette.canvasColor;

    let styles = {
      root: {
        backgroundColor: canvasColor,
        marginBottom: 32,
      },
      exampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: '14px 24px 24px',
        margin: 0,
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null,
      },
    };

    return (
      <Paper style={styles.root}>
        <CodeBlock title={this.props.title} description={this.props.description}>{code}</CodeBlock>
        <ClearFix style={styles.exampleBlock}>{children}</ClearFix>
      </Paper>
    );
  },
});

export default CodeExample;
