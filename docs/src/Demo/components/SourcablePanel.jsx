import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from 'material-ui';

class SourcablePanel extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  }

  getSource = () => {

  }

  render() {
    const { classes, title } = this.props;
    return [
      <Typography
        key="title"
        type="display1"
        className={classes.exampleTitle}
      >
        { title }
      </Typography>,

      <div key="picker" className={classes.pickers}>
        { this.props.children }
      </div>,
    ];
  }
}

const styles = theme => ({
  exampleTitle: {
    marginTop: '40px',
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
    margin: '30px auto 50px',
    backgroundColor: theme.palette.background.default,
  },
});

export default withStyles(styles)(SourcablePanel);

