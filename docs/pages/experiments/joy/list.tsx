import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { ColorPaletteProp, CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import NextLink from 'next/link';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemAdornment from '@mui/joy/ListItemAdornment';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemSeparator from '@mui/joy/ListItemSeparator';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BeachAccess from '@mui/icons-material/BeachAccess';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Star from '@mui/icons-material/StarBorder';
import Favorite from '@mui/icons-material/FavoriteBorder';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const Circle = ({
  sx = [],
  color = 'neutral',
  ...props
}: Omit<BoxProps, 'color'> & { color?: ColorPaletteProp }) => (
  <Box
    {...props}
    sx={[
      (theme) => ({
        display: 'inline-flex',
        borderRadius: '40px',
        p: '0.5rem',
        ...theme.variants.light[color],
      }),
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  />
);

export default function JoyTypography() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              neutral: {
                outlinedBorder: 'rgba(0, 0, 0, 0.12)',
              },
            },
          },
        },
        components: {
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'xl',
            },
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: theme.vars.fontSize[ownerState.fontSize],
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' && {
                    color: theme.vars.palette[ownerState.color].textColor,
                  }),
              }),
            },
          },
        },
      }}
    >
      <GlobalStyles
        styles={{ body: { margin: 0, backgroundColor: 'var(--joy-palette-background-level1)' } }}
      />
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            alignItems: 'flex-start',
            '& > *': { bgcolor: 'background.body' },
          }}
        >
          {/* ex1 */}
          <List>
            <ListItem>Inbox</ListItem>
            <ListItem>Drafts</ListItem>
          </List>

          {/* ex2 */}
          <List>
            <ListItem>Inbox</ListItem>
            <ListItemSeparator />
            <ListItem>Drafts</ListItem>
            <ListItemSeparator />
            <ListItem>Trash</ListItem>
          </List>

          {/* ex3 */}
          <List>
            <ListItem>
              <ListItemAdornment>
                <InboxIcon fontSize="lg" />
              </ListItemAdornment>
              Inbox
            </ListItem>
            <ListItem>
              <ListItemAdornment />
              Drafts
            </ListItem>
            <ListItem>
              <ListItemAdornment />
              Trash
            </ListItem>
          </List>

          {/* ex4 */}
          <List>
            <ListItem>
              <ListItemAdornment>
                <InboxIcon fontSize="lg" />
              </ListItemAdornment>
              Inbox
            </ListItem>
            <ListItem>
              <ListItemAdornment>
                <DraftsIcon fontSize="lg" />
              </ListItemAdornment>
              Drafts
            </ListItem>
            <ListItemSeparator />
            <ListItem>Trash</ListItem>
          </List>

          {/* ex5 */}
          <List>
            <ListItem>
              <ListItemAdornment>
                <Circle>
                  <InboxIcon />
                </Circle>
              </ListItemAdornment>
              <ListItemContent sx={{ pl: 1 }}>
                Inbox
                <Typography level="body2">Jan 9, 2014</Typography>
              </ListItemContent>
            </ListItem>
            <ListItemSeparator inset="startContent" />
            <ListItem>
              <ListItemAdornment>
                <Circle>
                  <DraftsIcon fontSize="md" />
                </Circle>
              </ListItemAdornment>
              <ListItemContent sx={{ pl: 1 }}>
                Drafts
                <Typography level="body2">Jan 7, 2014</Typography>
              </ListItemContent>
            </ListItem>
            <ListItemSeparator inset="startContent" />
            <ListItem>
              <ListItemAdornment>
                <Circle>
                  <BeachAccess />
                </Circle>
              </ListItemAdornment>
              <ListItemContent sx={{ pl: 1 }}>
                Vacation
                <Typography level="body2">July 20, 2014</Typography>
              </ListItemContent>
            </ListItem>
          </List>

          {/* ex6 */}
          <List sx={{ '--List-startAdornmentWidth': '56px' }}>
            <ListItem>
              <ListItemAdornment sx={{ alignSelf: 'flex-start' }}>
                <Box
                  component="img"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '40px',
                  }}
                />
              </ListItemAdornment>
              <div>
                <Typography>Brunch this weekend?</Typography>
                <Typography level="body2" sx={{ color: 'var(--joy-palette-text-primary)' }}>
                  Ali Connors{' '}
                  <Typography
                    component="span"
                    level="inherit"
                    sx={{ color: 'var(--joy-palette-text-secondary)' }}
                  >
                    {' '}
                    — I&apos;ll be in your neighborhood doing errands this…
                  </Typography>
                </Typography>
              </div>
            </ListItem>
            <ListItemSeparator inset="startContent" />
            <ListItem>
              <ListItemAdornment sx={{ alignSelf: 'flex-start' }}>
                <Box
                  component="img"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '40px',
                  }}
                />
              </ListItemAdornment>
              <div>
                <Typography>Summer BBQ</Typography>
                <Typography level="body2" sx={{ color: 'var(--joy-palette-text-primary)' }}>
                  to Scott, Alex, Jennifer{' '}
                  <Typography
                    component="span"
                    level="inherit"
                    sx={{ color: 'var(--joy-palette-text-secondary)' }}
                  >
                    {' '}
                    — Wish I could come, but I&apos;m out of town this…
                  </Typography>
                </Typography>
              </div>
            </ListItem>
          </List>

          {/* ex7 */}
          <List component="nav">
            <ListItemButton>
              <ListItemContent>New file</ListItemContent>
              <Typography level="body2">⌘ N</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemContent>Copy</ListItemContent>
              <Typography level="body2">⌘ C</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemContent>Check</ListItemContent>
            </ListItemButton>
            <ListItemSeparator inset="gutter" />
            <ListItemButton>
              <ListItemContent>Delete</ListItemContent>
              <Typography level="body2">⌘ D</Typography>
            </ListItemButton>
          </List>

          {/* ex8 */}
          <List>
            <ListItem>
              <ListItemButton component="a" href="#">
                <ListItemContent>External Link</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <NextLink href="/" passHref>
                <ListItemButton component="a">
                  <ListItemContent>Internal Link</ListItemContent>
                </ListItemButton>
              </NextLink>
            </ListItem>
          </List>

          {/* ex9 */}
          <List
            component="nav"
            sx={{
              '--List-radius': '0px',
              '--List-padding': '0px',
              '--List-itemGutter': '1rem',
              '--List-itemMinHeight': '3rem',
            }}
          >
            <ListItemButton selected color="primary">
              <ListItemAdornment>
                <InboxIcon />
              </ListItemAdornment>
              <ListItemContent>Inbox</ListItemContent>
              <ListItemAdornment end>
                <KeyboardArrowUp />
              </ListItemAdornment>
            </ListItemButton>
            <ListItemButton>
              <ListItemAdornment>
                <Star />
              </ListItemAdornment>
              <ListItemContent>Starred</ListItemContent>
            </ListItemButton>
            <ListItemSeparator component="hr" />
            <ListItemButton>
              <ListItemAdornment>
                <Favorite />
              </ListItemAdornment>
              <ListItemContent>Favorite</ListItemContent>
            </ListItemButton>
          </List>

          {/* ex10 */}
          <List
            component="nav"
            sx={{ '--List-startAdornmentWidth': '56px', '--List-separatorGap': '1rem' }}
          >
            <ListItemButton selected selectedVariant="light" color="primary">
              <ListItemAdornment>
                <Circle color="primary">
                  <InboxIcon />
                </Circle>
              </ListItemAdornment>
              <ListItemContent>
                <Typography>Inbox</Typography>
                <Typography level="body2">Jan 9, 2014</Typography>
              </ListItemContent>
              <Button variant="light" size="sm">
                Clear
              </Button>
            </ListItemButton>
            <ListItemSeparator component="hr" />
            <ListItemButton selected selectedVariant="outlined" color="danger">
              <ListItemAdornment>
                <Circle color="danger">
                  <Star />
                </Circle>
              </ListItemAdornment>
              <ListItemContent>
                <Typography>Starred</Typography>
                <Typography level="body2">Jan 9, 2014</Typography>
              </ListItemContent>
              <Button variant="light" color="danger" size="sm">
                Clear
              </Button>
            </ListItemButton>
            <ListItemSeparator component="hr" />
            <ListItemButton
              selected
              selectedVariant="contained"
              color="success"
              sx={(theme) => theme.variants.containedOverrides.success}
            >
              <ListItemAdornment>
                <Circle color="success">
                  <Favorite />
                </Circle>
              </ListItemAdornment>
              <ListItemContent>
                <Typography>Favorite</Typography>
                <Typography level="body2">Jan 9, 2014</Typography>
              </ListItemContent>
              <Button variant="outlined" color="context" size="sm">
                Clear
              </Button>
            </ListItemButton>
          </List>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
