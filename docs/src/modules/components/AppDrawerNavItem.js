import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { createSvgIcon } from '@material-ui/core/utils';
import Link from 'docs/src/modules/components/Link';

const useStyles = makeStyles((theme) => ({
  li: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  liLeaf: {
    display: 'flex',
    padding: '0 12px',
  },
  button: {
    ...theme.typography.body2,
    cursor: 'pointer',
    padding: '8px 0 6px',
    display: 'flex',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    textAlign: 'left',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    width: '100%',
    '& svg': {
      fontSize: 18,
      marginLeft: -6,
      color: theme.palette.text.secondary,
    },
    '&:hover svg': {
      color: theme.palette.text.primary,
    },
  },
  link: {
    ...theme.typography.body2,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    padding: '6px 0',
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    },
    '&$active': {
      color: theme.palette.primary.main,
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
  },
  active: {},
}));

const ArrowRight = createSvgIcon(<path d="M10 17l5-5-5-5v10z" />, 'ArrowRight');

export default function AppDrawerNavItem(props) {
  const {
    children,
    depth,
    href,
    onClick,
    openImmediately = false,
    topLevel = false,
    title,
    linkProps,
    ...other
  } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(openImmediately);

  const handleClick = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  const style = {
    paddingLeft: 8 * (3 + 2 * depth),
  };

  if (href) {
    return (
      <li className={classes.liLeaf} {...other}>
        <Link
          naked
          activeClassName={`drawer-active ${classes.active}`}
          href={href}
          className={clsx(classes.link, `depth-${depth}`)}
          onClick={onClick}
          style={style}
          {...linkProps}
        >
          {title}
        </Link>
      </li>
    );
  }

  return (
    <li className={classes.li} {...other}>
      <button
        type="button"
        className={clsx(classes.button, {
          'algolia-lvl0': topLevel,
        })}
        onClick={handleClick}
        style={style}
      >
        <ArrowRight />
        {title}
      </button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </li>
  );
}

AppDrawerNavItem.propTypes = {
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  linkProps: PropTypes.object,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};
