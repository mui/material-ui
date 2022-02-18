import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { ColorPaletteProp, CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import NextLink from 'next/link';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import ListDivider from '@mui/joy/ListDivider';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BeachAccess from '@mui/icons-material/BeachAccess';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Star from '@mui/icons-material/StarBorder';
import Favorite from '@mui/icons-material/FavoriteBorder';
import DeleteForever from '@mui/icons-material/DeleteForever';
import CommentIcon from '@mui/icons-material/Comment';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';

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

function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {[0, 1, 2, 3].map((value) => (
        <ListItem
          key={value}
          secondaryAction={
            <IconButton aria-label="comments" size="sm">
              <CommentIcon />
            </IconButton>
          }
        >
          <ListItemButton role={undefined} onClick={handleToggle(value)}>
            <ListItemDecorator>
              {checked.indexOf(value) !== -1 ? <CheckBox /> : <CheckBoxOutlineBlank />}
            </ListItemDecorator>
            Line item {value + 1}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

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
            <ListDivider />
            <ListItem>Drafts</ListItem>
            <ListDivider />
            <ListItem>Trash</ListItem>
          </List>

          {/* ex3 */}
          <List>
            <ListItem>
              <ListItemDecorator>
                <InboxIcon fontSize="lg" />
              </ListItemDecorator>
              Inbox
            </ListItem>
            <ListItem>
              <ListItemDecorator />
              Drafts
            </ListItem>
            <ListItem>
              <ListItemDecorator />
              Trash
            </ListItem>
          </List>

          {/* ex4 */}
          <List>
            <ListItem>
              <ListItemButton color="primary">
                <ListItemDecorator>
                  <InboxIcon fontSize="lg" />
                </ListItemDecorator>
                Inbox
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton color="success">
                <ListItemDecorator>
                  <DraftsIcon fontSize="lg" />
                </ListItemDecorator>
                Drafts
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ListItem>Trash</ListItem>
          </List>

          {/* ex5 */}
          <List sx={{ '--List-decorator-width': '3rem' }}>
            <ListItem>
              <ListItemDecorator>
                <Circle>
                  <InboxIcon />
                </Circle>
              </ListItemDecorator>
              <ListItemContent sx={{ pl: 1 }}>
                Inbox
                <Typography level="body2">Jan 9, 2014</Typography>
              </ListItemContent>
            </ListItem>
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemDecorator>
                <Circle>
                  <DraftsIcon fontSize="md" />
                </Circle>
              </ListItemDecorator>
              <ListItemContent sx={{ pl: 1 }}>
                Drafts
                <Typography level="body2">Jan 7, 2014</Typography>
              </ListItemContent>
            </ListItem>
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemDecorator>
                <Circle>
                  <BeachAccess />
                </Circle>
              </ListItemDecorator>
              <ListItemContent sx={{ pl: 1 }}>
                Vacation
                <Typography level="body2">July 20, 2014</Typography>
              </ListItemContent>
            </ListItem>
          </List>

          {/* ex6 */}
          <List sx={{ '--List-decorator-width': '56px' }}>
            <ListItem>
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Box
                  component="img"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '40px',
                  }}
                />
              </ListItemDecorator>
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
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Box
                  component="img"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '40px',
                  }}
                />
              </ListItemDecorator>
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
            <ListItemButton color="primary">
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
            <ListDivider inset="gutter" />
            <ListItemButton disabled>
              <ListItemContent>Delete</ListItemContent>
              <Typography level="body2" sx={{ color: 'inherit' }}>
                ⌘ D
              </Typography>
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
              '--List-gap': '0px',
              '--List-item-paddingX': '1rem',
              '--List-item-minHeight': '3rem',
            }}
          >
            <ListItemButton selected selectedVariant="contained" color="primary">
              <ListItemDecorator>
                <InboxIcon />
              </ListItemDecorator>
              <ListItemContent>Inbox</ListItemContent>
              <KeyboardArrowUp />
            </ListItemButton>
            <ListItemButton color="primary">
              <ListItemDecorator>
                <Star />
              </ListItemDecorator>
              <ListItemContent>Starred</ListItemContent>
            </ListItemButton>
            <ListDivider component="hr" />
            <ListItemButton color="primary">
              <ListItemDecorator>
                <Favorite />
              </ListItemDecorator>
              <ListItemContent>Favorite</ListItemContent>
            </ListItemButton>
          </List>

          {/* ex10 */}
          <List
            component="nav"
            sx={{ '--List-decorator-width': '56px', '--List-divider-gap': '1rem' }}
          >
            <ListItem
              secondaryAction={
                <Button variant="light" size="sm">
                  Clear
                </Button>
              }
            >
              <ListItemButton selected selectedVariant="light">
                <ListItemDecorator>
                  <Circle color="primary">
                    <InboxIcon />
                  </Circle>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Inbox</Typography>
                  <Typography level="body2">Jan 9, 2014</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListDivider component="hr" />
            <ListItem
              secondaryAction={
                <Button variant="light" color="danger" size="sm">
                  Clear
                </Button>
              }
            >
              <ListItemButton selected selectedVariant="outlined" color="danger">
                <ListItemDecorator>
                  <Circle color="danger">
                    <Star />
                  </Circle>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Starred</Typography>
                  <Typography level="body2">Jan 9, 2014</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListDivider component="hr" />
            <ListItem
              secondaryAction={
                <IconButton
                  variant="outlined"
                  color="success"
                  size="sm"
                  sx={{
                    borderColor: 'success.200',
                    color: 'success.100',
                    '&:hover': { bgcolor: 'success.700' },
                  }}
                >
                  <DeleteForever />
                </IconButton>
              }
            >
              <ListItemButton
                selected
                selectedVariant="contained"
                color="success"
                sx={(theme) => theme.variants.containedOverrides.success}
              >
                <ListItemDecorator>
                  <Circle color="success">
                    <Favorite />
                  </Circle>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Favorite</Typography>
                  <Typography level="body2">Jan 9, 2014</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            sx={{
              maxWidth: 360,
              maxHeight: 300,
              overflow: 'auto',
              '& ul': { p: 0 },
              '--List-padding': 0,
              '--List-item-paddingX': '1rem',
            }}
          >
            {[0, 1, 2, 3, 4].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListItem sticky sx={{ pt: '1.5rem' }}>
                    <Typography level="body2">{`I'm sticky ${sectionId}`}</Typography>
                  </ListItem>
                  {[0, 1, 2].map((item) => (
                    <ListItem key={`item-${sectionId}-${item}`}>Item {item}</ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>

          <Box>
            <List size="sm">
              <ListItem>
                <Typography level="body2">Small size</Typography>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star fontSize="lg" />
                </ListItemDecorator>
                <ListItemButton>This is a small list</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star fontSize="lg" />
                </ListItemDecorator>
                <ListItemButton>This is a small list</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star fontSize="lg" />
                </ListItemDecorator>
                <ListItemButton>This is a small list</ListItemButton>
              </ListItem>
            </List>
            <List size="lg" sx={{ mt: 1 }}>
              <ListItem>
                <Typography color="text.secondary">Large size</Typography>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star />
                </ListItemDecorator>
                <ListItemButton>This is a large list</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star />
                </ListItemDecorator>
                <ListItemButton>This is a large list</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star />
                </ListItemDecorator>
                <ListItemButton>This is a large list</ListItemButton>
              </ListItem>
            </List>
          </Box>

          <CheckboxList />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
