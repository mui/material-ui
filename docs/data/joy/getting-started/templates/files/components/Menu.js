import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/joy/styles';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled from '@mui/base/MenuItemUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';

const Popper = styled(PopperUnstyled)({
  zIndex: 1500,
});

const Listbox = styled('ul')(({ theme }) => ({
  ...theme.variants.outlined.neutral,
  marginBlock: '0.25rem',
  padding: '0.45rem',
  borderRadius: theme.vars.radius.sm,
  boxShadow: theme.vars.shadow.md,
  backgroundColor: theme.vars.palette.background.componentBg,
  gap: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
}));

const MenuItem = styled(MenuItemUnstyled, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  listStyle: 'none',
  fontFamily: theme.vars.fontFamily.body,
  fontSize: theme.vars.fontSize.sm,
  padding: '0.45rem 0.75rem',
  borderRadius: theme.vars.radius.xs,
  minWidth: 120,
  textDecoration: 'none',
  display: 'flex',
  ...theme.variants.plain.neutral,
  ...(active
    ? {
        ...theme.variants.soft.primary,
        cursor: 'default',
      }
    : {
        '&:hover': {
          ...theme.variants.softHover.neutral,
          cursor: 'pointer',
        },
        '&:active': theme.variants.outlinedHover.neutral,
      }),
  [theme.focus.selector]: theme.focus.default,
}));

const Menu = ({ control, menus, id }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);
  const buttonRef = React.useRef(null);
  const menuActions = React.useRef(null);

  const handleButtonClick = (event) => {
    if (isOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const close = () => {
    setAnchorEl(null);
    buttonRef.current.focus();
  };

  return (
    <React.Fragment>
      {React.cloneElement(control, {
        type: 'button',
        onClick: handleButtonClick,
        onKeyDown: handleButtonKeyDown,
        ref: buttonRef,
        'aria-controls': isOpen ? id : undefined,
        'aria-expanded': isOpen || undefined,
        'aria-haspopup': 'menu',
      })}

      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={anchorEl}
        components={{ Root: Popper, Listbox }}
        componentsProps={{ root: { placement: 'bottom-end' }, listbox: { id } }}
      >
        {menus.map(({ label, active, ...item }) => (
          <MenuItem active={active} key={label} onClick={close} {...item}>
            {label}
          </MenuItem>
        ))}
      </MenuUnstyled>
    </React.Fragment>
  );
};

Menu.propTypes = {
  control: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Menu;
