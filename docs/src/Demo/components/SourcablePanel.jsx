import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Collapse from 'material-ui/transitions/Collapse';
import { Typography, IconButton, withStyles } from 'material-ui';
import Code from '../components/Code';

class SourcablePanel extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    sourceFile: PropTypes.string.isRequired,
  }

  state = {
    sourceExpanded: false,
  }

  getSource = () => {
    const webpackRawLoader = require.context('!raw-loader!../Examples', false, /\.jsx$/);
    const file = webpackRawLoader(`./${this.props.sourceFile}`);

    return file;
  }

  toggleSource = () => {
    this.setState({ sourceExpanded: !this.state.sourceExpanded });
  }

  render() {
    const { sourceExpanded } = this.state;
    const { classes, title } = this.props;

    return [
      <Typography
        key="title"
        type="display1"
        className={classes.exampleTitle}
      >
        { title }
      </Typography>,

      <Collapse key="code" in={sourceExpanded}>
        <Code className={classes.source} text={this.getSource()} />
      </Collapse>,

      <div key="picker" className={classes.pickers}>
        <IconButton
          className={classes.sourceBtn}
          onClick={this.toggleSource}
        >
          code
        </IconButton>
        { this.props.children }
      </div>,
    ];
  }
}

const styles = theme => ({
  exampleTitle: {
    marginTop: '40px',
    marginBottom: '20px',
    '@media(max-width: 600px)': {
      marginLeft: 5,
    },
  },
  pickers: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    minHeight: 160,
    paddingTop: 40,
    width: '100%',
    margin: '0 auto 50px',
    position: 'relative',
    backgroundColor: theme.palette.background.contentFrame,
  },
  sourceBtn: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  source: {
    marginBottom: 0,
  },
});

export default withStyles(styles)(SourcablePanel);

