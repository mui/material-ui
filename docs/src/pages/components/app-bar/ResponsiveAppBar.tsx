import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';

const ResponsiveAppBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElp, setAnchorElp] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenup = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElp(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClosep = () => {
    setAnchorElp(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                display: { xs: 'block', sm: 'none' },
                mt: '32px',
                px: '20px',
              }}
            >
              <MenuItem>
                <Typography
                  onClick={handleClose}
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    m: 1,
                  }}
                >
                  Home
                </Typography>
              </MenuItem>

              <MenuItem>
                <Typography
                  onClick={handleClose}
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    m: 1,
                  }}
                >
                  Shops
                </Typography>
              </MenuItem>

              <MenuItem>
                <Typography
                  onClick={handleClose}
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    m: 1,
                  }}
                >
                  Blogs
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <MenuItem>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1,
                  m: 1,
                }}
              >
                Home
              </Typography>
            </MenuItem>

            <MenuItem>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1,
                  m: 1,
                }}
              >
                Shops
              </Typography>
            </MenuItem>

            <MenuItem>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  py: 1,
                  m: 1,
                }}
              >
                Blogs
              </Typography>
            </MenuItem>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/2.jpg"
              onClick={handleMenup}
            />
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElp}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElp)}
              onClose={handleClosep}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClosep}>
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Dashboard
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleClosep}>
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;