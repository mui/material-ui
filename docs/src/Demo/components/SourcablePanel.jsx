import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles';

class SourcablePanel extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.pickers}>
        { this.props.children }
      </div>
    )
  }
}

const styles = theme => ({
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
})

export default withStyles(styles)(SourcablePanel)