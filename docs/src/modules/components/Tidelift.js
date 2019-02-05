import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme
      .spacing.unit * 2}px`,
    right: 0,
    left: 0,
    display: 'flex',
    color: theme.palette.common.white,
    backgroundColor: '#626980', // Tidelift color.
    position: 'relative',
    top: 56,
    [theme.breakpoints.up('sm')]: {
      top: 64 + 36 / 2,
      left: 'auto',
      position: 'absolute',
      borderBottomLeftRadius: 36 / 2,
      borderTopLeftRadius: 36 / 2,
    },
  },
  logo: {
    background: 'url(/static/images/tidelift.svg) no-repeat 50%',
    content: '""',
    width: 20,
    height: 20,
    margin: `0 ${theme.spacing.unit}px 0 0`,
  },
});

function Tidelift(props) {
  const { classes, t } = props;

  return (
    <Link
      data-ga-event-category="sponsors"
      data-ga-event-action="logo"
      data-ga-event-label="tidelift"
      className={classNames(classes.root, 'mui-fixed')}
      href="https://tidelift.com/subscription/pkg/npm-material-ui?utm_source=material_ui&utm_medium=referral&utm_campaign=homepage"
      target="_blank"
      rel="noopener"
    >
      <span className={classes.logo} />
      <Typography color="inherit">{t('tidelift')}</Typography>
    </Link>
  );
}

Tidelift.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  connect(state => ({ t: state.options.t })),
  withStyles(styles),
)(Tidelift);
