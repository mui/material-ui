import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Container from "@mui/material/Container";
import useAuth from "../../../hooks/useAuth";
import { Avatar } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [anchorElp, setAnchorElp] = React.useState(null);

  const handleMenup = (event) => {
    setAnchorElp(event.currentTarget);
  };

  const handleClosep = () => {
    setAnchorElp(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              RAKIB-JEWELLERS
            </Typography>

            {/* for mobile version */}

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <div>
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
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    mt: "32px",
                    px: "20px",
                  }}
                >
                  {/* NAVBAR FOR DESKTOP */}
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to="/home"
                  >
                    <MenuItem>
                      <Typography
                        onClick={handleClose}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          m: 1,
                        }}
                      >
                        Home
                      </Typography>
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to="/shops"
                  >
                    <MenuItem>
                      <Typography
                        onClick={handleClose}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          m: 1,
                        }}
                      >
                        Shops
                      </Typography>
                    </MenuItem>
                  </NavLink>
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to="/blogs"
                  >
                    <MenuItem>
                      <Typography
                        onClick={handleClose}
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          m: 1,
                        }}
                      >
                        Blogs
                      </Typography>
                    </MenuItem>
                  </NavLink>
                  {!(user?.displayName || user?.email) && (
                    <Box>
                      {/* NAVBAR FOR DESKTOP */}

                      <NavLink
                        style={{ textDecoration: "none", color: "black" }}
                        to="/login"
                      >
                        <MenuItem>
                          <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: 1,
                              m: 1,
                            }}
                          >
                            Login
                          </Typography>
                        </MenuItem>
                      </NavLink>
                      <NavLink
                        style={{ textDecoration: "none", color: "black" }}
                        to="/signup"
                      >
                        <MenuItem>
                          <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: 1,
                              m: 1,
                            }}
                          >
                            SignUp
                          </Typography>
                        </MenuItem>
                      </NavLink>
                    </Box>
                  )}
                  {(user?.displayName || user?.email) && (
                    <Box>
                      {/* NAVBAR FOR DESKTOP */}
                      <NavLink
                        style={{ textDecoration: "none", color: "black" }}
                        to="/dashboard"
                      >
                        <MenuItem>
                          <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              m: 1,
                            }}
                          >
                            Dashboard
                          </Typography>
                        </MenuItem>
                      </NavLink>
                      <NavLink
                        style={{ textDecoration: "none", color: "black" }}
                        to="/dashboard"
                      >
                        <MenuItem>
                          <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            onClick={logout}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              m: 1,
                            }}
                          >
                            Logout
                          </Typography>
                        </MenuItem>
                      </NavLink>
                    </Box>
                  )}
                </Menu>
              </div>
            </Box>

            {/* for mobile version end here */}

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* NAVBAR FOR DESKTOP */}

              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/home"
              >
                <MenuItem>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      m: 1,
                    }}
                  >
                    Home
                  </Typography>
                </MenuItem>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/shops"
              >
                <MenuItem>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      m: 1,
                    }}
                  >
                    Shops
                  </Typography>
                </MenuItem>
              </NavLink>
              <NavLink
                style={{ textDecoration: "none", color: "white" }}
                to="/blogs"
              >
                <MenuItem>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      m: 1,
                    }}
                  >
                    Blogs
                  </Typography>
                </MenuItem>
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 1 }}></Box>

            {/* if login the all button show in desktop */}
            {(user?.displayName || user?.email) && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {/* NAVBAR FOR DESKTOP */}
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/dashboard"
                >
                  <MenuItem>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                      }}
                    >
                      Dashboard
                    </Typography>
                  </MenuItem>
                </NavLink>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/dashboard"
                >
                  <MenuItem>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      onClick={logout}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                      }}
                    >
                      Logout
                    </Typography>
                  </MenuItem>
                </NavLink>
              </Box>
            )}
            {/* if not login then login singup show in desktop */}
            {!(user?.displayName || user?.email) && (
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {/* NAVBAR FOR DESKTOP */}

                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/login"
                >
                  <MenuItem>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                      }}
                    >
                      Login
                    </Typography>
                  </MenuItem>
                </NavLink>
                <NavLink
                  style={{ textDecoration: "none", color: "white" }}
                  to="/signup"
                >
                  <MenuItem>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 1,
                        m: 1,
                      }}
                    >
                      SignUp
                    </Typography>
                  </MenuItem>
                </NavLink>
              </Box>
            )}
            {/* if login the picture and details show in desktop */}
            {(user?.displayName || user?.email) && (
              <Box>
                <Avatar
                  alt="Remy Sharp"
                  src={user?.photoURL}
                  onClick={handleMenup}
                />
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElp}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElp)}
                  onClose={handleClosep}
                >
                  <MenuItem onClick={handleClosep}>
                    {user?.displayName}
                  </MenuItem>
                  <MenuItem onClick={handleClosep}>{user?.email}</MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Navbar;
