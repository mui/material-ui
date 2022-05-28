/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import type { Theme } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MenuIcon from '@mui/icons-material/Menu';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// custom
import exampleUITheme, { LoadFont } from 'docs/src/_experiments/JoyExampleUIs/exampleUITheme';
import Layout from 'docs/src/_experiments/JoyExampleUIs/Layout';

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

const TeamNav = () => (
  <List sx={{ '--List-item-radius': '8px', '--List-decorator-width': '24px' }}>
    <ListItem nested>
      <ListItem component="div" id="nav-list-team">
        <ListItemContent
          sx={{
            fontWeight: 'lg',
            fontSize: 'xs2',
            textTransform: 'uppercase',
            letterSpacing: '.1rem',
            color: 'text.tertiary',
          }}
        >
          Team
        </ListItemContent>
        <KeyboardArrowDownRoundedIcon color="primary" />
      </ListItem>
      <List aria-labelledby="nav-list-team">
        <ListItem>
          <ListItemButton selected variant="soft">
            <ListItemDecorator>
              <FolderOpenIcon fontSize="md" />
            </ListItemDecorator>
            <ListItemContent>People</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <ShareOutlinedIcon fontSize="md" />
            </ListItemDecorator>
            <ListItemContent>Managing accounts</ListItemContent>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemDecorator>
              <FolderOutlinedIcon fontSize="md" />
            </ListItemDecorator>
            <ListItemContent>Policies</ListItemContent>
            <Chip variant="soft" size="sm" sx={{ borderRadius: 'sm' }}>
              Beta
            </Chip>
          </ListItemButton>
        </ListItem>
      </List>
    </ListItem>
  </List>
);

export default function TeamExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange theme={exampleUITheme}>
      <LoadFont />
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <TeamNav />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              variant="soft"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton size="sm" variant="solid">
              <MailRoundedIcon />
            </IconButton>
            <Typography fontWeight={700}>Team</Typography>
          </Box>
          <TextField
            size="sm"
            placeholder="Search anything..."
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography fontWeight="lg" fontSize="sm" color="text.tertiary">
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: '500px',
              display: {
                xs: 'none',
                sm: 'flex',
              },
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              <SearchRoundedIcon />
            </IconButton>
            <IconButton size="sm" variant="outlined" color="primary">
              <GridViewRoundedIcon />
            </IconButton>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <TeamNav />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              fontSize="xs2"
              color="text.tertiary"
              textTransform="uppercase"
              letterSpacing="md"
              fontWeight="lg"
            >
              Filters
            </Typography>
            <Link fontSize="sm" component="button">
              Clear filters
            </Link>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>By keywords</Typography>
              <KeyboardArrowUpRoundedIcon sx={{ ml: 'auto' }} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField placeholder="Position, skills, etc..." />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  variant="soft"
                  size="sm"
                  endDecorator={<ChipDelete variant="soft" />}
                  sx={{ '--Chip-radius': (theme) => theme.vars.radius.sm }}
                >
                  ui designer
                </Chip>
              </Box>
            </Box>
          </Box>
          <ListDivider component="hr" />
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>By location</Typography>
              <KeyboardArrowUpRoundedIcon sx={{ ml: 'auto' }} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField placeholder="Search for a city" />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  variant="soft"
                  size="sm"
                  endDecorator={<ChipDelete variant="soft" />}
                  sx={{ '--Chip-radius': (theme) => theme.vars.radius.sm }}
                >
                  ui designer
                </Chip>
              </Box>
            </Box>
          </Box>
          <ListDivider component="hr" />
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>By education</Typography>
              <KeyboardArrowUpRoundedIcon sx={{ ml: 'auto' }} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <RadioGroup name="education" defaultValue="any">
                <Radio label="Any" value="any" />
                <Radio label="High School" value="high-school" />
                <Radio label="College" value="college" />
                <Radio label="Post-graduate" value="post-graduate" />
              </RadioGroup>
            </Box>
          </Box>
          <ListDivider component="hr" />
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>By previous experience</Typography>
              <KeyboardArrowDownRoundedIcon sx={{ ml: 'auto' }} />
            </Box>
          </Box>
          <ListDivider component="hr" />
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography>By personal characteristics</Typography>
              <KeyboardArrowDownRoundedIcon sx={{ ml: 'auto' }} />
            </Box>
          </Box>
          <ListDivider component="hr" />
        </Layout.SidePane>
        <Layout.Main>
          <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 2,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <Sheet
                key={index}
                component="li"
                variant="outlined"
                sx={{ borderRadius: 'sm', p: 2, listStyle: 'none' }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar src="/static/images/avatar/1.jpg" sx={{ borderRadius: 'sm' }} />
                  <Box>
                    <Typography>Andrew Smith</Typography>
                    <Typography level="body2">UI Designer</Typography>
                  </Box>
                </Box>
                <ListDivider component="div" sx={{ my: 2 }} />
                <List sx={{ '--List-decorator-width': '52px' }}>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator
                      sx={{
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          height: '100%',
                          width: '2px',
                          bgcolor: 'divider',
                          left: 'calc(var(--List-item-paddingLeft) + 15px)',
                          top: '50%',
                        },
                      }}
                    >
                      <Avatar
                        size="sm"
                        src="https://seeklogo.com/images/D/dribbble-logo-143FF96D65-seeklogo.com.png"
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>Senior designer</Typography>
                      <Typography level="body2">Dribbble</Typography>
                    </ListItemContent>
                    <Typography level="body2">2015-now</Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator>
                      <Avatar
                        size="sm"
                        src="https://seeklogo.com/images/P/pinterest-logo-CA98998DCB-seeklogo.com.png"
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography>Desinger</Typography>
                      <Typography level="body2">Pinterest</Typography>
                    </ListItemContent>
                    <Typography level="body2">2012-2015</Typography>
                  </ListItem>
                </List>
                <Link endDecorator={<ArrowForwardIcon />} sx={{ mt: 2 }}>
                  Expand
                </Link>
                <ListDivider component="div" sx={{ my: 2 }} />
                <Typography fontSize="sm">Skills tags:</Typography>
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                  <Chip variant="outlined" color="neutral" size="sm" sx={{ borderRadius: 'sm' }}>
                    UI design
                  </Chip>
                  <Chip variant="outlined" color="neutral" size="sm" sx={{ borderRadius: 'sm' }}>
                    Illustration
                  </Chip>
                </Box>
              </Sheet>
            ))}
          </List>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
