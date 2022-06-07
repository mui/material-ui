import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha, styled, experimental_sx as sx } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import { openLinkInNewTab } from 'docs/src/modules/components/MarkdownLinks';
import Link from 'docs/src/modules/components/Link';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import ChromeReaderModeRoundedIcon from '@mui/icons-material/ChromeReaderModeRounded';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';
import ScienceIcon from '@mui/icons-material/Science';
import DateRangeRounded from '@mui/icons-material/DateRangeRounded';

const iconsMap = {
  DescriptionIcon: ArticleRoundedIcon,
  ToggleOnIcon: ToggleOffRoundedIcon,
  CodeIcon: CodeRoundedIcon,
  BuildIcon: HandymanRoundedIcon,
  CreateIcon: EditRoundedIcon,
  VisibilityIcon: VisibilityRoundedIcon,
  StyleIcon: InvertColorsRoundedIcon,
  AddIcon: AddCircleRoundedIcon,
  BookIcon: BookRoundedIcon,
  ReaderIcon: ChromeReaderModeRoundedIcon,
  TableViewIcon: TableViewRoundedIcon,
  ExperimentIcon: ScienceIcon,
  DatePickerIcon: DateRangeRounded,
};

const Item = styled(
  function Item({ component: Component = 'div', ...props }) {
    return <Component {...props} />;
  },
  {
    shouldForwardProp: (prop) => prop !== 'depth' && prop !== 'hasIcon' && prop !== 'subheader',
  },
)(({ theme, hasIcon, depth, subheader }) => {
  const color = {
    color: theme.palette.text.secondary,
    ...(depth === 0 && {
      color: theme.palette.text.primary,
    }),
    ...(subheader && {
      color: theme.palette.grey[600],
    }),
  };

  return {
    ...theme.typography.body2,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 5,
    outline: 0,
    width: '100%',
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'flex-start',
    fontWeight: theme.typography.fontWeightMedium,
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    fontSize: theme.typography.pxToRem(14),
    textDecoration: 'none',
    paddingLeft: 31 + (depth > 1 ? (depth - 1) * 10 : 0),
    ...color,
    ...(subheader && {
      marginTop: theme.spacing(1),
      textTransform: 'uppercase',
      letterSpacing: '.08rem',
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.pxToRem(11),
    }),
    ...(hasIcon && {
      paddingLeft: 2,
    }),
    '&.app-drawer-active': {
      color:
        theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.primary[50],
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
      '&.Mui-focusVisible': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
    },
    '& .MuiChip-root': {
      marginTop: '2px',
    },
    ...(!subheader && {
      '&:hover': {
        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.common.black,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primaryDark[700], 0.4)
            : theme.palette.grey[50],
        '@media (hover: none)': {
          color: color.color,
          backgroundColor: 'transparent',
        },
      },
    }),
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette.action.focus,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 3,
      paddingBottom: 3,
    },
    '& .ItemButtonIcon': {
      marginLeft: 'auto !important',
      marginRight: '5px',
      color: theme.palette.primary.main,
    },
    '&:hover .ItemButtonIcon': {
      color: theme.palette.text.primary,
      '@media (hover: none)': {
        color: theme.palette.primary.main,
      },
    },
  };
});

const ItemButtonIcon = styled(KeyboardArrowRightRoundedIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  fontSize: '1rem',
  transform: open && 'rotate(90deg)',
}));

const StyledLi = styled('li', { shouldForwardProp: (prop) => prop !== 'depth' })(
  ({ theme, depth }) => ({
    display: 'block',
    padding: depth === 0 ? theme.spacing(1, '10px', 0, '10px') : '2px 0',
  }),
);

const LegacyChip = styled(function LegacyChip(props) {
  return <Chip {...props} label="Legacy" />;
})(
  sx({
    ml: 1,
    fontSize: (theme) => theme.typography.pxToRem(10),
    fontWeight: 'semiBold',
    textTransform: 'uppercase',
    letterSpacing: '.04rem',
    height: '16px',
    border: 1,
    borderColor: (theme) =>
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.warning[800], 0.5)
        : theme.palette.warning[300],
    bgcolor: (theme) =>
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.warning[900], 0.5)
        : alpha(theme.palette.warning[100], 0.5),
    color: (theme) =>
      theme.palette.mode === 'dark' ? theme.palette.warning[300] : theme.palette.warning[700],
    '&:hover': {
      bgcolor: (theme) =>
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.warning[900], 0.5)
          : alpha(theme.palette.warning[100], 0.5),
    },
    '& .MuiChip-label': {
      px: 0.6,
    },
  }),
);

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
    linkProps,
    onClick,
    openImmediately,
    plan = 'community',
    subheader,
    title,
    topLevel = false,
    ...other
  } = props;
  const expandable = openImmediately != null;
  const [open, setOpen] = React.useState(openImmediately);
  const handleClick = (event) => {
    // Ignore the action if opening the link in a new tab
    if (openLinkInNewTab(event)) {
      return;
    }

    if (onClick) {
      onClick(event);
    }

    if (expandable && !subheader) {
      event.preventDefault();
      setOpen((oldOpen) => !oldOpen);
    }
  };

  const hasIcon = icon && iconsMap[icon];
  const IconComponent = hasIcon ? iconsMap[icon] : null;
  const iconProps = hasIcon ? { fontSize: 'small', color: 'primary' } : {};
  const iconElement = hasIcon ? (
    <Box
      component="span"
      sx={{
        '& svg': { fontSize: (theme) => theme.typography.pxToRem(16.5) },
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginRight: 1.5,
        py: '2px',
      }}
    >
      <IconComponent {...iconProps} />
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
        activeClassName={expandable ? null : 'app-drawer-active'}
        className={topLevel ? 'algolia-lvl0' : null}
        onClick={handleClick}
        {...linkProps}
      >
        {iconElement}
        {title}
        {plan === 'pro' && <span className="plan-pro" title="Pro plan" />}
        {plan === 'premium' && <span className="plan-premium" title="Premium plan" />}
        {legacy && <LegacyChip />}
        {expandable && !subheader && <ItemButtonIcon className="ItemButtonIcon" open={open} />}
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
  href: PropTypes.string,
  icon: PropTypes.string,
  legacy: PropTypes.bool,
  linkProps: PropTypes.object,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  plan: PropTypes.oneOf(['community', 'pro', 'premium']),
  subheader: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};
