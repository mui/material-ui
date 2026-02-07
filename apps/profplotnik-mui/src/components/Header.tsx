import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

const navItems = [
  'Проекты домов',
  'Калькулятор',
  'Отделка',
  'О компании',
  'Фотоотчёты',
  'Бригады',
  'Отзывы',
  'Контакты',
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HomeWorkIcon sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h6" component="div" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                  СК Профплотник
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.85 }}>
                  Деревянные дома из Костромы
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5 }}>
              {navItems.map((item) => (
                <Button key={item} color="inherit" size="small" sx={{ fontSize: '0.85rem' }}>
                  {item}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon sx={{ display: { xs: 'none', sm: 'block' } }} />
              <Typography
                variant="body2"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                +7 (495) 445-25-35
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => setMobileOpen(true)}
                sx={{ display: { lg: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 280 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" color="primary" fontWeight={700}>
            СК Профплотник
          </Typography>
          <Typography variant="caption" color="text.secondary">
            +7 (495) 445-25-35
          </Typography>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton onClick={() => setMobileOpen(false)}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
