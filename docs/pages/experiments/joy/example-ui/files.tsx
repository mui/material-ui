/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import type { Theme } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
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
import Sheet from '@mui/joy/Sheet';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import MenuIcon from '@mui/icons-material/Menu';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

// custom
import exampleUITheme, { LoadFont } from 'docs/src/_experiments/JoyExampleUIs/exampleUITheme';
import Layout from 'docs/src/_experiments/JoyExampleUIs/Layout';
import AspectRatio from '@mui/joy/AspectRatio';

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

const FilesNav = () => (
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

export default function FilesExample() {
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
          <FilesNav />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 260px) minmax(600px, 1fr) minmax(300px, 360px)',
          },
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
            <Typography fontWeight={700}>Files</Typography>
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
          <FilesNav />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr',
                '& > *': {
                  p: 2,
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}
            >
              <Typography level="body2" noWrap>
                Folder name
              </Typography>
              <Typography level="body2" noWrap>
                Date modified
              </Typography>
              <Typography level="body2" noWrap>
                Size
              </Typography>
              <Typography level="body2" noWrap>
                Users
              </Typography>

              <Typography
                startDecorator={<FolderOpenIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                Videos
              </Typography>
              <Typography>Modified 26 May 2016, 7PM</Typography>
              <Typography sx={{ color: 'success.600' }}>123.3KB</Typography>
              <Box>
                <AvatarGroup size="sm" sx={{ '--AvatarGroup-gap': '-12px' }}>
                  <Avatar src="/static/images/avatar/1.jpg" />
                  <Avatar src="/static/images/avatar/2.jpg" />
                  <Avatar src="/static/images/avatar/3.jpg" />
                  <Avatar src="/static/images/avatar/4.jpg" />
                </AvatarGroup>
              </Box>

              <Typography
                startDecorator={<FolderOpenIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                Videos
              </Typography>
              <Typography>Modified 26 May 2016, 7PM</Typography>
              <Typography sx={{ color: 'success.600' }}>123.3KB</Typography>
              <Box>
                <AvatarGroup size="sm" sx={{ '--AvatarGroup-gap': '-12px' }}>
                  <Avatar src="/static/images/avatar/1.jpg" />
                  <Avatar src="/static/images/avatar/2.jpg" />
                  <Avatar src="/static/images/avatar/3.jpg" />
                  <Avatar src="/static/images/avatar/4.jpg" />
                </AvatarGroup>
              </Box>
            </Sheet>
            <Card variant="outlined" sx={{ '--Card-radius': (theme) => theme.vars.radius.sm }}>
              <CardOverflow
                sx={{ borderBottom: '1px solid', borderColor: 'neutral.outlinedBorder' }}
              >
                <AspectRatio ratio="4/3" color="primary">
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.plainColor',
                    }}
                  >
                    .zip
                  </Typography>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>platform_ios.zip</Typography>
                  <Typography level="body2">Added 5 Aug 2016</Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Card>
            <Card sx={{ '--Card-radius': (theme) => theme.vars.radius.sm }}>
              <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                />
              </CardCover>
              <CardCover
                sx={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))' }}
              />
              <CardContent
                sx={{
                  mt: 'auto',
                  flexGrow: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography color="#fff">platform_ios.zip</Typography>
                  <Typography color="rgba(255,255,255,0.72)" level="body2">
                    Added 5 Aug 2016
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <EditOutlinedIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card variant="outlined" sx={{ '--Card-radius': (theme) => theme.vars.radius.sm }}>
              <CardOverflow
                sx={{ borderBottom: '1px solid', borderColor: 'neutral.outlinedBorder' }}
              >
                <AspectRatio ratio="4/3" color="primary">
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'primary.plainColor',
                    }}
                  >
                    .zip
                  </Typography>
                </AspectRatio>
              </CardOverflow>
              <Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography>platform_ios.zip</Typography>
                  <Typography level="body2">Added 5 Aug 2016</Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Card>
          </Box>
        </Layout.Main>
        <Box sx={{ borderLeft: '1px solid', borderColor: 'neutral.outlinedBorder' }}>
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flex: 1 }}>torres_del_paine.png</Typography>
            <IconButton variant="plain" size="sm">
              <CloseIcon />
            </IconButton>
          </Box>
          <ListDivider component="hr" />
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="soft"
              sx={{
                borderRadius: 0,
                borderBottom: '2px solid',
                borderColor: 'primary.solidBg',
                flex: 1,
                py: '1rem',
              }}
            >
              Details
            </Button>
            <Button variant="plain" color="neutral" sx={{ borderRadius: 0, flex: 1, py: '1rem' }}>
              Activity
            </Button>
          </Box>
          <ListDivider component="hr" />
          <AspectRatio ratio="21/9">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            />
          </AspectRatio>
          <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
            <Typography>Shared with</Typography>
            <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
              <Avatar src="/static/images/avatar/1.jpg" />
              <Avatar src="/static/images/avatar/2.jpg" />
              <Avatar src="/static/images/avatar/3.jpg" />
              <Avatar src="/static/images/avatar/4.jpg" />
            </AvatarGroup>
          </Box>
          <ListDivider component="hr" />
          <Box
            sx={{
              gap: 2,
              p: 2,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              '& > *:nth-child(odd)': { color: 'text.secondary' },
            }}
          >
            <Typography>Type</Typography>
            <Typography>Image</Typography>

            <Typography>Size</Typography>
            <Typography>3,6 MB (3,258,385 bytes)</Typography>

            <Typography>Storage used</Typography>
            <Typography>3,6 MB (3,258,385 bytes)</Typography>

            <Typography>Location</Typography>
            <Typography>Photos</Typography>

            <Typography>Owner</Typography>
            <Typography>Andrew Smith</Typography>

            <Typography>Modified</Typography>
            <Typography>26 May 2016</Typography>

            <Typography>Created</Typography>
            <Typography>18 Mar 2015</Typography>
          </Box>
          <ListDivider component="hr" />
          <Box sx={{ p: 2 }}>
            <Link component="button" endDecorator={<EditOutlinedIcon />}>
              Add a description
            </Link>
          </Box>
          <ListDivider component="hr" />
        </Box>
      </Layout.Root>
    </CssVarsProvider>
  );
}
