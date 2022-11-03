/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, useTheme, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CssBaseline from '@mui/joy/CssBaseline';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import ListDivider from '@mui/joy/ListDivider';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import TabPanel from '@mui/joy/TabPanel';
import Tab from '@mui/joy/Tab';
import Tooltip from '@mui/joy/Tooltip';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import Slider from '@mui/joy/Slider';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import CropFreeIcon from '@mui/icons-material/CropFree';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import iosTheme from './theme';

function ModeToggle() {
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
      id="toggle-mode"
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
}

const TypographySystem = () => {
  const theme = useTheme();
  return (
    <Box>
      {(Object.keys(theme.typography) as Array<keyof typeof theme.typography>).map(
        (level) => (
          <Typography key={level} level={level} textAlign="center">
            {level}
          </Typography>
        ),
      )}
    </Box>
  );
};

// @ts-ignore
const ColorSwatch = ({ name, rawLight, rawDark, cssVar }) => (
  <Box
    sx={{
      '& > div': {
        display: 'flex',
        justifyContent: 'center',
        backgroundImage: (
          theme,
        ) => `linear-gradient(90deg, ${theme.vars.palette.fill.tertiary} 50%, transparent 50%)
                  ,linear-gradient(90deg, transparent 50%, ${theme.vars.palette.fill.tertiary} 50%)
                  ,linear-gradient(90deg, ${theme.vars.palette.fill.tertiary} 50%, transparent 50%)
                  ,linear-gradient(90deg, transparent 50%, ${theme.vars.palette.fill.tertiary} 50%)
                  ,linear-gradient(90deg, ${theme.vars.palette.fill.tertiary} 50%, transparent 50%)
                  ,linear-gradient(90deg, transparent 50%, ${theme.vars.palette.fill.tertiary} 50%)
                  ,linear-gradient(90deg, ${theme.vars.palette.fill.tertiary} 50%, transparent 50%)
                  ,linear-gradient(90deg, transparent 50%, ${theme.vars.palette.fill.tertiary} 50%)`,
        backgroundRepeat: 'repeat-x',
        backgroundSize:
          '20px 10px, 20px 10px, 20px 10px, 20px 10px, 20px 10px, 20px 10px, 20px 10px, 20px 10px',
        backgroundPosition:
          '0 0, 0 10px, 0 20px, 0 30px, 0 40px, 0 50px, 0 60px, 0 70px, 0 80px',
      },
    }}
  >
    <Typography level="footnote" fontWeight="lg" sx={{ mb: 0.5 }}>
      {name}
    </Typography>
    <Sheet
      data-joy-color-scheme="light"
      sx={{ height: '80px', alignItems: 'flex-end' }}
    >
      <Typography
        level="caption1"
        fontWeight="xl"
        noWrap
        sx={{
          top: 0,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {rawLight}
      </Typography>
      <Box
        sx={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `linear-gradient(to bottom, ${cssVar} 50%, transparent 50%)`,
          transform: 'translateY(50%)',
        }}
      />
    </Sheet>
    <Sheet data-joy-color-scheme="dark" sx={{ height: '80px' }}>
      <Typography
        level="caption1"
        fontWeight="xl"
        noWrap
        sx={{
          bottom: 0,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {rawDark}
      </Typography>
      <Box
        sx={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `linear-gradient(to top, ${cssVar} 50%, transparent 50%)`,
          transform: 'translateY(-50%)',
        }}
      />
    </Sheet>
  </Box>
);

const ColorSystem = () => {
  const theme = useTheme();
  const systemColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'mint',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'purple',
    'pink',
    'brown',
    'black',
    'grey',
    'grey2',
    'grey3',
    'grey4',
    'grey5',
    'grey6',
    'white',
    'userAccent',
  ] as const;
  const background = ['primary', 'secondary', 'tertiary'] as const;
  const groupedBackground = ['primary', 'secondary', 'tertiary'] as const;
  const labelColors = ['primary', 'secondary', 'tertiary', 'quarternary'] as const;
  const fills = ['primary', 'secondary', 'tertiary', 'quarternary'] as const;
  const separators = ['opaque', 'nonOpaque'] as const;
  return (
    <Box>
      <Typography level="title3" fontWeight="xl" sx={{ mb: 2 }}>
        System Colors
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}
      >
        {systemColors.map((color) => (
          <ColorSwatch
            key={color}
            name={`system/${color}`}
            rawDark={theme.colorSchemes.dark.palette.system[color]}
            rawLight={theme.colorSchemes.light.palette.system[color]}
            cssVar={theme.vars.palette.system[color]}
          />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Typography level="title3" fontWeight="xl" sx={{ mb: 2 }}>
            System Backgrounds
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            }}
          >
            {background.map((color) => (
              <ColorSwatch
                key={color}
                name={`background/${color}`}
                rawDark={theme.colorSchemes.dark.palette.background[color]}
                rawLight={theme.colorSchemes.light.palette.background[color]}
                cssVar={theme.vars.palette.background[color]}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography level="title3" fontWeight="xl" sx={{ mb: 2 }}>
            System Grouped Backgrounds
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            }}
          >
            {groupedBackground.map((color) => (
              <ColorSwatch
                key={color}
                name={`groupedBackground/${color}`}
                rawDark={theme.colorSchemes.dark.palette.groupedBackground[color]}
                rawLight={theme.colorSchemes.light.palette.groupedBackground[color]}
                cssVar={theme.vars.palette.groupedBackground[color]}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography level="title3" fontWeight="xl" sx={{ mb: 2 }}>
        Label Colors
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}
      >
        {labelColors.map((color) => (
          <ColorSwatch
            key={color}
            name={`label/${color}`}
            rawDark={theme.colorSchemes.dark.palette.label[color]}
            rawLight={theme.colorSchemes.light.palette.label[color]}
            cssVar={theme.vars.palette.label[color]}
          />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography level="title3" fontWeight="xl" sx={{ mb: 2 }}>
        Fill Colors
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}
      >
        {fills.map((color) => (
          <ColorSwatch
            key={color}
            name={`fill/${color}`}
            rawDark={theme.colorSchemes.dark.palette.fill[color]}
            rawLight={theme.colorSchemes.light.palette.fill[color]}
            cssVar={theme.vars.palette.fill[color]}
          />
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography level="title3" fontWeight="xl" sx={{ mb: 2 }}>
        Separator Colors
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}
      >
        {separators.map((color) => (
          <ColorSwatch
            key={color}
            name={`separator/${color}`}
            rawDark={theme.colorSchemes.dark.palette.separator[color]}
            rawLight={theme.colorSchemes.light.palette.separator[color]}
            cssVar={theme.vars.palette.separator[color]}
          />
        ))}
      </Box>
    </Box>
  );
};

export default function IosExample() {
  const [disableTheme, setDisableTheme] = React.useState(false);
  return (
    <CssVarsProvider
      disableTransitionOnChange
      theme={disableTheme ? undefined : iosTheme}
    >
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Tabs defaultValue={0} sx={{ bgcolor: 'transparent' }}>
          <Sheet
            sx={{
              m: -2,
              mb: 2,
              p: 2,
              boxShadow:
                '0 0 0 0.5px rgba(0 0 0 / .04), 0 3px 8px 0px rgba(0 0 0 / .15), 0 3px 1px 0 rgba(0 0 0 / .06)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Tooltip
              size="sm"
              title={disableTheme ? 'Enable iOS theme' : 'use default theme'}
              placement="bottom-start"
            >
              <IconButton
                color="neutral"
                variant="outlined"
                onClick={() => setDisableTheme(!disableTheme)}
              >
                {disableTheme ? (
                  <VisibilityRoundedIcon />
                ) : (
                  <VisibilityOffRoundedIcon />
                )}
              </IconButton>
            </Tooltip>
            <TabList sx={{ mx: 'auto', width: 'max-content' }}>
              <Tab>UI Components - iPhone</Tab>
              <Tab>Colors</Tab>
              <Tab>Text Styles</Tab>
            </TabList>
            <ModeToggle />
          </Sheet>
          <TabPanel value={0}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(393px, 1fr))',
                gap: 2,
                alignItems: 'flex-start',
              }}
            >
              <Sheet sx={{ display: 'flex', alignItems: 'center', pt: '54px' }}>
                <Box sx={{ width: 0, whiteSpace: 'nowrap' }}>
                  <Link
                    component="button"
                    color="primary"
                    startDecorator={<KeyboardArrowLeftRounded fontSize="xl3" />}
                    underline="none"
                  >
                    Parent Title
                  </Link>
                </Box>
                <Typography level="headline" sx={{ mx: 'auto' }}>
                  Title
                </Typography>
                <Box sx={{ width: 0, writingMode: 'tb-rl' }}>
                  <IconButton color="primary" variant="plain">
                    <AddRoundedIcon fontSize="xl2" />
                  </IconButton>
                </Box>
              </Sheet>

              <Sheet sx={{ display: 'flex', alignItems: 'center', pt: '54px' }}>
                <Box sx={{ width: 0, whiteSpace: 'nowrap' }}>
                  <Button
                    variant="plain"
                    color="primary"
                    sx={{ typography: 'body' }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Typography level="headline" sx={{ mx: 'auto' }}>
                  Title
                </Typography>
                <Box sx={{ width: 0, writingMode: 'tb-rl' }}>
                  <Button
                    variant="plain"
                    color="primary"
                    sx={{ typography: 'body' }}
                  >
                    Done
                  </Button>
                </Box>
              </Sheet>

              <Sheet sx={{ pt: '54px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Link
                    component="button"
                    startDecorator={<KeyboardArrowLeftRounded fontSize="xl3" />}
                    underline="none"
                  >
                    Parent Title
                  </Link>
                  <IconButton>
                    <CropFreeIcon fontSize="xl2" />
                  </IconButton>
                </Box>
                <Typography
                  level="largeTitle"
                  fontWeight="xl"
                  sx={{ mx: 2, my: 0.5 }}
                >
                  Large Title
                </Typography>
              </Sheet>

              <Sheet sx={{ px: 2, py: 0.75 }}>
                <FormControl orientation="horizontal">
                  <FormLabel sx={{ flexGrow: 1 }}>Title</FormLabel>
                  <Switch />
                </FormControl>
              </Sheet>

              <Sheet sx={{ px: 2, py: 0.75 }}>
                <Slider defaultValue={30} />
              </Sheet>

              <Sheet sx={{ px: 2, py: 0.75 }}>
                <LinearProgress sx={{ mb: 1 }} />
                <LinearProgress determinate value={50} />
              </Sheet>

              <Sheet sx={{ px: 2, py: 0.75 }}>
                <FormControl orientation="horizontal">
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Placeholder Value"
                    endDecorator={
                      <IconButton color="neutral">
                        <CancelRoundedIcon />
                      </IconButton>
                    }
                    sx={{ flex: 1, ml: '52px' }}
                  />
                </FormControl>
              </Sheet>

              <Sheet sx={{ px: 2, py: 1.5 }}>
                <Tabs defaultValue={0}>
                  <TabList>
                    <Tab>Label</Tab>
                    <Tab>Label</Tab>
                    <Tab>Label</Tab>
                  </TabList>
                </Tabs>
              </Sheet>

              <Sheet
                sx={{
                  px: 2,
                  py: 1.25,
                  display: 'flex',
                  justifyContent: 'space-betwen',
                  alignItems: 'center',
                }}
              >
                <Typography>Title</Typography>
                <List
                  row
                  sx={{
                    flex: 0,
                    ml: 'auto',
                    bgcolor: 'fill.tertiary',
                    '--List-item-minHeight': '29px',
                    '--List-radius': '7.92px',
                    '--List-padding': '0px',
                  }}
                >
                  <ListItemButton>
                    <RemoveRoundedIcon />
                  </ListItemButton>
                  <ListDivider sx={{ borderRadius: '1px', my: 1 }} />
                  <ListItemButton>
                    <AddRoundedIcon />
                  </ListItemButton>
                </List>
              </Sheet>
            </Box>
          </TabPanel>
          <TabPanel value={1}>{!disableTheme && <ColorSystem />}</TabPanel>
          <TabPanel value={2}>{!disableTheme && <TypographySystem />}</TabPanel>
        </Tabs>
      </Box>
    </CssVarsProvider>
  );
}
