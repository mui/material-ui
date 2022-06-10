import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet, { sheetClasses } from '@mui/joy/Sheet';
import Switch, { switchClasses } from '@mui/joy/Switch';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRightRounded';
import Flight from '@mui/icons-material/Flight';
import Wifi from '@mui/icons-material/Wifi';
import Bluetooth from '@mui/icons-material/Bluetooth';
import Podcasts from '@mui/icons-material/Podcasts';

export default function ExampleIOSList() {
  return (
    <Box sx={{ width: 343 }}>
      <Typography level="h3" fontSize="xl2" fontWeight="xl" id="ios-example-demo">
        Settings
      </Typography>
      <List
        aria-labelledby="ios-example-demo"
        sx={(theme) => ({
          '& ul': {
            bgcolor: 'background.surface',
            [`& .${sheetClasses.root}`]: {
              p: 0.5,
              lineHeight: 0,
              borderRadius: 'sm',
            },
            '& > li:first-child > [role="button"]': {
              borderTopRightRadius: 'var(--List-radius)',
              borderTopLeftRadius: 'var(--List-radius)',
            },
            '& > li:last-child > [role="button"]': {
              borderBottomRightRadius: 'var(--List-radius)',
              borderBottomLeftRadius: 'var(--List-radius)',
            },
          },
          '--List-radius': '16px',
          '--List-gap': '1rem',
          '--List-item-radius': '0px',
          '--List-divider-gap': '0px',
          '--List-item-paddingY': '0.75rem',
          // override global variant tokens
          '--joy-palette-neutral-plainHoverBg': theme.vars.palette.neutral[200],
          '--joy-palette-neutral-plainActiveBg': theme.vars.palette.neutral[300],
          [theme.getColorSchemeSelector('dark')]: {
            '--joy-palette-neutral-plainHoverBg': theme.vars.palette.neutral[800],
            '--joy-palette-neutral-plainActiveBg': theme.vars.palette.neutral[600],
          },
        })}
      >
        <ListItem nested>
          <List
            aria-label="Personal info"
            sx={{ '--List-gap': '0px', '--List-decorator-width': '72px' }}
          >
            <ListItem>
              <ListItemDecorator>
                <Avatar size="lg" sx={{ '--Avatar-size': '60px' }}>
                  MB
                </Avatar>
              </ListItemDecorator>
              <div>
                <Typography fontSize="xl">Murphy Bates</Typography>
                <Typography fontSize="xs">
                  Apple ID, iCloud, Media & Purchase
                </Typography>
              </div>
            </ListItem>
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemButton>
                <ListItemContent>iCloud+ Feature Updates</ListItemContent>
                <KeyboardArrowRight fontSize="xl3" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </ListItem>
        <ListItem
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
          }}
        >
          <ListItemButton
            aria-describedby="apple-tv-description"
            sx={{
              bgcolor: 'background.surface',
              mb: 1,
              borderRadius: 'var(--List-radius)',
            }}
          >
            Apple TV+ Free Year Available
          </ListItemButton>
          <Typography id="apple-tv-description" level="body3" aria-hidden>
            Included with your recent Apple device purchase. Must be accepted within
            90 days of activation.
          </Typography>
        </ListItem>
        <ListItem nested sx={{ mt: 0 }}>
          <List aria-label="Network" sx={{ '--List-gap': '0px' }}>
            <ListItem>
              <ListItemDecorator>
                <Sheet variant="solid" color="warning">
                  <Flight />
                </Sheet>
              </ListItemDecorator>
              <ListItemContent htmlFor="airplane-mode" component="label">
                Airplane Mode
              </ListItemContent>
              <Switch
                id="airplane-mode"
                size="lg"
                color="success"
                sx={{
                  '--Switch-track-width': '48px',
                  '--Switch-track-height': '28px',
                  '--Switch-thumb-shadow': (theme) => theme.vars.shadow.sm,
                  '--Switch-track-background': (theme) =>
                    theme.vars.palette.background.level3,
                  '&:hover': {
                    '--Switch-track-background': (theme) =>
                      theme.vars.palette.background.level3,
                  },
                  '&:active': {
                    '--Switch-thumb-width': '32px',
                    [`& .${switchClasses.thumb}`]: {
                      transition: 'width 0.2s, left 0.2s',
                    },
                  },
                  [`&.${switchClasses.checked}`]: {
                    '--Switch-track-background': (theme) =>
                      theme.vars.palette.success[500],
                    '&:hover': {
                      '--Switch-track-background': (theme) =>
                        theme.vars.palette.success[500],
                    },
                  },
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Sheet variant="solid" color="primary">
                    <Wifi />
                  </Sheet>
                </ListItemDecorator>
                <ListItemContent>Wi-Fi</ListItemContent>
                <Typography textColor="text.tertiary">Mars</Typography>
                <KeyboardArrowRight fontSize="xl3" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Sheet variant="solid" color="primary">
                    <Bluetooth />
                  </Sheet>
                </ListItemDecorator>
                <ListItemContent>Bluetooth</ListItemContent>
                <Typography textColor="text.tertiary">On</Typography>
                <KeyboardArrowRight fontSize="xl3" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <ListItemDecorator>
                  <Sheet
                    variant="solid"
                    color="success"
                    sx={{ bgcolor: 'success.500' }}
                  >
                    <Podcasts />
                  </Sheet>
                </ListItemDecorator>
                <ListItemContent>Cellular</ListItemContent>
                <KeyboardArrowRight fontSize="xl3" sx={{ color: 'text.tertiary' }} />
              </ListItemButton>
            </ListItem>
          </List>
        </ListItem>
      </List>
    </Box>
  );
}
