// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import CodeIcon from 'material-ui-icons/Code';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.contentFrame,
    marginBottom: 40,
    marginLeft: -theme.spacing.unit * 2,
    marginRight: -theme.spacing.unit * 2,
  },
  demo: theme.mixins.gutters({
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  }),
  codeButton: {
    flip: false,
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
});

class Demo extends React.Component<any, any> {
  state = {
    codeOpen: false,
  };

  handleCodeButtonClick = () => {
    this.setState({
      codeOpen: !this.state.codeOpen,
    });
  };

  render() {
    const { classes, js: DemoComponent, raw } = this.props;
    const { codeOpen } = this.state;

    return (
      <div className={classes.root}>
        <Tooltip title={codeOpen ? 'Hide the source' : 'Show the source'} placement="top">
          <IconButton onClick={this.handleCodeButtonClick} className={classes.codeButton}>
            <CodeIcon />
          </IconButton>
        </Tooltip>
        <Collapse in={codeOpen} unmountOnExit>
          <MarkdownElement dir="ltr" className={classes.code} text={`\`\`\`js\n${raw}\n\`\`\``} />
        </Collapse>
        <div className={classes.demo}>
          <DemoComponent />
        </div>
      </div>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
  js: PropTypes.func.isRequired,
  raw: PropTypes.string.isRequired,
};

export default withStyles(styles)(Demo);
