import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Breadcrumb from '@material-ui/lab/Breadcrumb';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
  separator: {
    marginLeft: -theme.spacing.unit / 2,
    marginRight: -theme.spacing.unit / 2,
  },
  chip: {
    backgroundColor: theme.palette.grey[100],
    // fontSize: theme.typography.pxToRem(13),
    height: 24,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
  avatar: {
    background: 'none',
    marginRight: -theme.spacing.unit * 1.5,
  },
});

function handleClick() {
  alert('You clicked a Breadcrumb.'); // eslint-disable-line no-alert
}

function CustomBreadcrumb(props) {
  const { classes, className, active, ...rest } = props;
  return <Chip className={classNames(className, classes.chip)} {...rest} />;
}

const StyledBreadcrumb = withStyles(styles)(CustomBreadcrumb);

function CustomizedBreadcrumbs(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Breadcrumbs>
        <Breadcrumb
          label="Home"
          avatar={
            <Avatar className={classes.avatar}>
              <HomeIcon />
            </Avatar>
          }
          component={StyledBreadcrumb}
          onClick={handleClick}
        />
        <Breadcrumb label="Catalog" component={StyledBreadcrumb} onClick={handleClick} />
        <Breadcrumb
          label="Accessories"
          deleteIcon={<ExpandMoreIcon />}
          onClick={handleClick}
          onDelete={handleClick}
          component={StyledBreadcrumb}
        />
      </Breadcrumbs>
    </Paper>
  );
}

CustomizedBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedBreadcrumbs);
