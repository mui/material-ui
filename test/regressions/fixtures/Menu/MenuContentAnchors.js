import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const MenuItemStyled = styled(MenuItem)({
  '&.Mui-focusVisible': { border: '3px dashed black' },
  '&.Mui-selected': { border: '3px dotted black' },
  '&.Mui-focusVisible.Mui-selected': { border: '3px solid black' },
});

/**
 * Item 1 or 2 can be pre-selected to check alignment between anchorEl and menuitem
 */
function SimpleMenu({ selectedItem, ...props }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Grid item>
      <Button
        style={{
          // give the anchor enough space so that the menu can align the selected item
          margin: '80px 0',
        }}
        ref={setAnchorEl}
      >
        open button
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0} {...props}>
        {null}
        <MenuItemStyled selected={selectedItem === 1}>Item 1</MenuItemStyled>
        <MenuItemStyled selected={selectedItem === 2}>Item 2</MenuItemStyled>
        <MenuItemStyled>Item 3</MenuItemStyled>
      </Menu>
    </Grid>
  );
}

SimpleMenu.propTypes = { selectedItem: PropTypes.number };

export default function MenuContentAnchors() {
  return (
    <Grid container>
      <SimpleMenu variant="selectedMenu" />
      <SimpleMenu variant="menu" />
      <SimpleMenu selectedItem={1} variant="selectedMenu" />
      <SimpleMenu selectedItem={1} variant="menu" />
      <SimpleMenu selectedItem={2} variant="selectedMenu" />
      <SimpleMenu selectedItem={2} variant="menu" />
    </Grid>
  );
}
