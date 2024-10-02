import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
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
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Header from './components/Header';
import TableFiles from './components/TableFiles';

export default function FilesExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        spacing={1}
        sx={{
          justifyContent: 'space-around',
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/email/"
          size="sm"
          startDecorator={<EmailRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Email
        </Button>
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/joy-ui/getting-started/templates/team/"
          size="sm"
          startDecorator={<PeopleAltRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Team
        </Button>
        <Button
          variant="plain"
          color="neutral"
          aria-pressed="true"
          component="a"
          href="/joy-ui/getting-started/templates/files/"
          size="sm"
          startDecorator={<FolderRoundedIcon />}
          sx={{ flexDirection: 'column', '--Button-gap': 0 }}
        >
          Files
        </Button>
      </Stack>
      <Layout.Root
        sx={[
          {
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
              md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
            },
          },
          drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          },
        ]}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            {' '}
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <TableFiles />
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                display: { xs: 'inherit', sm: 'none' },
                borderRadius: 'sm',
                overflow: 'auto',
                backgroundColor: 'background.surface',
                '& > *': {
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}
            >
              <List size="sm" aria-labelledby="table-in-list">
                <ListItem>
                  <ListItemButton variant="soft" sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          level="title-sm"
                          startDecorator={<FolderRoundedIcon color="primary" />}
                          sx={{ alignItems: 'flex-start' }}
                        >
                          Travel pictures
                        </Typography>
                        <AvatarGroup
                          size="sm"
                          sx={{
                            '--AvatarGroup-gap': '-8px',
                            '--Avatar-size': '24px',
                          }}
                        >
                          <Avatar
                            src="https://i.pravatar.cc/24?img=6"
                            srcSet="https://i.pravatar.cc/48?img=6 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=7"
                            srcSet="https://i.pravatar.cc/48?img=7 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=8"
                            srcSet="https://i.pravatar.cc/48?img=8 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=9"
                            srcSet="https://i.pravatar.cc/48?img=9 2x"
                          />
                        </AvatarGroup>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}
                      >
                        <Typography level="body-sm">987.5MB</Typography>

                        <Typography level="body-sm">21 Oct 2023, 3PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                  <ListItemButton variant="soft" sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          level="title-sm"
                          startDecorator={<FolderRoundedIcon color="primary" />}
                          sx={{ alignItems: 'flex-start' }}
                        >
                          Important documents
                        </Typography>
                        <AvatarGroup
                          size="sm"
                          sx={{
                            '--AvatarGroup-gap': '-8px',
                            '--Avatar-size': '24px',
                          }}
                        >
                          <Avatar
                            src="https://i.pravatar.cc/24?img=1"
                            srcSet="https://i.pravatar.cc/48?img=1 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=9"
                            srcSet="https://i.pravatar.cc/48?img=9 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=2"
                            srcSet="https://i.pravatar.cc/48?img=2 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=3"
                            srcSet="https://i.pravatar.cc/48?img=3 2x"
                          />
                          <Avatar>+3</Avatar>
                        </AvatarGroup>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}
                      >
                        <Typography level="body-sm">232.3MB</Typography>

                        <Typography level="body-sm">26 Sep 2023, 7PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                  <ListItemButton variant="soft" sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                          level="title-sm"
                          startDecorator={<FolderRoundedIcon color="primary" />}
                          sx={{ alignItems: 'flex-start' }}
                        >
                          Projects
                        </Typography>
                        <AvatarGroup
                          size="sm"
                          sx={{
                            '--AvatarGroup-gap': '-8px',
                            '--Avatar-size': '24px',
                          }}
                        >
                          <Avatar
                            src="https://i.pravatar.cc/24?img=4"
                            srcSet="https://i.pravatar.cc/48?img=4 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=8"
                            srcSet="https://i.pravatar.cc/48?img=8 2x"
                          />
                          <Avatar
                            src="https://i.pravatar.cc/24?img=5"
                            srcSet="https://i.pravatar.cc/48?img=5 2x"
                          />
                        </AvatarGroup>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}
                      >
                        <Typography level="body-sm">1.6GB</Typography>

                        <Typography level="body-sm">12 Aug 2021, 7PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListDivider />
                <ListItem>
                  <ListItemButton variant="soft" sx={{ bgcolor: 'transparent' }}>
                    <ListItemContent sx={{ p: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                        }}
                      >
                        <Typography
                          level="title-sm"
                          startDecorator={<FolderRoundedIcon color="primary" />}
                          sx={{ alignItems: 'flex-start' }}
                        >
                          Invoices
                        </Typography>
                        <Avatar
                          size="sm"
                          src="https://i.pravatar.cc/24?img=2"
                          srcSet="https://i.pravatar.cc/48?img=2 2x"
                          sx={{ '--Avatar-size': '24px' }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mt: 2,
                        }}
                      >
                        <Typography level="body-sm">123.3KB</Typography>

                        <Typography level="body-sm">14 Mar 2021, 7PM</Typography>
                      </Box>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </List>
            </Sheet>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">lotr-two-towers.pdf</Typography>
                  <Typography level="body-sm">132.2MB</Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{
                      maxWidth: '32px',
                      maxHeight: '32px',
                      borderRadius: '9999999px',
                    }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon color="danger" />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=400&auto=format"
                    srcSet="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=400&auto=format&dpr=2 2x"
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 27 Jun 2023</Typography>
            </Card>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">photos-travel.zip</Typography>
                  <Typography level="body-sm">2.4GB</Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{ maxWidth: '32px', maxHeight: '32px' }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon color="danger" />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio
                  ratio="16/9"
                  color="primary"
                  sx={{ borderRadius: 0, color: 'primary.plainColor' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <InsertDriveFileRoundedIcon />
                  </Box>
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 16 May 2021</Typography>
            </Card>
            <Card
              variant="solid"
              invertedColors
              size="sm"
              sx={{
                border: '1px solid',
                borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
                minHeight: { xs: 250, md: '100%' },
              }}
            >
              <CardContent
                sx={{
                  mb: 'auto',
                  flexGrow: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">torres-del-paine.png</Typography>
                  <Typography level="body-xs" sx={{ mt: 0.5 }}>
                    Added 5 Apr 2021
                  </Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{ maxWidth: '32px', maxHeight: '32px' }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon color="danger" />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </CardContent>
              <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format"
                  srcSet="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format&dpr=2 2x"
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
                }}
              />
            </Card>
            <Card
              variant="solid"
              size="sm"
              invertedColors
              sx={{
                minHeight: { xs: 250, md: '100%' },
                border: '1px solid',
                borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
              }}
            >
              <CardContent
                sx={{
                  mb: 'auto',
                  flexGrow: 0,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">serra-das-araras.png</Typography>
                  <Typography level="body-xs" sx={{ mt: 0.5 }}>
                    Added 2 Mar 2021
                  </Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{ maxWidth: '32px', maxHeight: '32px' }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon color="danger" />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </CardContent>
              <CardCover>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1599593752325-ffa41031056e?w=400&h=400&auto=format"
                  srcSet="https://images.unsplash.com/photo-1599593752325-ffa41031056e?w=400&h=400&auto=format&dpr=2 2x"
                />
              </CardCover>
              <CardCover
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
                }}
              />
            </Card>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">translated-docs.txt</Typography>
                  <Typography level="body-sm">12.2KB</Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{
                      maxWidth: '32px',
                      maxHeight: '32px',
                      borderRadius: '9999999px',
                    }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon color="danger" />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=400&h=400&auto=format"
                    srcSet="https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=400&h=400&auto=format&dpr=2 2x"
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 25 May 2019</Typography>
            </Card>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">final-version-v3.fig</Typography>
                  <Typography level="body-sm">1.1GB</Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{
                      maxWidth: '32px',
                      maxHeight: '32px',
                      borderRadius: '9999999px',
                    }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon color="danger" />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio
                  ratio="16/9"
                  color="primary"
                  sx={{ borderRadius: 0, color: 'primary.plainColor' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <InsertDriveFileRoundedIcon />
                  </Box>
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 12 May 2019</Typography>
            </Card>
          </Box>
        </Layout.Main>
        <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography level="title-md" sx={{ flex: 1 }}>
              torres-del-paine.png
            </Typography>
            <IconButton component="span" variant="plain" color="neutral" size="sm">
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Divider />
          <Tabs>
            <TabList>
              <Tab sx={{ flexGrow: 1 }}>
                <Typography level="title-sm">Details</Typography>
              </Tab>
              <Tab sx={{ flexGrow: 1 }}>
                <Typography level="title-sm">Activity</Typography>
              </Tab>
            </TabList>
            <TabPanel value={0} sx={{ p: 0 }}>
              <AspectRatio ratio="21/9">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format"
                  srcSet="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&h=400&auto=format&dpr=2 2x"
                />
              </AspectRatio>
              <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography level="title-sm" sx={{ mr: 1 }}>
                  Shared with
                </Typography>
                <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
                  <Avatar
                    src="https://i.pravatar.cc/24?img=6"
                    srcSet="https://i.pravatar.cc/48?img=6 2x"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/24?img=7"
                    srcSet="https://i.pravatar.cc/48?img=7 2x"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/24?img=8"
                    srcSet="https://i.pravatar.cc/48?img=8 2x"
                  />
                  <Avatar
                    src="https://i.pravatar.cc/24?img=9"
                    srcSet="https://i.pravatar.cc/48?img=9 2x"
                  />
                </AvatarGroup>
              </Box>
              <Divider />
              <Box
                sx={{
                  gap: 2,
                  p: 2,
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  '& > *:nth-child(odd)': { color: 'text.secondary' },
                }}
              >
                <Typography level="title-sm">Type</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  Image
                </Typography>
                <Typography level="title-sm">Size</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  3,6 MB (3,258,385 bytes)
                </Typography>
                <Typography level="title-sm">Location</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  Travel pictures
                </Typography>
                <Typography level="title-sm">Owner</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  Michael Scott
                </Typography>
                <Typography level="title-sm">Modified</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  26 October 2016
                </Typography>
                <Typography level="title-sm">Created</Typography>
                <Typography level="body-sm" textColor="text.primary">
                  5 August 2016
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ py: 2, px: 1 }}>
                <Button variant="plain" size="sm" endDecorator={<EditRoundedIcon />}>
                  Add a description
                </Button>
              </Box>
            </TabPanel>
            <TabPanel
              value={1}
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <Typography level="title-md">This week</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/24?img=2"
                  srcSet="https://i.pravatar.cc/48?img=2 2x"
                />
                <div>
                  <Box
                    sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}
                  >
                    <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level="body-sm">shared</Typography>
                    <Typography level="title-sm">torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant="outlined" startDecorator={<ShareRoundedIcon />}>
                    Shared with 3 users
                  </Chip>
                  <Typography level="body-xs" sx={{ mt: 1 }}>
                    3 Nov 2023
                  </Typography>
                </div>
              </Box>
              <Typography level="title-md">Older</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/24?img=2"
                  srcSet="https://i.pravatar.cc/48?img=2 2x"
                />
                <div>
                  <Box
                    sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}
                  >
                    <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level="body-sm">edited</Typography>
                    <Typography level="title-sm">torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant="outlined" startDecorator={<EditRoundedIcon />}>
                    Changed name
                  </Chip>
                  <Typography level="body-xs" sx={{ mt: 1 }}>
                    12 Apr 2021
                  </Typography>
                </div>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/24?img=2"
                  srcSet="https://i.pravatar.cc/48?img=2 2x"
                />
                <div>
                  <Box
                    sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 1 }}
                  >
                    <Typography level="title-sm" sx={{ alignItems: 'center' }}>
                      You
                    </Typography>
                    <Typography level="body-sm">created</Typography>
                    <Typography level="title-sm">torres-del-paine.png</Typography>
                  </Box>
                  <Chip variant="outlined" startDecorator={<EditRoundedIcon />}>
                    Added 5 Apr 2021
                  </Chip>
                  <Typography level="body-xs" sx={{ mt: 1 }}>
                    12 Apr 2021
                  </Typography>
                </div>
              </Box>
            </TabPanel>
          </Tabs>
        </Sheet>
      </Layout.Root>
    </CssVarsProvider>
  );
}
