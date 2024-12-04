import * as React from 'react';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledListbox = styled('ul')(
  ({ theme }) => `
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0 1px 3px rgba(31,35,40,0.12), 0 8px 24px rgba(66,74,83,0.12);
  z-index: 1;
  `,
);

const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 6px;
  margin: 2px 0;
  border-radius: 8px;
  cursor: default;
  user-select: none;
  &:last-of-type {
    border-bottom: none;
  }
  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledMenuButton = styled(MenuButton)(
  ({ theme }) => `
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 12px 16px;
  line-height: 1.5;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }
  &:focus {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);

const Page = styled('div')`
  max-width: 800px;
  min-height: calc(100vh - 40px);
  box-sizing: border-box;
  margin: 20px auto;
  padding: 20px;
  border-radius: 4px;
`;

function UnstyledSeparator(props: React.HTMLAttributes<HTMLLIElement>) {
  return <li {...props} role="separator" />;
}

const Separator = styled(UnstyledSeparator)(`
  height: 0;
  margin: 8px -6px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  list-style: none;
`);

export default function UnstyledMenuIntroduction() {
  const [isOpen, setOpen] = React.useState(false);

  const handleOpenChange = (event: React.SyntheticEvent | null, open: boolean) => {
    setOpen(open);
  };

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      // eslint-disable-next-line no-console
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <Page>
      <Dropdown open={isOpen} onOpenChange={handleOpenChange}>
        <StyledMenuButton>Create new...</StyledMenuButton>
        <Menu
          slots={{ listbox: StyledListbox }}
          slotProps={{ root: { placement: 'bottom-start', id: 'simple-menu' } }}
        >
          <StyledMenuItem onClick={createHandleMenuClick('New repository')}>
            New repository
          </StyledMenuItem>
          <StyledMenuItem onClick={createHandleMenuClick('Import repository')}>
            Import repository
          </StyledMenuItem>
          <Separator />
          <StyledMenuItem onClick={createHandleMenuClick('New codespace')}>
            New codespace
          </StyledMenuItem>
          <StyledMenuItem onClick={createHandleMenuClick('New gist')}>New gist</StyledMenuItem>
          <Separator />
          <StyledMenuItem onClick={createHandleMenuClick('New organization')}>
            New organization
          </StyledMenuItem>
        </Menu>
      </Dropdown>
    </Page>
  );
}
