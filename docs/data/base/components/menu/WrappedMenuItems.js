import * as React from 'react';
import PropTypes from 'prop-types';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from '@mui/base/MenuItemUnstyled';
import { styled } from '@mui/system';

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const StyledMenu = styled(MenuUnstyled)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 220px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;

  & .helper {
    padding: 10px;
  }
`,
);

const StyledMenuItem = styled(MenuItemUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    outline: 0;
  }

  &.${menuItemUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const MenuSectionRoot = styled('li')`
  list-style: none;

  & > ul {
    padding-left: 1em;
  }
`;

const MenuSectionLabel = styled('span')`
  display: block;
  padding: 10px 0 5px 10px;
  font-size: 0.75em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  color: ${grey[600]};
`;

function MenuSection({ children, label }) {
  return (
    <MenuSectionRoot>
      <MenuSectionLabel>{label}</MenuSectionLabel>
      <ul>{children}</ul>
    </MenuSectionRoot>
  );
}

MenuSection.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
};

export default function UnstyledMenuSimple() {
  return (
    <StyledMenu>
      <MenuSection label="Navigation">
        <StyledMenuItem>Back</StyledMenuItem>
        <StyledMenuItem disabled>Forward</StyledMenuItem>
        <StyledMenuItem>Refresh</StyledMenuItem>
      </MenuSection>
      <MenuSection label="Page">
        <StyledMenuItem>Save as</StyledMenuItem>
        <StyledMenuItem>Print</StyledMenuItem>
      </MenuSection>
      <MenuSection label="View">
        <StyledMenuItem>Zoom in</StyledMenuItem>
        <StyledMenuItem>Zoom out</StyledMenuItem>
      </MenuSection>
      <li className="helper">Current zoom level: 100%</li>
    </StyledMenu>
  );
}
