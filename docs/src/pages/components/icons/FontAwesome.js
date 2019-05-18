import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing(2),
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
});

class FontAwesome extends React.Component {
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} />
        <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} color="primary" />
        <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} color="secondary" />
        <Icon className={clsx(classes.icon, 'fa fa-plus-circle')} color="action" />
        <Icon
          className={clsx(classes.iconHover, 'fa fa-plus-circle')}
          color="error"
          style={{ fontSize: 30 }}
        />
        <Icon
          className={clsx(classes.icon, 'fa fa-plus-circle')}
          color="disabled"
          fontSize="large"
        />
      </div>
    );
  }
}

FontAwesome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FontAwesome);
