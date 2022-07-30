import * as React from 'react';
import Script from 'next/script';
import { GlobalStyles, decomposeColor } from '@mui/system';
import {
  CssVarsProvider,
  extendTheme,
  Palette,
  styled,
  useColorScheme,
  useTheme,
} from '@mui/joy/styles';
import type { Theme, ColorPaletteProp, VariantProp, PaletteRange } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input, { InputProps } from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import Switch from '@mui/joy/Switch';
import SvgIcon from '@mui/joy/SvgIcon';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import TextField, { TextFieldProps } from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import RadioGroup from '@mui/joy/RadioGroup';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import CheckIcon from '@mui/icons-material/Check';
import Edit from '@mui/icons-material/Edit';

const studioTheme = extendTheme({
  cssVarPrefix: 'studio',
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--studio-palette-neutral-50)',
        },
      },
    },
  },
});

const usePrettier = () => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const id = setInterval(() => {
      // @ts-ignore
      if (window.prettier && window.prettierPlugins) {
        setLoaded(true);
        clearInterval(id);
      }
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, []);
  return {
    script: (
      <React.Fragment>
        <Script src="https://unpkg.com/prettier@2.7.1/standalone.js" />
        <Script src="https://unpkg.com/prettier@2.7.1/parser-babel.js" />
      </React.Fragment>
    ),
    loaded,
    prettify: (code: string) => {
      if (loaded) {
        // @ts-ignore
        return window.prettier.format(code, {
          parser: 'json',
          // @ts-ignore
          plugins: window.prettierPlugins,
          printWidth: 40,
        });
      }
      return code;
    },
  };
};

const JsonEditor = <T,>({
  value,
  onChange,
  ...props
}: Omit<InputProps, 'value' | 'onChange'> & {
  value: string;
  onChange: (themeNode: T) => void;
}) => {
  const { prettify } = usePrettier();
  const [internalValue, setInternalValue] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const focused = React.useRef(false);
  React.useEffect(() => {
    if (value !== internalValue && !focused.current) {
      setInternalValue(value || '');
    }
  }, [value, internalValue]);
  return (
    <Input
      {...props}
      size="sm"
      error={!!errorMsg}
      value={internalValue}
      onFocus={() => {
        focused.current = true;
      }}
      onBlur={() => {
        focused.current = false;
        setInternalValue((val) => prettify(val));
      }}
      onChange={(event) => {
        const { value: inputValue } = event.target;
        setInternalValue(inputValue);
        try {
          const result = JSON.parse(inputValue);
          setErrorMsg(null);
          onChange(result);
        } catch (error: any) {
          setErrorMsg(error.message);
        }
      }}
      endDecorator={
        errorMsg ? (
          <Typography
            fontSize="sm"
            variant="solid"
            color="danger"
            sx={{
              position: 'absolute',
              top: '0.25rem',
              right: '0.5rem',
              borderRadius: 'xs',
            }}
          >
            {errorMsg}
          </Typography>
        ) : null
      }
      // @ts-ignore
      componentsProps={{ input: { as: 'textarea' } }}
      sx={{
        flexGrow: 1,
        py: 1,
        height: '2000px',
        '& textarea': { height: '100%', resize: 'none', lineHeight: '18px' },
      }}
    />
  );
};

const initialTheme = extendTheme();

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const ModeUpdater = ({ mode }: { mode: 'light' | 'dark' }) => {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);
  return null;
};

const Canvas = ({
  children,
  theme,
  mode,
}: {
  children: React.ReactNode;
  mode: 'light' | 'dark';
  theme?: Theme;
}) => {
  const [node, setNode] = React.useState<HTMLElement | null>(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('canvas'));
  }, []);
  return (
    <Box id="canvas" sx={{ height: '100%' }}>
      <CssVarsProvider
        disableTransitionOnChange
        colorSchemeSelector="#canvas"
        colorSchemeNode={node}
        modeStorageKey="canvas-mode"
        theme={theme}
      >
        <ModeUpdater mode={mode} />
        {children}
      </CssVarsProvider>
    </Box>
  );
};

const filterPalette = (palette: Palette) => {
  const newPalette = {} as typeof palette;
  (Object.keys(palette) as Array<keyof typeof palette>).forEach((key) => {
    if (typeof palette[key] === 'object' && palette) {
      // @ts-ignore
      newPalette[key] = {};
      Object.keys(palette[key]).forEach((nestedKey) => {
        if (
          !key.match(/(primary|neutral|danger|info|success|warning)/) ||
          !nestedKey.match(
            /^(plain|outlined|soft|solid|override|mainChannel|lightChannel|darkChannel)/,
          )
        ) {
          // @ts-ignore
          newPalette[key][nestedKey] = palette[key][nestedKey];
        }
      });
    } else if (key !== 'focusVisible') {
      // @ts-ignore
      newPalette[key] = palette[key];
    }
  });
  return newPalette;
};

const ComponentsGrid = () => {
  const [color, setColor] = React.useState<ColorPaletteProp>('neutral');
  const [variant, setVariant] = React.useState<VariantProp>('outlined');
  const [focusVisible, setFocusVisible] = React.useState(false);
  const props = { variant, color, className: focusVisible ? 'Joy-focusVisible' : '' };
  const components = [
    { name: 'Avatar', element: <Avatar {...props}>AB</Avatar> },
    {
      name: 'Badge',
      element: (
        <Badge badgeContent="99+" {...props}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'background.level3' }} />
        </Badge>
      ),
    },
    {
      name: 'Button',
      element: (
        <Button {...props} endIcon={<KeyboardArrowRight />}>
          Button
        </Button>
      ),
    },
    {
      name: 'Card',
      element: (
        <Card {...props}>
          <Typography level="inherit" fontSize="md" fontWeight="md">
            Yosemite National Park
          </Typography>
          <Typography level="body2" sx={{ mt: 0.5 }}>
            California
          </Typography>
        </Card>
      ),
    },
    {
      name: 'Checkbox',
      element: (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Checkbox
            {...props}
            componentsProps={{ action: { className: focusVisible ? 'Joy-focusVisible' : '' } }}
            checked={false}
            label="unchecked"
          />
          <Checkbox
            {...props}
            componentsProps={{ action: { className: focusVisible ? 'Joy-focusVisible' : '' } }}
            checked
            label="checked"
          />
        </Box>
      ),
    },
    {
      name: 'Chip',
      element: (
        <Chip
          {...props}
          componentsProps={{ action: { className: focusVisible ? 'Joy-focusVisible' : '' } }}
          onClick={() => {}}
          startDecorator={<FavoriteBorder />}
        >
          Light
        </Chip>
      ),
    },
    {
      name: 'IconButton',
      element: (
        <IconButton {...props}>
          <FavoriteBorder />
        </IconButton>
      ),
    },
    {
      name: 'Input',
      element: <Input placeholder="Placeholder" {...props} />,
    },
    {
      name: 'Link',
      element: <Link {...props}>Link</Link>,
    },
    {
      name: 'List',
      element: (
        <List {...props} sx={{ mx: 2, '--List-padding': '4px', '--List-gap': '4px' }}>
          <ListItem {...props}>Item 1</ListItem>
          <ListItem {...props}>Item 2</ListItem>
        </List>
      ),
    },
    {
      name: 'ListItemButton',
      element: (
        <List sx={{ mx: 2 }}>
          <ListItemButton {...props}>Button</ListItemButton>
        </List>
      ),
    },
    {
      name: 'Radio',
      element: (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Radio
            {...props}
            componentsProps={{ action: { className: focusVisible ? 'Joy-focusVisible' : '' } }}
            checked={false}
            label="unchecked"
          />
          <Radio
            {...props}
            componentsProps={{ action: { className: focusVisible ? 'Joy-focusVisible' : '' } }}
            checked
            label="checked"
          />
        </Box>
      ),
    },
    {
      name: 'Switch',
      element: (
        <Switch
          {...props}
          componentsProps={{ action: { className: focusVisible ? 'Joy-focusVisible' : '' } }}
        />
      ),
    },
    {
      name: 'Typography',
      element: <Typography {...props}>Text</Typography>,
    },
  ];
  return (
    <React.Fragment>
      <Box
        data-joy-color-scheme="light"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mt: 2,
          p: 1,
          borderRadius: '4px 4px 0 0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <FormLabel sx={{ mb: 0 }}>Variant: </FormLabel>
          <Select size="sm" value={variant} onChange={(val) => setVariant(val!)}>
            <Option value="plain">plain</Option>
            <Option value="outlined">outlined</Option>
            <Option value="soft">soft</Option>
            <Option value="solid">solid</Option>
          </Select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <FormLabel sx={{ mb: 0 }}>Color:</FormLabel>
          <Select size="sm" value={color} onChange={(val) => setColor(val!)}>
            <Option value="neutral">neutral</Option>
            <Option value="primary">primary</Option>
            <Option value="danger">danger</Option>
            <Option value="info">info</Option>
            <Option value="success">success</Option>
            <Option value="warning">warning</Option>
          </Select>
        </Box>
        <Checkbox
          label="focus-visible"
          checked={focusVisible}
          onChange={(event) => setFocusVisible(event.target.checked)}
          sx={{ ml: 'auto' }}
        />
      </Box>
      <Sheet
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gridAutoRows: 'minmax(120px, auto)',
          borderWidth: '1px 0px 0px 1px',
          borderStyle: 'solid',
          borderColor: 'divider',
          maxHeight: 'calc(100vh - 240px)',
          overflowY: 'auto',
          '& > div': {
            borderWidth: '0 1px 1px 0',
            borderStyle: 'solid',
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            pt: 4,
            pb: 1,
          },
        }}
      >
        {components.map((item) => (
          <div key={item.name}>
            <Chip
              variant="soft"
              color="neutral"
              size="sm"
              sx={{
                position: 'absolute',
                top: '0px',
                left: '0px',
                borderRadius: 0,
                fontSize: 'xs2',
              }}
            >
              {item.name}
            </Chip>
            {item.element}
          </div>
        ))}
      </Sheet>
    </React.Fragment>
  );
};

const PaletteImport = () => {
  return (
    <IconButton
      variant="plain"
      color="neutral"
      sx={{ '--IconButton-size': '18px', borderRadius: 0 }}
    >
      <Edit fontSize="sm" />
    </IconButton>
  );
};

const PaletteInfo = ({ palette }: { palette: Palette }) => {
  const space = <Box sx={{ width: 18, height: 18 }} />;
  const children = [space];
  (Object.keys(palette) as Array<keyof typeof palette>).forEach((key) => {
    const item = palette[key];
    if (typeof item === 'object') {
      if (key.match(/^(primary|neutral|danger|info|success|warning)$/)) {
        children.push(<PaletteImport />);
      } else {
        children.push(space);
      }
      (Object.keys(item) as Array<keyof typeof item>).forEach((nestedKey, index, array) => {
        children.push(
          <Box
            sx={{
              width: 18,
              height: 18,
              bgcolor: item[nestedKey],
              boxShadow: '0 0 0 1px #999',
            }}
          />,
        );
        if (index === array.length - 1) {
          children.push(space);
        }
      });
    }
    if (typeof item === 'string') {
      children.push(
        <Box
          sx={{
            width: 18,
            height: 18,
            bgcolor: item,
            boxShadow: '0 0 0 1px #999',
          }}
        />,
      );
    }
  });
  return (
    <Box
      id="canvas"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        py: 1,
        border: '1px solid transparent',
        '& > *': {
          flexShrink: 0,
        },
      }}
    >
      {React.Children.toArray(children)}
    </Box>
  );
};

export default function Playground() {
  const { script, loaded, prettify } = usePrettier();
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [lightPalette, setLightPalette] = React.useState(
    filterPalette(initialTheme.colorSchemes.light.palette),
  );
  const [darkPalette, setDarkPalette] = React.useState(
    filterPalette(initialTheme.colorSchemes.dark.palette),
  );
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  const setPalette = mode === 'dark' ? setDarkPalette : setLightPalette;
  let extendedTheme: Theme | undefined;
  try {
    extendedTheme = extendTheme({
      colorSchemes: {
        light: {
          palette: lightPalette,
        },
        dark: {
          palette: darkPalette,
        },
      },
    });
    // eslint-disable-next-line no-empty
  } catch (error) {}
  return (
    <CssVarsProvider theme={studioTheme}>
      {script}
      <GlobalStyles
        styles={(t: Theme) => ({
          body: {
            backgroundColor: t.vars.palette.background.body,
            margin: 0,
            fontFamily: t.vars.fontFamily.body,
            fontSize: t.vars.fontSize.md,
          },
          '*': {
            boxSizing: 'border-box',
          },
        })}
      />
      {loaded && (
        <Box sx={{ display: 'flex', height: '100vh' }}>
          <Box
            sx={{
              flex: 1,
              borderRight: '1px solid',
              borderColor: 'divider',
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Box
              sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography fontSize="xl" fontWeight="lg">
                Theme Editor
              </Typography>
              <Select size="sm" value={mode} onChange={(newMode) => setMode(newMode!)}>
                <Option value="light">Light</Option>
                <Option value="dark">Dark</Option>
              </Select>
            </Box>
            <Tabs
              size="sm"
              defaultValue={0}
              sx={{ flexGrow: 1, boxShadow: 'sm', borderRadius: 'xs', p: 2, minHeight: 0 }}
            >
              <TabList>
                <Tab>Palette</Tab>
                <Tab>Focus</Tab>
                <Tab>Font</Tab>
                <Tab>Radius</Tab>
                <Tab>Shadow</Tab>
              </TabList>
              <TabPanel value={0} sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Typography level="body2" mt={1} mb={0.5}>
                  You are editing{' '}
                  <Typography
                    variant={mode === 'dark' ? 'solid' : 'soft'}
                    color="neutral"
                    sx={{ mx: '0.025em', borderRadius: 'xs' }}
                  >
                    {mode}
                  </Typography>{' '}
                  palette.
                </Typography>
                <Box
                  sx={{ flexGrow: 1, display: 'flex', gap: 0.5, overflowY: 'auto', minHeight: 0 }}
                >
                  <PaletteInfo palette={palette} />
                  <JsonEditor value={prettify(JSON.stringify(palette))} onChange={setPalette} />
                </Box>
              </TabPanel>
            </Tabs>
          </Box>
          <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize="xl" fontWeight="lg" mb={1}>
              Preview
            </Typography>
            <Tabs
              size="sm"
              defaultValue={0}
              sx={{ flexGrow: 1, boxShadow: 'sm', borderRadius: 'xs', p: 2 }}
            >
              <TabList>
                <Tab>Components</Tab>
                {/* <Tab>Style guide</Tab> */}
                <Tab>TypeScript</Tab>
              </TabList>
              <Canvas mode={mode} {...(extendedTheme && { theme: extendedTheme })}>
                <TabPanel value={0}>
                  <ComponentsGrid />
                </TabPanel>
              </Canvas>
            </Tabs>
          </Box>
        </Box>
      )}
    </CssVarsProvider>
  );
}
