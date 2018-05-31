/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Typography, IconButton, Icon, withStyles, Collapse } from '@material-ui/core';
import Code from './Code';

class SourcablePanel extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
    sourceFile: PropTypes.string.isRequired,
  }

  static defaultProps = {
    description: undefined,
  }

  state = {
    sourceExpanded: false,

  }

  getSource = () => require(`!raw-loader!../Examples/${this.props.sourceFile}`)

  getComponent = () => require(`../Examples/${this.props.sourceFile}`).default

  toggleSource = () => {
    this.setState({ sourceExpanded: !this.state.sourceExpanded });
  }

  render() {
    const { sourceExpanded } = this.state;
    const { classes, title, description } = this.props;
    const Component = this.getComponent();

    return (
      <React.Fragment>
        <Typography variant="display1" className={classes.exampleTitle}>
          { title }
        </Typography>

        {description}

        <Collapse key="code" in={sourceExpanded}>
          <Code className={classes.source} text={this.getSource()} />
        </Collapse>

        <div className={classes.pickers}>
          <IconButton
            className={classes.sourceBtn}
            onClick={this.toggleSource}
          >
            <Icon>code</Icon>
          </IconButton>
          <Component />
        </div>
      </React.Fragment>
    );
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
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900],
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

