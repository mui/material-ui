// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import CodeIcon from 'material-ui-icons/Code';
import MarkdownElement from 'docs/src/components/MarkdownElement';

const requireDemos = require.context('docs/src', true, /\.js$/);
const requireDemoSource = require.context('!raw-loader!docs/src', true, /\.js$/);

const styleSheet = createStyleSheet(theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor: theme.palette.background.contentFrame,
    marginBottom: 40,
    marginLeft: -16,
    marginRight: -16,
  },
  demo: theme.mixins.gutters({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }),
  codeButton: {
    display: 'none',
    zIndex: 10,
    position: 'absolute',
    top: 2,
    right: 7,
  },
  code: {
    display: 'none',
    padding: 0,
    margin: 0,
    '& pre': {
      overflow: 'auto',
      margin: '0px !important',
      borderRadius: '0px !important',
    },
  },
  [theme.breakpoints.up(600)]: {
    codeButton: {
      display: 'block',
    },
    code: {
      display: 'block',
    },
    root: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));

class Demo extends Component {
  state = {
    codeOpen: false,
  };

  handleCodeButtonClick = () => {
    this.setState({
      codeOpen: !this.state.codeOpen,
    });
  };

  render() {
    const DemoComponent = requireDemos(`./${this.props.demo}`).default;
    const demoSource = requireDemoSource(`./${this.props.demo}`);
    const classes = this.props.classes;
    const code = `\`\`\`js\n${demoSource}\n\`\`\``;

    return (
      <div className={classes.root}>
        <IconButton onClick={this.handleCodeButtonClick} className={classes.codeButton}>
          <CodeIcon />
        </IconButton>
        <Collapse in={this.state.codeOpen}>
          <MarkdownElement className={classes.code} text={code} />
        </Collapse>
        <div className={classes.demo} data-mui-demo={this.props.demo}>
          <DemoComponent />
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  demo: PropTypes.string.isRequired,
};

export default withStyles(styleSheet)(Demo);
