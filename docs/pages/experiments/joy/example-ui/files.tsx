/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import type { Theme } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import ListDivider from '@mui/joy/ListDivider';
import Sheet from '@mui/joy/Sheet';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import MenuIcon from '@mui/icons-material/Menu';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';

// custom
import exampleUITheme, { LoadFont } from 'docs/src/_experiments/JoyExampleUIs/exampleUITheme';
import Layout from 'docs/src/_experiments/JoyExampleUIs/Layout';
import FilesNav from 'docs/src/_experiments/JoyExampleUIs/FilesNav';

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
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
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
                <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
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
                bgcolor: 'background.componentBg',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                '& > *': {
                  p: 2,
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}
            >
              <Typography level="body3" fontWeight="md" noWrap>
                Folder name
              </Typography>
              <Typography level="body3" fontWeight="md" noWrap>
                Date modified
              </Typography>
              <Typography level="body3" fontWeight="md" noWrap>
                Size
              </Typography>
              <Typography level="body3" fontWeight="md" noWrap>
                Users
              </Typography>

              <Typography
                level="body2"
                startDecorator={<FolderOpenIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                Travel pictures
              </Typography>
              <Typography level="body2">21 October 2011, 3PM</Typography>
              <Typography level="body2" sx={{ color: 'success.600' }}>
                987.5MB
              </Typography>
              <Box>
                <AvatarGroup
                  size="sm"
                  sx={{ '--AvatarGroup-gap': '-8px', '--Avatar-size': '24px' }}
                >
                  <Avatar src="/static/images/avatar/1.jpg" />
                  <Avatar src="/static/images/avatar/2.jpg" />
                  <Avatar src="/static/images/avatar/3.jpg" />
                  <Avatar src="/static/images/avatar/4.jpg" />
                </AvatarGroup>
              </Box>

              <Typography
                level="body2"
                startDecorator={<FolderOpenIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                Important documents
              </Typography>
              <Typography level="body2">26 May 2010, 7PM</Typography>
              <Typography level="body2" sx={{ color: 'success.600' }}>
                123.3KB
              </Typography>
              <Box>
                <AvatarGroup
                  size="sm"
                  sx={{ '--AvatarGroup-gap': '-8px', '--Avatar-size': '24px' }}
                >
                  <Avatar src="/static/images/avatar/1.jpg" />
                  <Avatar src="/static/images/avatar/2.jpg" />
                  <Avatar src="/static/images/avatar/3.jpg" />
                  <Avatar src="/static/images/avatar/4.jpg" />
                </AvatarGroup>
              </Box>
            </Sheet>
            <Card
              variant="outlined"
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                bgcolor: 'background.componentBg',
                boxShadow: 'none',
              }}
            >
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
                  <Typography>photos-travel.zip</Typography>
                  <Typography level="body3" mt={0.5}>
                    Added 25 May 2011
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Card>
            <Card sx={{ '--Card-radius': (theme) => theme.vars.radius.sm, boxShadow: 'none' }}>
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
                  <Typography textColor="#fff">torres-del-paine.png</Typography>
                  <Typography level="body3" mt={0.5} textColor="rgba(255,255,255,0.72)">
                    Added 5 Aug 2016
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <EditOutlinedIcon />
                </IconButton>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{
                '--Card-radius': (theme) => theme.vars.radius.sm,
                bgcolor: 'background.componentBg',
                boxShadow: 'none',
              }}
            >
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
                  <Typography level="body3" mt={0.5}>
                    Added 26 May 2011
                  </Typography>
                </Box>
                <IconButton variant="plain" color="neutral">
                  <EditOutlinedIcon />
                </IconButton>
              </Box>
            </Card>
          </Box>
        </Layout.Main>
        <Sheet
          sx={{
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            bgcolor: 'background.componentBg',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flex: 1 }}>torres-del-paine.png</Typography>
            <IconButton variant="outlined" color="neutral" size="sm">
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
          <AspectRatio ratio="21/9">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            />
          </AspectRatio>
          <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography level="body2" mr={1}>
              Shared with
            </Typography>
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
            <Typography level="body2">Type</Typography>
            <Typography level="body2">Image</Typography>

            <Typography level="body2">Size</Typography>
            <Typography level="body2">3,6 MB (3,258,385 bytes)</Typography>

            <Typography level="body2">Storage used</Typography>
            <Typography level="body2">3,6 MB (3,258,385 bytes)</Typography>

            <Typography level="body2">Location</Typography>
            <Typography level="body2">Travel pictures</Typography>

            <Typography level="body2">Owner</Typography>
            <Typography level="body2">Michael Scott</Typography>

            <Typography level="body2">Modified</Typography>
            <Typography level="body2">26 October 2016</Typography>

            <Typography level="body2">Created</Typography>
            <Typography level="body2">5 August 2016</Typography>
          </Box>
          <ListDivider component="hr" />
          <Box sx={{ p: 2 }}>
            <Button variant="plain" size="sm" endIcon={<EditOutlinedIcon />} sx={{ pl: 1 }}>
              Add a description
            </Button>
          </Box>
        </Sheet>
      </Layout.Root>
    </CssVarsProvider>
  );
}
