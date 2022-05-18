import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, Theme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';

// Icons import
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AttachEmailRoundedIcon from '@mui/icons-material/AttachEmailRounded';

export default function EmailExample() {
  return (
    <CssVarsProvider>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '0px 0px 1fr',
            sm: '64px minmax(200px, 1fr) minmax(500px, 1fr)',
            md: 'minmax(160px, 230px) minmax(200px, 400px) minmax(700px, 1fr)',
          },
          gridTemplateRows: '64px 1fr',
          minHeight: '100vh',
        }}
      >
        <Box
          className="Header"
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gridColumn: '1 / -1',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <IconButton size="sm" sx={{ bgcolor: 'primary.100' }}>
              <AttachEmailRoundedIcon />
            </IconButton>
            <Typography fontWeight={700} sx={{ ml: 1 }}>
              Email
            </Typography>
          </Box>
          <TextField
            size="sm"
            placeholder="Search anything..."
            startDecorator={<SearchRoundedIcon />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography fontWeight={700} fontSize="sm">
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              '--Input-gutter': '-0.5rem',
              minWidth: {
                xs: '100%',
                sm: '500px',
              },
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <IconButton size="sm" variant="outlined" color="neutral">
              <GridViewRoundedIcon color="primary" />
            </IconButton>
            <IconButton size="sm" variant="outlined" color="neutral">
              <DarkModeRoundedIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
        <Box
          className="Navigation"
          sx={{
            borderRight: '1px solid',
            borderColor: 'divider',
            p: 2,
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Typography
              color="neutral.500"
              fontWeight={700}
              sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1rem' }}
            >
              Browse
            </Typography>
          </Box>
          <List
            size="sm"
            sx={{
              '--List-item-radius': '8px',
              '& .MuiListItemButton-root': { p: '8px' },
            }}
          >
            <ListItem>
              <ListItemButton variant="soft" color="primary">
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <InboxRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Inbox</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <OutboxRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Sent</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <FolderRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Draft</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <AssistantPhotoRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Flagged</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ color: 'inherit' }}>
                  <DeleteRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Trash</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ mt: 2, mb: 1 }}>
            <Typography
              color="neutral.500"
              fontWeight={700}
              sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1rem' }}
            >
              Tags
            </Typography>
          </Box>
          <List
            size="sm"
            sx={{
              '--List-item-radius': '8px',
              '--List-decorator-width': '32px',
              '& .MuiListItemButton-root': { p: '8px' },
            }}
          >
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '99px',
                      bgcolor: 'primary.300',
                    }}
                  />
                </ListItemDecorator>
                <ListItemContent>Personal</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '99px',
                      bgcolor: 'danger.300',
                    }}
                  />
                </ListItemDecorator>
                <ListItemContent>Work</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '99px',
                      bgcolor: 'warning.200',
                    }}
                  />
                </ListItemDecorator>
                <ListItemContent>Travels</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '99px',
                      bgcolor: 'success.300',
                    }}
                  />
                </ListItemDecorator>
                <ListItemContent>Concert tickets</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box
          className="Inbox"
          sx={{
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ p: 2, mb: 1 }}>
            <Typography
              color="neutral.500"
              fontWeight={700}
              sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1rem' }}
            >
              Unread
            </Typography>
          </Box>
          <Box sx={{ py: 10 }}>
            <Typography color="neutral.500" level="body2" sx={{ textAlign: 'center' }}>
              You've read all messages in your inbox.
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography
              color="neutral.500"
              fontWeight={700}
              sx={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '.1rem' }}
            >
              Everything else
            </Typography>
          </Box>
          <List>
            <ListItem variant="soft" color="primary">
              <ListItemButton sx={{ p: 2 }}>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Box
                    component="img"
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                    }}
                  />
                </ListItemDecorator>
                <Box sx={{ pl: 2, width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5,
                    }}
                  >
                    <Typography level="body3">Janet Erickson</Typography>
                    <Typography level="body3">14 Oct 2016</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ mb: 0.5 }}>Blank slates for new website</Typography>
                    <Typography level="body2">Hi, Thomas, You don't have...</Typography>
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
            <ListDivider sx={{ m: 0 }} />
            <ListItem>
              <ListItemButton sx={{ p: 2 }}>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Box
                    component="img"
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                    }}
                  />
                </ListItemDecorator>
                <Box sx={{ pl: 2, width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5,
                    }}
                  >
                    <Typography level="body3">Janet Erickson</Typography>
                    <Typography level="body3">14 Oct 2016</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ mb: 0.5 }}>Blank slates for new website</Typography>
                    <Typography level="body2">Hi, Thomas, You don't have...</Typography>
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
            <ListDivider sx={{ m: 0 }} />
            <ListItem>
              <ListItemButton sx={{ p: 2 }}>
                <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                  <Box
                    component="img"
                    src="/static/images/avatar/1.jpg"
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '8px',
                    }}
                  />
                </ListItemDecorator>
                <Box sx={{ pl: 2, width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5,
                    }}
                  >
                    <Typography level="body3">Janet Erickson</Typography>
                    <Typography level="body3">14 Oct 2016</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ mb: 0.5 }}>Blank slates for new website</Typography>
                    <Typography level="body2">Hi, Thomas, You don't have...</Typography>
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
            <ListDivider sx={{ m: 0 }} />
          </List>
        </Box>
        <Box component="main" className="Main" sx={{ p: 2, bgcolor: 'background.level1' }}>
          <Sheet variant="outlined" sx={{ minHeight: 500, borderRadius: 'sm', p: 2 }}>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box
                  component="img"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                  }}
                />
                <Box
                  sx={{
                    ml: 2,
                  }}
                >
                  <Typography level="body2" color="neutral.800">
                    Janet Erickson
                  </Typography>
                  <Typography level="body3">14 Oct 2016</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                <Button variant="outlined" color="neutral">
                  <Typography level="body1" color="primary.600">
                    Reply
                  </Typography>
                </Button>
                <IconButton size="sm" variant="outlined" color="neutral">
                  <GridViewRoundedIcon color="primary" />
                </IconButton>
                <IconButton size="sm" variant="outlined" color="neutral">
                  <DarkModeRoundedIcon color="primary" />
                </IconButton>
              </Box>
            </Box>
          </Sheet>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
