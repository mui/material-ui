import * as React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { samePageLinkNavigation } from 'docs/src/modules/components/MarkdownLinks';
import Link from 'docs/src/modules/components/Link';
import standardNavIcons from './AppNavIcons';

const Item = styled(
  function Item({ component: Component = 'div', ...props }) {
    return <Component {...props} />;
  },
  {
    shouldForwardProp: (prop) =>
      prop !== 'depth' && prop !== 'hasIcon' && prop !== 'subheader' && prop !== 'expandable',
  },
)(({ theme, hasIcon, depth, subheader, expandable }) => {
  const color = {
    color: (theme.vars || theme).palette.text.secondary,
    ...(depth === 0 && {
      color: (theme.vars || theme).palette.text.primary,
    }),
    ...(subheader && {
      color: (theme.vars || theme).palette.grey[600],
    }),
  };

  return [
    {
      ...theme.typography.body2,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 6,
      outline: 0,
      width: '100%',
      padding: 6,
      justifyContent: 'flex-start',
      fontWeight:
        depth === 0 ? theme.typography.fontWeightSemiBold : theme.typography.fontWeightMedium,
      transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.shortest,
      }),
      fontSize: theme.typography.pxToRem(14),
      textDecoration: 'none',
      paddingLeft: 10 + (depth + 1) * 13 - (expandable ? 21 : 0),
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: 1,
        left: 9.5,
        height: '100%',
        width: 1,
        opacity: depth === 0 ? 0 : 1,
        background: (theme.vars || theme).palette.grey[100],
      },
      ...color,
      ...(subheader && {
        marginTop: theme.spacing(1),
        textTransform: 'uppercase',
        letterSpacing: '.08rem',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(11),
        '&:before': {
          content: '""',
          display: 'block',
          position: 'absolute',
          zIndex: 1,
          left: 9.5,
          height: '55%',
          top: 16,
          width: 1,
          opacity: depth === 0 ? 0 : 1,
          background: (theme.vars || theme).palette.grey[100],
        },
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          zIndex: 5,
          left: 6,
          height: 8,
          width: 8,
          borderRadius: 2,
          opacity: depth === 0 ? 0 : 1,
          background: alpha(theme.palette.grey[50], 0.5),
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.grey[200],
        },
      }),
      ...(hasIcon && {
        paddingLeft: 0,
      }),
      '&.app-drawer-active': {
        // To match browserUrlPreviewMarge
        scrollMarginBottom: 120,
        color: (theme.vars || theme).palette.primary[600],
        backgroundColor: (theme.vars || theme).palette.primary[50],
        '&:hover': {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))`
            : alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
              ),
          '@media (hover: none)': {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
              : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
          },
        },
        '&.Mui-focusVisible': {
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))`
            : alpha(
                theme.palette.primary.main,
                theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
              ),
        },
        '&:before': {
          background: (theme.vars || theme).palette.primary[400],
        },
      },
      '& .MuiChip-root': {
        marginTop: '2px',
      },
      ...(!subheader && {
        '&:hover': {
          color: (theme.vars || theme).palette.common.black,
          backgroundColor: (theme.vars || theme).palette.grey[50],
          '@media (hover: none)': {
            color: color.color,
            backgroundColor: 'transparent',
          },
        },
      }),
      '&.Mui-focusVisible': {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: 4,
        paddingBottom: 4,
      },
      '& .ItemButtonIcon': {
        marginRight: '5px',
        color: (theme.vars || theme).palette.primary.main,
      },
      '&:hover .ItemButtonIcon': {
        color: (theme.vars || theme).palette.text.primary,
        '@media (hover: none)': {
          color: (theme.vars || theme).palette.primary.main,
        },
      },
    },
    theme.applyDarkStyles({
      ...color,
      '&:before': {
        background: alpha(theme.palette.primaryDark[700], 0.6),
      },
      '&.app-drawer-active': {
        color: (theme.vars || theme).palette.primary[300],
        backgroundColor: (theme.vars || theme).palette.primaryDark[700],
        '&:before': {
          background: (theme.vars || theme).palette.primary[400],
        },
      },
      ...(subheader && {
        '&:before': {
          background: alpha(theme.palette.primaryDark[700], 0.6),
        },
        '&:after': {
          background: alpha(theme.palette.primaryDark[700], 0.8),
          borderColor: alpha(theme.palette.primaryDark[600], 0.6),
        },
      }),
      ...(!subheader && {
        '&:hover': {
          color: '#fff',
          backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
          '@media (hover: none)': {
            color: color.color,
            backgroundColor: 'transparent',
          },
        },
      }),
    }),
  ];
});

const ItemButtonIcon = styled(KeyboardArrowRightRoundedIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  fontSize: '1rem',
  transform: open && 'rotate(90deg)',
  '&&:last-child': {
    // overrrides https://github.com/mui/material-ui/blob/ca7c5c63e64b6a7f55255981f1836a565927b56c/docs/src/modules/brandingTheme.ts#L757-L759
    marginLeft: 0,
  },
}));

const StyledLi = styled('li', { shouldForwardProp: (prop) => prop !== 'depth' })(
  ({ theme, depth }) => ({
    display: 'block',
    padding: depth === 0 ? theme.spacing(1, '10px', 0, '10px') : 0,
  }),
);

export const sxChip = (color) => [
  (theme) => ({
    ml: 1.5,
    fontSize: theme.typography.pxToRem(10),
    fontWeight: 'semiBold',
    textTransform: 'uppercase',
    letterSpacing: '.04rem',
    height: '16px',
    border: 1,
    borderColor: (theme.vars || theme).palette[color][300],
    bgcolor: alpha(theme.palette[color][100], 0.5),
    color: (theme.vars || theme).palette[color][700],
    '&:hover': {
      bgcolor: alpha(theme.palette[color][100], 0.5),
    },
    '& .MuiChip-label': {
      px: 0.6,
    },
  }),
  (theme) =>
    theme.applyDarkStyles({
      borderColor: alpha(theme.palette[color][800], 0.5),
      bgcolor: alpha(theme.palette[color][800], 0.5),
      color: (theme.vars || theme).palette[color][300],
      '&:hover': {
        bgcolor: alpha(theme.palette[color][900], 0.5),
      },
    }),
];

function DeadLink(props) {
  const { activeClassName, href, noLinkStyle, prefetch, ...other } = props;
  return <div {...other} />;
}

DeadLink.propTypes = {
  activeClassName: PropTypes.any,
  href: PropTypes.any,
  noLinkStyle: PropTypes.any,
  prefetch: PropTypes.any,
};

export default function AppNavDrawerItem(props) {
  const {
    children,
    depth,
    href,
    icon,
    legacy,
    newFeature,
    planned,
    linkProps,
    onClick,
    initiallyExpanded = false,
    expandable = false,
    plan = 'community',
    subheader,
    title,
    topLevel = false,
    ...other
  } = props;
  const [open, setOpen] = React.useState(initiallyExpanded);
  const handleClick = (event) => {
    // Ignore the action if opening the link in a new tab
    if (samePageLinkNavigation(event)) {
      return;
    }

    if (onClick) {
      onClick(event);
    }

    if (expandable) {
      event.preventDefault();
      setOpen((oldOpen) => !oldOpen);
    }
  };

  const hasIcon = icon && (typeof icon !== 'string' || !!standardNavIcons[icon]);
  const IconComponent = typeof icon === 'string' ? standardNavIcons[icon] : icon;
  const iconElement = hasIcon ? (
    <Box
      component="span"
      sx={{
        '& svg': { fontSize: (theme) => theme.typography.pxToRem(16.5) },
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginRight: '6px',
      }}
    >
      <IconComponent fontSize="small" color="primary" />
    </Box>
  ) : null;

  return (
    <StyledLi {...other} depth={depth}>
      {/* Fix overloading with prefetch={false}, only prefetch on hover */}
      <Item
        component={subheader ? DeadLink : Link}
        depth={depth}
        hasIcon={hasIcon}
        href={href}
        prefetch={false}
        subheader={subheader}
        expandable={expandable}
        activeClassName={initiallyExpanded ? null : 'app-drawer-active'}
        className={topLevel ? 'algolia-lvl0' : null}
        onClick={handleClick}
        {...linkProps}
      >
        {iconElement}
        {expandable && <ItemButtonIcon className="ItemButtonIcon" open={open} />}
        {title}
        {plan === 'pro' && <span className="plan-pro" title="Pro plan" />}
        {plan === 'premium' && <span className="plan-premium" title="Premium plan" />}
        {legacy && <Chip label="Legacy" sx={sxChip('warning')} />}
        {newFeature && <Chip label="New" sx={sxChip('success')} />}
        {planned && <Chip label="Planned" sx={sxChip('grey')} />}
      </Item>
      {expandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      ) : (
        children
      )}
    </StyledLi>
  );
}

AppNavDrawerItem.propTypes = {
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  expandable: PropTypes.bool,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icon: PropTypes.elementType,
  initiallyExpanded: PropTypes.bool,
  legacy: PropTypes.bool,
  linkProps: PropTypes.object,
  newFeature: PropTypes.bool,
  onClick: PropTypes.func,
  plan: PropTypes.oneOf(['community', 'pro', 'premium']),
  planned: PropTypes.bool,
  subheader: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};
