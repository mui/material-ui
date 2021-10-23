import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha, styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import ButtonBase from '@mui/material/ButtonBase';
import Link from 'docs/src/modules/components/Link';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BookOutlined from '@mui/icons-material/BookOutlined';
import ChromeReaderModeOutlined from '@mui/icons-material/ChromeReaderModeOutlined';

const iconsMap = {
  DescriptionIcon: ArticleOutlinedIcon,
  ToggleOnIcon: ToggleOffOutlinedIcon,
  CodeIcon: CodeRoundedIcon,
  BuildIcon: BuildOutlinedIcon,
  CreateIcon: CreateOutlinedIcon,
  VisibilityIcon: VisibilityOutlinedIcon,
  StyleIcon: ColorLensOutlinedIcon,
  AddIcon: AddCircleOutlineOutlinedIcon,
  BookIcon: BookOutlined,
  ReaderIcon: ChromeReaderModeOutlined,
};

const Item = styled(
  function Item({ component: Component = 'div', ...props }) {
    return <Component {...props} />;
  },
  {
    // disable `as` prop
    shouldForwardProp: () => true,
  },
)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
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
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primaryDark[700], 0.4)
        : theme.palette.grey[50],
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.focus,
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: 5,
    paddingBottom: 5,
  },
}));

const ItemLink = styled(Item, {
  shouldForwardProp: (prop) => prop !== 'depth' && prop !== 'hasIcon',
})(({ theme, hasIcon, depth }) => {
  return {
    fontSize: theme.typography.pxToRem(13.5),
    color: theme.palette.text.secondary,
    '&.app-drawer-active': {
      // color: theme.palette.primary.main,
      color:
        theme.palette.mode === 'dark' ? theme.palette.primary[200] : theme.palette.primary[500],
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.primaryDark[600] : theme.palette.primary[50],
      fontWeight: 700,
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
    paddingLeft: 36 + (depth > 2 ? (depth - 2) * 10 : 0),
    ...(hasIcon && {
      paddingLeft: 2,
    }),
    ...(depth === 0 && {
      fontSize: theme.typography.pxToRem(14.5),
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
  return {
    color: (() => {
      if (depth >= 1) {
        if (theme.palette.mode === 'dark') {
          return alpha(theme.palette.grey[500], 0.5);
        }
        return theme.palette.grey[600];
      }
      return theme.palette.text.primary;
    })(),
    fontSize: theme.typography.pxToRem(depth === 0 ? 14.5 : 12),
    fontWeight: depth === 0 ? 500 : 700,
    margin: depth === 0 ? theme.spacing(0.5, 0) : '8px 0 4px',
    '&:hover': {
      backgroundColor: depth === 0 ? '' : alpha(theme.palette.primary.main, 0),
      color: (() => {
        if (depth === 0) {
          return '';
        }
        if (theme.palette.mode === 'dark') {
          return alpha(theme.palette.grey[500], 0.5);
        }
        return theme.palette.grey[600];
      })(),
      cursor: depth === 0 ? '' : 'text',
    },
    [`&:hover ${ItemButtonIcon}`]: {
      color: theme.palette.text.primary,
    },
    paddingLeft: 36,
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
        '& svg': { fontSize: (theme) => theme.typography.pxToRem(14) },
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginRight: 1.5,
        p: 0.5,
        borderRadius: '5px',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.primaryDark[700]
            : theme.palette.primary[50],
      }}
    >
      <IconComponent {...iconProps} />
    </Box>
  ) : null;

  const divider = depth === 0 && (
    <li>
      <Divider sx={{ my: 1.2 }} />
    </li>
  );

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
          </ItemLink>
        </StyledLi>
        {divider}
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
      {divider}
    </React.Fragment>
  );
}

AppNavDrawerItem.propTypes = {
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.string,
  linkProps: PropTypes.object,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};
