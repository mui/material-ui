import React from 'react';
import CodeBlock from './CodeBlock';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';

class CodeExample extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    code: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    layoutSideBySide: React.PropTypes.bool,
    title: React.PropTypes.string,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object,
  };

  render() {
    const {
      children,
      code,
      layoutSideBySide,
    } = this.props;

    const palette = this.context.muiTheme.rawTheme.palette;
    const canvasColor = palette.canvasColor;

    const styles = {
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
  }
}

export default CodeExample;
