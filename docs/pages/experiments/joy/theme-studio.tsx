import * as React from 'react';
import Script from 'next/script';
import { GlobalStyles } from '@mui/system';
import * as mdColors from '@mui/material/colors';
import { CssVarsProvider, extendTheme, Palette, useColorScheme } from '@mui/joy/styles';
import type { Theme, ColorPaletteProp, VariantProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input, { InputProps } from '@mui/joy/Input';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Radio from '@mui/joy/Radio';
import Switch from '@mui/joy/Switch';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import TextField from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Edit from '@mui/icons-material/Edit';
import ColorAutocomplete from 'docs/src/components/_experiments/ColorAutocomplete';
import { getNewPalettes } from 'docs/src/components/_experiments/studioUtils';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const tailwindColors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  zinc: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  lime: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#65a30d',
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },
  sky: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  fuchsia: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
  },
  pink: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  rose: {
    50: '#fff1f2',
    100: '#ffe4e6',
    200: '#fecdd3',
    300: '#fda4af',
    400: '#fb7185',
    500: '#f43f5e',
    600: '#e11d48',
    700: '#be123c',
    800: '#9f1239',
    900: '#881337',
  },
};

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
        <Script src="https://unpkg.com/prettier@2.7.1/parser-typescript.js" />
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
          printWidth: 30,
        });
      }
      return code;
    },
    tsify: (code: string) => {
      if (loaded) {
        // @ts-ignore
        return window.prettier.format(code, {
          parser: 'typescript',
          // @ts-ignore
          plugins: window.prettierPlugins,
          printWidth: 30,
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
        if (errorMsg) {
          try {
            const formattedValue = prettify(internalValue);
            setInternalValue(formattedValue);
            onChange(JSON.parse(formattedValue));
            setErrorMsg(null);
          } catch (error) {
            setErrorMsg((error as Error).message);
          }
        } else {
          setInternalValue((val) => prettify(val));
        }
      }}
      onChange={(event) => {
        const { value: inputValue } = event.target;
        setInternalValue(inputValue);
        try {
          const result = JSON.parse(prettify(inputValue));
          setErrorMsg(null);
          onChange(result);
        } catch (error) {
          setErrorMsg((error as Error).message);
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
              maxWidth: '60%',
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
    <Box className="demo-boundary" id="canvas" sx={{ height: '100%' }}>
      <CssVarsProvider
        disableTransitionOnChange
        attribute="data-canvas-color-scheme"
        colorSchemeSelector=".demo-boundary"
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

const ComponentsGrid = ({ focusVisible }: { focusVisible: boolean }) => {
  const [color, setColor] = React.useState<ColorPaletteProp>('neutral');
  const [variant, setVariant] = React.useState<VariantProp>('outlined');
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
        className="demo-boundary"
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

const PaletteImport = ({ onSelect }: { onSelect: (palette: Record<string, string>) => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  return (
    <React.Fragment>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        }}
        variant="plain"
        color="neutral"
        sx={{ '--IconButton-size': '18px', borderRadius: 0 }}
      >
        <Edit fontSize="sm" />
      </IconButton>
      <Menu
        size="sm"
        component="div"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        placement="right-start"
        onClose={() => setAnchorEl(null)}
        sx={{ maxHeight: 400, overflow: 'auto' }}
      >
        <List size="sm">
          <ListItem sticky sx={{ fontWeight: 'lg' }}>
            Material Design
          </ListItem>
          {Object.entries(mdColors).map(([name, colors]) => {
            if (name === 'common') {
              return <React.Fragment key={name} />;
            }
            const filteredColors: Record<string, string> = {};
            (Object.keys(colors) as Array<keyof typeof colors>).forEach((key) => {
              if (!Number.isNaN(Number(key))) {
                filteredColors[key] = colors[key];
              }
            });
            return (
              <MenuItem
                key={name}
                aria-label={name}
                onClick={() => {
                  setAnchorEl(null);
                  onSelect(filteredColors);
                }}
              >
                {Object.entries(filteredColors).map(([key, value]) => (
                  <Box key={key} sx={{ width: 20, height: 20, bgcolor: value }} />
                ))}
              </MenuItem>
            );
          })}
        </List>
        <List size="sm">
          <ListItem sticky sx={{ fontWeight: 'lg' }}>
            Tailwind CSS
          </ListItem>
          {Object.entries(tailwindColors).map(([name, colors]) => (
            <MenuItem
              key={name}
              aria-label={name}
              onClick={() => {
                setAnchorEl(null);
                onSelect(colors);
              }}
            >
              {Object.entries(colors).map(([key, value]) => (
                <Box key={key} sx={{ width: 20, height: 20, bgcolor: value }} />
              ))}
            </MenuItem>
          ))}
        </List>
      </Menu>
    </React.Fragment>
  );
};

const PaletteInfo = ({
  palette,
  onSelect,
}: {
  palette: Palette;
  onSelect: (key: string, value: Record<string, string>) => void;
}) => {
  const space = <Box sx={{ width: 18, height: 18 }} />;
  const children = [space];
  (Object.keys(palette) as Array<keyof typeof palette>).forEach((key) => {
    const item = palette[key];
    if (typeof item === 'object') {
      if (key.match(/^(primary|neutral|danger|info|success|warning)$/)) {
        children.push(<PaletteImport onSelect={(value) => onSelect(key, value)} />);
      } else {
        children.push(space);
      }
      (Object.keys(item) as Array<keyof typeof item>).forEach((nestedKey, index, array) => {
        children.push(
          <Box
            className="demo-boundary"
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
          className="demo-boundary"
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

const RANGE = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const VARIANTS = ['plain', 'outlined', 'soft', 'solid'] as const;
const STATES = ['', 'Hover', 'Active', 'Disabled'] as const;
const PROPERTIES = ['Bg', 'Color', 'Border'] as const;

const getColorVars = (palette: ColorPaletteProp) => {
  const range: string[] = [];
  RANGE.forEach((r) => {
    range.push(`var(--joy-palette-${palette}-${r})`);
  });
  VARIANTS.forEach((v) => {
    STATES.forEach((s) => {
      PROPERTIES.forEach((p) => {
        range.push(`var(--joy-palette-${palette}-${v}${s}${p})`);
      });
    });
  });
  return range;
};

interface FocusValue {
  outlineOffset: number;
  outlineWidth: number;
  lightOutlineColor: string;
  darkOutlineColor: string;
}

const defaultFocus = {
  outlineOffset: 0,
  outlineWidth: 4,
  lightOutlineColor: 'var(--joy-palette-primary-200)',
  darkOutlineColor: 'var(--joy-palette-primary-500)',
};

const FocusEditor = ({
  mode,
  value,
  onChange,
}: {
  mode: 'light' | 'dark';
  value: FocusValue;
  onChange: (value: FocusValue) => void;
}) => {
  const tokens = React.useMemo(() => [...getColorVars('primary'), ...getColorVars('neutral')], []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
      <ColorAutocomplete
        className="demo-boundary"
        listClassName="demo-boundary"
        minLabelWidth={100}
        label="focus color:"
        onEmptyColor={() => {
          // reset to default
          onChange({ ...value, [`${mode}OutlineColor`]: defaultFocus[`${mode}OutlineColor`] });
        }}
        onValidColor={(colorValue) => {
          onChange({ ...value, [`${mode}OutlineColor`]: colorValue });
        }}
        tokens={tokens}
        value={value[`${mode}OutlineColor`]}
      />
      <ListDivider />
      <TextField
        size="sm"
        label="outline-width:"
        endDecorator={
          <Typography level="inherit" textColor="text.tertiary">
            px
          </Typography>
        }
        type="number"
        value={value.outlineWidth}
        onChange={(event) => onChange({ ...value, outlineWidth: event.target.valueAsNumber })}
        componentsProps={{
          input: {
            componentsProps: {
              input: {
                min: 1,
              },
            },
          },
        }}
        sx={{
          flexDirection: 'row',
          gap: 0.5,
          '& > label': { minWidth: 100, mb: 0, '& + div': { flexGrow: 1, fontSize: 'xs' } },
        }}
      />
      <TextField
        size="sm"
        label="outline-offset:"
        type="number"
        value={value.outlineOffset}
        onChange={(event) => onChange({ ...value, outlineOffset: event.target.valueAsNumber })}
        endDecorator={
          <Typography level="inherit" textColor="text.tertiary">
            px
          </Typography>
        }
        sx={{
          flexDirection: 'row',
          gap: 0.5,
          '& > label': { minWidth: 100, mb: 0, '& + div': { flexGrow: 1, fontSize: 'xs' } },
        }}
      />
    </Box>
  );
};

const ModuleAugmentation = ({ mode, palette }: { mode: 'light' | 'dark'; palette: Palette }) => {
  const { tsify } = usePrettier();
  const newTokens = getNewPalettes(studioTheme.colorSchemes[mode].palette, palette as any);
  const groupByInterface: Record<string, string[]> = {};
  newTokens.forEach((token) => {
    if (groupByInterface[token.parentInterface]) {
      groupByInterface[token.parentInterface].push(token.value);
    } else {
      groupByInterface[token.parentInterface] = [token.value];
    }
  });
  const code = `declare module "@mui/joy/styles" {
    ${Object.entries(groupByInterface).reduce(
      (result, curr) => `${result}\ninterface ${curr[0]} {
  ${curr[1].join('\n')}
}`,
      '',
    )}
  }`;
  return (
    <BrandingProvider>
      <HighlightedCode
        language="javascript"
        code={newTokens.length ? tsify(code) : "You don't have custom tokens."}
      />
    </BrandingProvider>
  );
};

export default function Playground() {
  const { script, loaded, prettify } = usePrettier();
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [focusVisible, setFocusVisible] = React.useState(false);
  const [lightPalette, setLightPalette] = React.useState(
    filterPalette(initialTheme.colorSchemes.light.palette),
  );
  const [darkPalette, setDarkPalette] = React.useState(
    filterPalette(initialTheme.colorSchemes.dark.palette),
  );
  const palette = mode === 'dark' ? darkPalette : lightPalette;
  const setPalette = mode === 'dark' ? setDarkPalette : setLightPalette;
  const [focus, setFocus] = React.useState<FocusValue>(defaultFocus);
  let extendedTheme: Theme | undefined;
  try {
    extendedTheme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            ...lightPalette,
            focusVisible: focus.lightOutlineColor,
          },
        },
        dark: {
          palette: { ...darkPalette, focusVisible: focus.darkOutlineColor },
        },
      },
      focus: {
        default: {
          outlineOffset: focus.outlineOffset,
          outline: `${focus.outlineWidth}px solid var(--joy-palette-focusVisible)`,
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
              flexBasis: '50%',
              flexShrink: 0,
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
              onChange={(event, index) => {
                setFocusVisible(index === 1); // focus tab
              }}
              sx={{ flexGrow: 1, boxShadow: 'sm', borderRadius: 'xs', p: 2, minHeight: 0 }}
            >
              <TabList>
                <Tab>Palette</Tab>
                <Tab>Focus</Tab>
                {/* <Tab>Font</Tab>
                <Tab>Radius</Tab>
                <Tab>Shadow</Tab> */}
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
                  <PaletteInfo
                    palette={palette}
                    onSelect={(key, value) =>
                      setPalette({ ...palette, [key]: { ...palette[key as 'primary'], ...value } })
                    }
                  />
                  <JsonEditor value={prettify(JSON.stringify(palette))} onChange={setPalette} />
                </Box>
              </TabPanel>
              <TabPanel value={1}>
                <FocusEditor mode={mode} value={focus} onChange={setFocus} />
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
                  <ComponentsGrid focusVisible={focusVisible} />
                </TabPanel>
                <TabPanel value={1}>
                  <ModuleAugmentation mode={mode} palette={palette} />
                </TabPanel>
              </Canvas>
            </Tabs>
          </Box>
        </Box>
      )}
    </CssVarsProvider>
  );
}
