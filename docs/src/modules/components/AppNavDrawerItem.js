import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha, styled, experimental_sx as sx } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import ButtonBase from '@mui/material/ButtonBase';
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
};

const Item = styled(function Item({ component: Component = 'div', ...props }) {
  return <Component {...props} />;
})(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  borderRadius: 5,
  outline: 0,
  width: '100%',
  paddingTop: 5,
  paddingBottom: 5,
  justifyContent: 'flex-start',
  fontWeight: 500,
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.common.black,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primaryDark[700], 0.4)
        : theme.palette.grey[50],
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.focus,
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: 3,
    paddingBottom: 3,
  },
}));

const ItemLink = styled(Item, {
  shouldForwardProp: (prop) => prop !== 'depth' && prop !== 'hasIcon',
})(({ theme, hasIcon, depth }) => {
  return {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
    '&.app-drawer-active': {
      // color: theme.palette.primary.main,
      color:
        theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[700] : theme.palette.primary[50],
      fontWeight: 500,
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
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
    paddingLeft: 31 + (depth > 2 ? (depth - 2) * 10 : 0),
    ...(hasIcon && {
      paddingLeft: 2,
    }),
    ...(depth === 0 && {
      fontSize: theme.typography.pxToRem(14),
      color: theme.palette.text.primary,
    }),
  };
});

const ItemButtonIcon = styled(KeyboardArrowRightRoundedIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open, theme }) => {
  return {
    fontSize: '1rem',
    float: 'right',
    color: theme.palette.primary.main,
    transform: open && 'rotate(90deg)',
  };
});

const ItemButton = styled(Item, {
  shouldForwardProp: (prop) => prop !== 'depth' && prop !== 'hasIcon',
})(({ depth, hasIcon, theme }) => {
  let marginTop;
  if (depth === 0) {
    marginTop = 5;
  } else if (depth > 1) {
    marginTop = -4 * (depth - 3);
  } else {
    marginTop = 10;
  }
  return {
    color: (() => {
      if (depth >= 1) {
        return theme.palette.grey[600];
      }
      return theme.palette.text.primary;
    })(),
    fontSize: theme.typography.pxToRem(depth === 0 ? 14 : 11),
    textTransform: depth === 0 ? 'none' : 'uppercase',
    letterSpacing: depth === 0 ? null : '.08rem',
    fontWeight: depth === 0 ? 500 : 700,
    marginBottom: depth === 0 ? '5px' : null,
    marginTop,
    '&:hover': {
      backgroundColor: depth === 0 ? '' : alpha(theme.palette.primary.main, 0),
      color: (() => {
        if (depth === 0) {
          return '';
        }
        return theme.palette.grey[600];
      })(),
      cursor: depth === 0 ? '' : 'text',
    },
    [`&:hover ${ItemButtonIcon}`]: {
      color: theme.palette.text.primary,
    },
    paddingLeft: 31 + (depth > 1 ? (depth - 3) * -10 : 0),
    ...(hasIcon && {
      paddingLeft: 2,
    }),
    '& .KeyboardArrowRightRoundedIcon': {
      marginLeft: 'auto',
      marginRight: '5px',
    },
  };
});

const StyledLi = styled('li', { shouldForwardProp: (prop) => prop !== 'depth' })(
  ({ theme, depth }) => {
    return {
      padding: depth === 0 ? '0 10px' : '2px 0',
      marginTop: depth === 0 ? theme.spacing(1) : undefined,
      display: 'block',
    };
  },
);

const LegacyChip = styled(function LegacyChip(props) {
  return <Chip {...props} label="Legacy" />;
})(
  sx({
    ml: 1,
    '&:hover': {
      bgcolor: (theme) =>
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.warning[900], 0.5)
          : alpha(theme.palette.warning[100], 0.5),
    },
    '& .MuiChip-label': { px: 0.6 },
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
  }),
);

export default function AppNavDrawerItem(props) {
  const {
    children,
    depth,
    href,
    onClick,
    openImmediately = false,
    topLevel = false,
    title,
    linkProps,
    icon,
    legacy,
    ...other
  } = props;
  const [open, setOpen] = React.useState(openImmediately);
  const handleClick = () => {
    setOpen((oldOpen) => !oldOpen);
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
        py: 0.3,
      }}
    >
      <IconComponent {...iconProps} />
    </Box>
  ) : null;

  if (href) {
    return (
      <React.Fragment>
        <StyledLi {...other} depth={depth}>
          <ItemLink
            component={Link}
            activeClassName="app-drawer-active"
            href={href}
            underline="none"
            onClick={onClick}
            depth={depth}
            hasIcon={hasIcon}
            {...linkProps}
          >
            {iconElement}
            {title}
            {legacy && <LegacyChip />}
          </ItemLink>
        </StyledLi>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <StyledLi {...other} depth={depth}>
        <ItemButton
          component={ButtonBase}
          depth={depth}
          hasIcon={hasIcon}
          disableRipple
          className={topLevel ? 'algolia-lvl0' : null}
          onClick={handleClick}
        >
          {iconElement}
          {title}
          {legacy && <LegacyChip />}
          {depth === 0 && <ItemButtonIcon open={open} className="KeyboardArrowRightRoundedIcon" />}
        </ItemButton>
        {depth === 0 ? (
          <Collapse in={open} timeout="auto" unmountOnExit>
            {children}
          </Collapse>
        ) : (
          children
        )}
      </StyledLi>
    </React.Fragment>
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
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};
