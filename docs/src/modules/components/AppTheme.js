import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';
import Head from 'docs/src/modules/components/Head';

const styles = theme => ({
  credit: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
  },
  hideCredit: {
    position: 'absolute',
    top: 0,
  },
});

function AppTheme(props) {
  const { children, classes, description, hideCredit, title } = props;
  return (
    <React.Fragment>
      <Head title={title} description={description} />
      {children}
      <Typography
        color="textSecondary"
        align="center"
        className={clsx(classes.credit, {
          [classes.hideCredit]: hideCredit,
        })}
      >
        {'Built with '}
        <span role="img" aria-label="Love">
          ❤️
        </span>
        {' by the '}
        <Link color="inherit" href="/">
          Material-UI
        </Link>
        {' team.'}
      </Typography>
    </React.Fragment>
  );
}

AppTheme.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  hideCredit: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

AppTheme.defaultProps = {
  hideCredit: false,
};

export default withStyles(styles)(AppTheme);
