import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Link from 'docs/src/modules/components/Link';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    letterSpacing: 0,
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
  },
  buttonLeaf: {
    letterSpacing: 0,
    justifyContent: 'flex-start',
    textTransform: 'none',
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

function AppDrawerNavItem(props) {
  const {
    children,
    depth,
    href,
    onClick,
    openImmediately = false,
    topLevel = false,
    title,
    ...other
  } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(openImmediately);

  const handleClick = () => {
    setOpen(oldOpen => !oldOpen);
  };

  const style = {
    paddingLeft: 8 * (3 + 2 * depth),
  };

  if (href) {
    return (
      <ListItem className={classes.itemLeaf} disableGutters {...other}>
        <Button
          component={Link}
          naked
          activeClassName={`drawer-active ${classes.active}`}
          href={href}
          className={clsx(classes.buttonLeaf, `depth-${depth}`)}
          disableTouchRipple
          onClick={onClick}
          style={style}
        >
          {title}
        </Button>
      </ListItem>
    );
  }

  return (
    <ListItem className={classes.item} disableGutters {...other}>
      <Button
        classes={{
          root: classes.button,
          label: topLevel ? 'algolia-lvl0' : '',
        }}
        onClick={handleClick}
        style={style}
      >
        {title}
      </Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </ListItem>
  );
}

AppDrawerNavItem.propTypes = {
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};

export default AppDrawerNavItem;
