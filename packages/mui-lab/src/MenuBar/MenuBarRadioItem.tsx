'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@base-ui/react/menu';
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { MenuBarRadioItemProps } from './MenuBar.types';

const StyledHint = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.body2,
}));
/**
 *
 * Demos:
 *
 * - [Menubar](https://mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [MenuBarRadioItem API](https://mui.com/material-ui/api/menu-bar-radio-item/)
 */
const MenuBarRadioItem = React.forwardRef<HTMLDivElement, MenuBarRadioItemProps>(
  function MenuBarRadioItem(props, ref) {
    const { hint, children, ...other } = props;
    return (
      <Menu.RadioItem ref={ref} render={<ListItemButton dense />} {...other}>
        <ListItemIcon sx={{ minWidth: 32, position: 'relative' }}>
          <RadioButtonUncheckedIcon fontSize="small" />
          <Menu.RadioItemIndicator
            render={
              <RadioButtonCheckedIcon fontSize="small" sx={{ position: 'absolute', left: 0 }} />
            }
          />
        </ListItemIcon>
        <ListItemText>{children}</ListItemText>
        {hint && <StyledHint>{hint}</StyledHint>}
      </Menu.RadioItem>
    );
  },
);

export default MenuBarRadioItem;

MenuBarRadioItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  children: PropTypes.node,
  hint: PropTypes.node,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};
