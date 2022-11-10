/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, extendTheme, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Avatar from '@mui/joy/Avatar';
import AspectRatio from '@mui/joy/AspectRatio';
import Badge from '@mui/joy/Badge';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import Select from '@mui/joy/Select';
import Slider from '@mui/joy/Slider';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import Chip from '@mui/joy/Chip';
import FilterDrama from '@mui/icons-material/FilterDrama';
import Add from '@mui/icons-material/Add';
import PieChart from '@mui/icons-material/PieChart';
import Sms from '@mui/icons-material/Sms';
import Person from '@mui/icons-material/Person';
import BubbleChart from '@mui/icons-material/BubbleChart';
import Notifications from '@mui/icons-material/Notifications';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import MoreVert from '@mui/icons-material/MoreVert';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

const customTheme = extendTheme({
  components: {
    JoyIconButton: {
      defaultProps: {
        variant: 'plain',
        color: 'neutral',
      },
    },
    JoyChip: {
      defaultProps: {
        color: 'neutral',
      },
    },
  },
});

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton variant="soft" sx={{ borderRadius: 'xl' }} />;
  }
  return (
    <IconButton
      id="toggle-mode"
      variant="soft"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ borderRadius: 'xl' }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

const HeaderContent = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  return (
    <React.Fragment>
      <Sheet variant="soft" sx={{ px: 1.5, py: 0.5, borderRadius: 'xl', lineHeight: 0 }}>
        <FilterDrama fontSize="xl3" />
      </Sheet>
      <Box sx={{ flex: 1, display: 'flex', gap: 1, px: 2 }}>
        <Chip
          variant="outlined"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          endDecorator={<KeyboardArrowDown />}
        >
          Main
        </Chip>
        <Menu
          variant="outlined"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          placement="bottom-start"
          disablePortal
          size="sm"
          sx={{
            '--List-decorator-size': '24px',
            '--List-item-minHeight': '40px',
            '--List-divider-gap': '4px',
            minWidth: 200,
          }}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemDecorator>
              <BubbleChart />
            </ListItemDecorator>
            Products
          </MenuItem>
          <ListDivider />
          <MenuItem onClick={() => setAnchorEl(null)}>Pricing</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            Case studies{' '}
            <Chip
              variant="outlined"
              size="sm"
              sx={{
                ml: 'auto',
                bgcolor: (theme) => `rgba(${theme.vars.palette.primary.mainChannel} / 0.1)`,
              }}
            >
              Beta
            </Chip>
          </MenuItem>
        </Menu>
        <Chip variant="plain" onClick={() => {}}>
          Taxes
        </Chip>
        <Chip variant="plain" onClick={() => {}}>
          IDA Journal
        </Chip>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Box sx={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <Button startDecorator={<Add />} sx={{ borderRadius: 'xl' }}>
            New Invoice
          </Button>
          <Input
            placeholder="Search anything"
            variant="soft"
            size="sm"
            endDecorator={
              <Typography
                component="span"
                variant="outlined"
                level="body3"
                sx={{ bgcolor: 'background.surface', mx: 0 }}
              >
                ⌘K
              </Typography>
            }
            sx={{ '--Input-radius': '40px', '--Input-paddingInline': '12px', width: 160 }}
          />
          <Badge badgeContent={2} variant="solid">
            <IconButton variant="soft" sx={{ borderRadius: 'xl' }}>
              <Notifications />
            </IconButton>
          </Badge>
          <ColorSchemeToggle />
          <IconButton sx={{ borderRadius: 'xl' }}>
            <Avatar src="/static/images/avatar/1.jpg" size="sm" />
            <KeyboardArrowDown />
          </IconButton>
        </Box>
      </Box>
    </React.Fragment>
  );
};

const FooterContent = () => (
  <React.Fragment>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Sheet variant="solid" sx={{ p: 1.25, borderRadius: '50%', lineHeight: 0 }}>
        <FilterDrama />
      </Sheet>
      <Divider orientation="vertical" />
      <Box>
        <Button disabled variant="plain">
          Systems
        </Button>
        <Button variant="plain">Illustrations</Button>
        <Button variant="plain">Templates</Button>
        <Button variant="plain">Mockups</Button>
      </Box>
      <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
        <Input variant="soft" placeholder="Your Email" type="email" name="email" />
        <Button variant="outlined">Subscribe</Button>
      </Box>
    </Box>
    <Divider sx={{ my: 2 }} />
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        '& > a': { fontSize: 'sm' },
      }}
    >
      <Typography
        level="body2"
        startDecorator={<Typography textColor="text.tertiary">by</Typography>}
        sx={{ mr: 'auto' }}
      >
        Craftwork
      </Typography>
      <Link href="#" variant="plain" underline="none">
        About Us
      </Link>
      <Link href="#" variant="plain" underline="none">
        Terms & Conditions
      </Link>
      <Link href="#" variant="plain" underline="none">
        Contact Us
      </Link>
      <Typography level="body3" sx={{ ml: 'auto' }}>
        Copyright 2022
      </Typography>
    </Box>
  </React.Fragment>
);

const NavigationContent = () => (
  <React.Fragment>
    <Select
      variant="outlined"
      defaultValue="1"
      placeholder={
        <Box>
          <Typography level="inherit">Saleshouse</Typography>
          <Typography level="body2">general team</Typography>
        </Box>
      }
      startDecorator={
        <Sheet
          variant="solid"
          sx={{ p: 0.75, borderRadius: '50%', lineHeight: 0, alignSelf: 'center' }}
        >
          <BubbleChart sx={{ m: 0 }} />
        </Sheet>
      }
      sx={{ py: 1 }}
    >
      <Option value="1">General team</Option>
      <Option value="2">Engineering team</Option>
    </Select>
    <List sx={{ '--List-item-radius': '8px', '--List-gap': '4px', flexGrow: 0, minWidth: 256 }}>
      <ListItemButton>
        <ListItemDecorator>
          <PieChart />
        </ListItemDecorator>
        Dashboard
      </ListItemButton>
      <ListItemButton>
        <ListItemDecorator />
        Overview
      </ListItemButton>
      <ListItemButton selected variant="soft">
        <ListItemDecorator>
          <Sms />
        </ListItemDecorator>
        Chat
        <Chip size="sm" variant="soft" sx={{ ml: 'auto', bgcolor: 'background.surface' }}>
          5
        </Chip>
      </ListItemButton>
      <ListItemButton>
        <ListItemDecorator>
          <Person />
        </ListItemDecorator>
        Team
      </ListItemButton>
      <ListItem nested>
        <ListSubheader>Shortcuts</ListSubheader>
        <List>
          <ListItemButton>Tasks</ListItemButton>
          <ListItemButton>Reports</ListItemButton>
          <ListItemButton>Settings</ListItemButton>
        </List>
      </ListItem>
    </List>
    <Divider sx={{ mt: 'auto', mb: 2, mx: -2 }} />
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Avatar src="/static/images/avatar/2.jpg" size="lg" />
      <Typography sx={{ flex: 1 }}>Jerry Wilson</Typography>
      <IconButton>
        <MoreVert />
      </IconButton>
    </Box>
  </React.Fragment>
);
const NavigationContent2 = () => (
  <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
    <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm' }}>
      <Typography fontWeight="lg" sx={{ mb: 0.5 }}>
        Used space
      </Typography>
      <Typography level="body2">Admin updated 09:12 am</Typography>
      <Typography level="body3">November 08, 2020</Typography>
      <Box sx={{ display: 'flex', gap: 2, my: 2, alignItems: 'center' }}>
        <CircularProgress determinate value={71} size="lg" thickness={4}>
          71%
        </CircularProgress>
        <CircularProgress determinate value={32} size="lg" thickness={4}>
          32%
        </CircularProgress>
        <CircularProgress determinate value={40} size="lg" thickness={4}>
          40%
        </CircularProgress>
        <Divider orientation="vertical" />
        <Box>
          <Button variant="plain" size="sm" sx={{ mb: 1 }}>
            Scheduled
          </Button>
          <Button variant="outlined" size="sm" sx={{ mb: 1 }}>
            Scheduled
          </Button>
          <Typography level="body2" textAlign="right">
            Next clean up: <b>Monday</b>
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Slider defaultValue={30} valueLabelDisplay="on" />
    </Sheet>
    <Box sx={{ flexGrow: 1 }}>
      <Card
        variant="outlined"
        sx={{
          gridColumn: 'span 2',
          flexDirection: 'row',
          flexWrap: 'wrap',
          overflow: 'hidden',
          gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
          transition: 'transform 0.3s, border 0.3s',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
        }}
      >
        <AspectRatio
          variant="soft"
          sx={{
            flexGrow: 1,
            display: 'contents',
            '--AspectRatio-paddingBottom':
              'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 248px))',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: 200,
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <div>
              <Typography level="h2" sx={{ fontSize: 'md' }} mb={0.5}>
                Yosemite National Park
              </Typography>
              <Typography level="body2">California, USA</Typography>
            </div>
            <IconButton size="sm" variant="plain" sx={{ ml: 'auto', alignSelf: 'flex-start' }}>
              <FavoriteBorderRoundedIcon />
            </IconButton>
          </Box>
          <AspectRatio
            variant="soft"
            sx={{
              '--AspectRatio-paddingBottom': 'clamp(0px, (100% - 200px) * 999, 200px)',
              pointerEvents: 'none',
            }}
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
            />
          </AspectRatio>
          <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
            <Avatar variant="soft">Y</Avatar>
            <div>
              <Typography level="body2">Designed by</Typography>
              <Typography fontWeight="lg" level="body2">
                Nature itself
              </Typography>
            </div>
          </Box>
        </Box>
      </Card>
    </Box>
  </Box>
);

const WidgetContent = () => (
  <React.Fragment>
    <Typography
      startDecorator={
        <Sheet
          component="span"
          variant="soft"
          sx={{ borderRadius: 'sm', lineHeight: 0, px: 1, py: 0.5 }}
        >
          <FilterDrama />
        </Sheet>
      }
      fontWeight="md"
    >
      Sales
    </Typography>
    <Typography
      level="h3"
      endDecorator={
        <Chip variant="outlined" size="sm" endDecorator={<KeyboardArrowDown />}>
          High 311
        </Chip>
      }
      sx={{ my: 0.5 }}
    >
      59,476
    </Typography>
    <Typography level="body2">Total for this month</Typography>
  </React.Fragment>
);

const Slide = ({ children, sx }: React.PropsWithChildren<BoxProps>) => (
  <Box
    sx={[
      {
        height: '100vh',
        scrollSnapAlign: 'start',
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    {children}
  </Box>
);

export default function ColorInversion() {
  return (
    <CssVarsProvider disableTransitionOnChange theme={customTheme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
        }}
      >
        <Slide sx={{ '--Header-height': '64px', bgcolor: 'background.level1' }}>
          <Sheet
            variant="solid" // 1. change to "solid" or "soft".
            color="neutral" // 2. try other colors.
            invertedColors // 3. set `invertedColors` to true.
            sx={{
              display: 'flex',
              alignItems: 'center',
              minHeight: 'var(--Header-height)',
              boxShadow: 'inset 0 -1px 0 0px rgba(0 0 0 / 0.16)',
              position: 'relative',
              zIndex: 1,
              px: 1.5,
              background: (theme) =>
                `linear-gradient(60deg, ${theme.vars.palette.neutral[900]}, ${theme.vars.palette.neutral[600]})`,
            }}
          >
            <HeaderContent />
          </Sheet>
          <Box
            sx={{ display: 'flex', height: 'calc(100% - var(--Header-height) + 1px)', mt: '-1px' }}
          >
            <Sheet
              variant="solid" // 1. change to "solid" or "soft".
              color="neutral" // 2. try other colors.
              invertedColors // 3. set `invertedColors` to true.
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <NavigationContent />
            </Sheet>
            <Box
              // data-joy-color-scheme="dark"
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: 3,
                p: 5,
                flexGrow: 1,
                minWidth: 0,
                overflow: 'auto',
              }}
            >
              <Card variant="soft" color="success" invertedColors>
                <WidgetContent />
              </Card>
              <Card variant="soft" color="warning" invertedColors>
                <WidgetContent />
              </Card>
              <Card
              // variant="solid" color="info" invertedColors
              >
                <WidgetContent />
              </Card>
              <Card
              // variant="solid" color="danger" invertedColors
              >
                <WidgetContent />
              </Card>

              <Sheet
                variant="soft"
                color="danger"
                invertedColors
                sx={{
                  gridColumn: '1 / -1',
                  display: 'flex',
                  flexDirection: 'column',
                  p: 3,
                  borderRadius: 'md',
                }}
              >
                <NavigationContent2 />
              </Sheet>
              <Box sx={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
                <Sheet
                  variant="plain"
                  color="neutral"
                  sx={{ p: 2, borderRadius: 'md', mt: 'auto' }}
                >
                  <FooterContent />
                </Sheet>
              </Box>
            </Box>
          </Box>
        </Slide>
      </Box>
    </CssVarsProvider>
  );
}
