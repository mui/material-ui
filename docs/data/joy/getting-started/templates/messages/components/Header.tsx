import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import MuiLogo from './MuiLogo';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ColorSchemeToggle from './ColorSchemeToggle';
import { toggleSidebar } from '../utils';

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: 'flex', sm: 'none' },
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        py: 1,
        px: 2,
        gap: 1,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('lg')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <MenuRoundedIcon />
      </IconButton>
      <MuiLogo variant="plain" sx={{ boxShadow: 'none', mr: 'auto' }} />
      <ColorSchemeToggle id={undefined} />
    </Sheet>
  );
}
