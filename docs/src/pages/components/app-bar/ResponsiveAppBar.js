import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

const ResponsiveAppBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElp, setAnchorElp] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenup = (event) => {
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
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
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
              sx={{ display: { xs: 'block', md: 'none' }, mt: '47px', px: '20px' }}
            >
              <Button
                onClick={handleClose}
                sx={{ mt: 1, mx: 2, color: '#424242', display: 'block' }}
              >
                <Typography textAlign="center">Home</Typography>
              </Button>
              <Button
                onClick={handleClose}
                sx={{ mt: 1, mx: 2, color: '#424242', display: 'block' }}
              >
                <Typography textAlign="center">Shops</Typography>
              </Button>
              <Button
                onClick={handleClose}
                sx={{ mt: 1, mx: 2, color: '#424242', display: 'block' }}
              >
                <Typography textAlign="center">Blogs</Typography>
              </Button>
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
            <Button
              onClick={handleClose}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Home
            </Button>
            <Button
              onClick={handleClose}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Shops
            </Button>
            <Button
              onClick={handleClose}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Blogs
            </Button>
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
              <Button
                onClick={handleClose}
                sx={{ mt: 1, mx: 2, color: '#424242', display: 'block' }}
              >
                <Typography textAlign="center">Profile</Typography>
              </Button>
              <Button
                onClick={handleClose}
                sx={{ mt: 1, mx: 2, color: '#424242', display: 'block' }}
              >
                <Typography textAlign="center">My account</Typography>
              </Button>
              <Button
                onClick={handleClose}
                sx={{ mt: 1, mx: 2, color: '#424242', display: 'block' }}
              >
                <Typography textAlign="center">Dashboard</Typography>
              </Button>
              <Button
                onClick={handleClose}
                sx={{ mt: 1, mx: 2, color: '#424242', display: 'block' }}
              >
                <Typography textAlign="center">Logout</Typography>
              </Button>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
