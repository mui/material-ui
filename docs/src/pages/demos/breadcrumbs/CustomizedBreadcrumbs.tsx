import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(1),
  },
  chip: {
    backgroundColor: theme.palette.grey[100],
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
    marginRight: -theme.spacing(1.5),
  },
}));

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  alert('You clicked a breadcrumb.'); // eslint-disable-line no-alert
}

function StyledBreadcrumb(props: any) {
  const classes = useStyles();
  const { ...rest } = props;
  return <Chip className={classes.chip} {...rest} />;
}

function CustomizedBreadcrumbs() {
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Breadcrumbs aria-label="Breadcrumb">
        <StyledBreadcrumb
          component="a"
          href="#"
          label="Home"
          avatar={
            <Avatar className={classes.avatar}>
              <HomeIcon />
            </Avatar>
          }
          onClick={handleClick}
        />
        <StyledBreadcrumb component="a" href="#" label="Catalog" onClick={handleClick} />
        <StyledBreadcrumb
          label="Accessories"
          deleteIcon={<ExpandMoreIcon />}
          onClick={handleClick}
          onDelete={handleClick}
        />
      </Breadcrumbs>
    </Paper>
  );
}

export default CustomizedBreadcrumbs;
