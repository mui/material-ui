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
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const height = 24;
const styles = theme => ({
  root: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing.unit,
  },
  section: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  paper: {
    padding: theme.spacing.unit,
  },
  separator: {
    marginLeft: -theme.spacing.unit / 2,
    marginRight: -theme.spacing.unit / 2,
  },
  chip: {
    backgroundColor: theme.palette.grey[100],
    // fontSize: theme.typography.pxToRem(13),
    height,
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

function CustomBreadcrumb({ classes, className, ...rest }) {
  return <Chip className={classNames(className, classes.chip)} {...rest} />;
}

const StyledBreadcrumb = withStyles(styles)(CustomBreadcrumb);

function MoreBreadcrumbs(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Breadcrumbs>
          <Breadcrumb label="Material-UI" onClick={handleClick} />
          <Breadcrumb label="Component Demos" onClick={handleClick} />
          <Breadcrumb label="Breadcrumb" active />
        </Breadcrumbs>
      </Paper>

      <Paper className={classes.paper}>
        <Breadcrumbs separatorText="›">
          <Breadcrumb label="Material-UI" onClick={handleClick} />
          <Breadcrumb label="Component Demos" onClick={handleClick} />
          <Breadcrumb label="Breadcrumb" active />
        </Breadcrumbs>
      </Paper>
      <br />
      <Paper className={classes.paper}>
        <Breadcrumbs separatorText="-">
          <Breadcrumb label="Material-UI" onClick={handleClick} />
          <Breadcrumb label="Component Demos" onClick={handleClick} />
          <Breadcrumb label="Breadcrumb" active />
        </Breadcrumbs>
      </Paper>

      <Paper className={classes.paper}>
        <Breadcrumbs separator={<NavigateNextIcon className={classes.separator} />}>
          <Breadcrumb label="Material-UI" onClick={handleClick} />
          <Breadcrumb label="Component Demos" onClick={handleClick} />
          <Breadcrumb label="Breadcrumb" active />
        </Breadcrumbs>
      </Paper>

      <Paper className={classes.paper}>
        <Breadcrumbs>
          <Breadcrumb label="Home" icon={<HomeIcon />} onClick={handleClick} />
          <Breadcrumb label="Settings" icon={<SettingsIcon />} onClick={handleClick} />
          <Breadcrumb label="Users" icon={<GroupIcon />} active />
        </Breadcrumbs>
      </Paper>

      <Paper className={classes.paper}>
        <Breadcrumbs maxItems={2}>
          <Breadcrumb label="Home" onClick={handleClick} />
          <Breadcrumb label="Catalog" onClick={handleClick} />
          <Breadcrumb label="Accessories" onClick={handleClick} />
          <Breadcrumb label="New Collection" onClick={handleClick} />
          <Breadcrumb label="Belts" active />
        </Breadcrumbs>
      </Paper>

      <Paper className={classes.paper}>
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
    </div>
  );
}

MoreBreadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoreBreadcrumbs);
