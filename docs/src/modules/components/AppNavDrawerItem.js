import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Link from 'docs/src/modules/components/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import CodeIcon from '@material-ui/icons/Code';
import BuildIcon from '@material-ui/icons/Build';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StyleIcon from '@material-ui/icons/Style';
import AddIcon from '@material-ui/icons/Add';

const iconsMap = {
  DescriptionIcon: DescriptionIcon,
  ToggleOnIcon: ToggleOnIcon,
  CodeIcon: CodeIcon,
  BuildIcon: BuildIcon,
  CreateIcon: CreateIcon,
  VisibilityIcon: VisibilityIcon,
  StyleIcon: StyleIcon,
  AddIcon: AddIcon,
};

const Item = styled(({ component: Component = 'div', ...props }) => <Component {...props} />, {
  // disable `as` prop
  shouldForwardProp: (prop) => true,
})(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  borderRadius: theme.shape.borderRadius,
  outline: 0,
  width: '100%',
  paddingTop: 10,
  paddingBottom: 10,
  justifyContent: 'flex-start',
  fontWeight: theme.typography.fontWeightMedium,
  transition: theme.transitions.create(['color', 'background-color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary[50],
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.focus,
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: 4,
    paddingBottom: 4,
  },
}));

const ItemLink = styled(Item, {
  shouldForwardProp: (prop) => prop !== 'depth',
})(({ depth, theme }) => {
  return {
    color: theme.palette.text.secondary,
    fontSize: 14,
    '&.app-drawer-active': {
      // color: theme.palette.primary.main,
      color:
        theme.palette.mode === 'dark' ? theme.palette.primary[200] : theme.palette.primary[500],
      backgroundColor: theme.palette.primary[50],
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
    paddingLeft: 32,
  };
});

const ItemButtonIcon = styled(ArrowRightIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open, theme }) => {
  return {
    fontSize: 14,
    float: 'right',
    // marginLeft: -19,
    color: theme.palette.text.secondary,
    transform: open && 'rotate(90deg)',
  };
});

const ItemButton = styled(Item, {
  shouldForwardProp: (prop) => prop !== 'depth',
})(({ depth, theme }) => {
  return {
    color: depth === 1 ? theme.palette.grey[500] : theme.palette.text.primary,
    fontSize: depth === 1 ? 12 : undefined,
    fontWeight: depth === 0 ? 600 : theme.typography.fontWeightMedium,
    [`&:hover ${ItemButtonIcon}`]: {
      color: theme.palette.text.primary,
    },
    ...(depth === 0
      ? {
          paddingLeft: 2,
          '& .ArrowIcon': {
            marginLeft: 'auto',
          },
        }
      : {
          paddingLeft: 32,
        }),
  };
});

const StyledLi = styled('li', { shouldForwardProp: (prop) => prop !== 'depth' })(({ depth }) => {
  return {
    padding: depth === 0 ? '0 8px' : '1px 0',
    display: 'block',
  };
});

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
  const IconComponent = hasIcon ? iconsMap[icon] : React.Fragment;
  const iconProps = hasIcon ? { fontSize: 'small', color: 'primary' } : {};

  if (href) {
    return (
      <StyledLi {...other} depth={depth}>
        <ItemLink
          component={Link}
          activeClassName="app-drawer-active"
          href={href}
          underline="none"
          onClick={onClick}
          depth={depth}
          {...linkProps}
        >
          {title}
        </ItemLink>
      </StyledLi>
    );
  }

  return (
    <StyledLi {...other} depth={depth}>
      <ItemButton
        component={ButtonBase}
        depth={depth}
        disableRipple
        className={topLevel && 'algolia-lvl0'}
        onClick={handleClick}
      >
        {hasIcon && (
          <Box
            sx={{
              '& svg': { fontSize: 12 },
              marginRight: 1,
              px: 0.5,
              borderRadius: '1px',
              backgroundColor: 'primary.50',
            }}
          >
            <IconComponent {...iconProps} />
          </Box>
        )}
        {title}
        {depth === 0 && <ItemButtonIcon open={open} className="ArrowIcon" />}
      </ItemButton>
      {depth === 0 ? (
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
  linkProps: PropTypes.object,
  onClick: PropTypes.func,
  openImmediately: PropTypes.bool,
  title: PropTypes.string.isRequired,
  topLevel: PropTypes.bool,
};
