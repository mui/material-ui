import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ToggleColorMode from './ToggleColorMode';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

function AppAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event: { currentTarget: React.SetStateAction<null> }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      handleMenuClose();
    }
  };

  return (
    <div>
      <AppBar
        enableColorOnDark
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? '#fff' : '#000'),
          borderBottom: 1,
          borderColor: 'divider',
          paddingX: 0,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{}}>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
              }}
            >
              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem onClick={() => scrollToSection('features')}>
                  Features
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('testimonials')}>
                  Testimonials
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('highlights')}>
                  Highlights
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}>
                  Pricing
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
              </Box>
            </Box>
            <Button
              color="primary"
              variant="contained"
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            >
              Sign up
            </Button>
            <Button
              color="primary"
              variant="outlined"
              sx={{ display: { xs: 'none', md: 'flex' } }}
            >
              Sign in
            </Button>
            <ToggleColorMode />
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <IconButton
                aria-label="menu"
                onClick={handleMenuOpen}
                color="primary"
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: '8px',
                    minWidth: 180,
                  },
                }}
              >
                <MenuItem onClick={() => scrollToSection('features')}>
                  Features
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('testimonials')}>
                  Testimonials
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('highlights')}>
                  Highlights
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}>
                  Pricing
                </MenuItem>
                <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                <Divider />
                <MenuItem>
                  <Button color="primary" variant="contained" sx={{ width: '100%' }}>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" sx={{ width: '100%' }}>
                    Sign in
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
