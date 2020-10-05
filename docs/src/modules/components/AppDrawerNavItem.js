import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Link from 'docs/src/modules/components/Link';

const useStyles = makeStyles((theme) => ({
  li: {
    padding: '1px 0',
    display: 'block',
  },
  liRoot: {
    padding: '0 8px',
  },
  item: {
    ...theme.typography.body2,
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    outline: 0,
    width: '100%',
    padding: '8px 0',
    justifyContent: 'flex-start',
    fontWeight: theme.typography.fontWeightMedium,
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: fade(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    },
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette.action.focus,
    },
    [theme.breakpoints.up('md')]: {
      padding: '6px 0',
    },
  },
  button: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    '& svg': {
      fontSize: 18,
      marginLeft: -19,
      color: theme.palette.text.secondary,
    },
    '& svg$open': {
      transform: 'rotate(90deg)',
    },
    '&:hover svg': {
      color: theme.palette.text.primary,
    },
  },
  open: {},
  link: {
    color: theme.palette.text.secondary,
    '&.app-drawer-active': {
      color: theme.palette.primary.main,
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
      '&.Mui-focusVisible': {
        backgroundColor: fade(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
    },
  },
  active: {},
}));

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
    paddingLeft: 8 * (3 + 1.5 * depth),
  };

  if (href) {
    return (
      <li
        className={clsx(classes.li, {
          [classes.liRoot]: depth === 0,
        })}
        {...other}
      >
        <Link
          activeClassName="app-drawer-active"
          href={href}
          underline="none"
          className={clsx(classes.item, classes.link)}
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
    <li
      className={clsx(classes.li, {
        [classes.liRoot]: depth === 0,
      })}
      {...other}
    >
      <ButtonBase
        disableRipple
        className={clsx(classes.item, classes.button, {
          'algolia-lvl0': topLevel,
        })}
        onClick={handleClick}
        style={style}
      >
        <ArrowRightIcon className={open ? classes.open : ''} />
        {title}
      </ButtonBase>
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
