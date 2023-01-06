import * as React from 'react';
// @ts-ignore
import { JavaScript as JavaScriptIcon, TypeScript as TypeScriptIcon } from '@mui/docs';
// @ts-ignore
import LZString from 'lz-string';
import * as mdColors from '@mui/material/colors';
import { decomposeColor } from '@mui/system';
import { CssVarsProvider, Palette, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input, { InputProps } from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemButton from '@mui/joy/ListItemButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import Close from '@mui/icons-material/Close';
import Check from '@mui/icons-material/Check';
import Search from '@mui/icons-material/Search';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import BrandingProvider from 'docs/src/BrandingProvider';
import codeSandbox from 'docs/src/modules/sandbox/CodeSandbox';
import extractTemplates from 'docs/src/modules/utils/extractTemplates';

function compress(object: any) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function addHiddenInput(form: any, name: string, value: any) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

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

const defaultTheme = extendTheme();

const augmentPalette = (palette: any = {}, prop: keyof Palette) => {
  const result: string[] = [];
  Object.keys(palette[prop] || []).forEach((k) => {
    if (
      !Object.keys(defaultTheme.colorSchemes.light.palette[prop]).includes(k) &&
      !k.startsWith('plain') &&
      !k.startsWith('outlined') &&
      !k.startsWith('soft') &&
      !k.startsWith('solid')
    ) {
      result.push(`${k}: string;`);
    }
  });
  return result.join('\n');
};

const prependSpace = (text: string, space = 0) => {
  const lines = text.split('\n').map((line) => `${[...Array(space).fill(' ')].join('')}${line}`);
  return lines.join('\n');
};

const renderInterface = (name: string, text: string) => {
  if (!text || !text.trim()) {
    return '';
  }
  return `interface ${name} {
${text}  
  }`;
};

const generateThemeAugmentation = (data: any) => `
declare module '@mui/joy/styles' {
  ${[
    renderInterface(
      'PalettePrimary',
      prependSpace(augmentPalette(data?.colorSchemes?.light?.palette, 'primary'), 4),
    ),
    renderInterface(
      `PaletteNeutral`,
      prependSpace(augmentPalette(data?.colorSchemes?.light?.palette, 'neutral'), 4),
    ),
    renderInterface(
      'PaletteDanger',
      prependSpace(augmentPalette(data?.colorSchemes?.light?.palette, 'danger'), 4),
    ),
    renderInterface(
      'PaletteInfo',
      prependSpace(augmentPalette(data?.colorSchemes?.light?.palette, 'info'), 4),
    ),
    renderInterface(
      'PaletteSuccess',
      prependSpace(augmentPalette(data?.colorSchemes?.light?.palette, 'success'), 4),
    ),
    renderInterface(
      'PaletteWarning',
      prependSpace(augmentPalette(data?.colorSchemes?.light?.palette, 'warning'), 4),
    ),
    renderInterface(
      'PaletteText',
      prependSpace(augmentPalette(data?.colorSchemes?.light?.palette, 'text'), 4),
    ),
    renderInterface(
      'PaletteBackground',
      prependSpace(augmentPalette(data?.colorSchemes?.light?.palette, 'background'), 4),
    ),
  ]
    .filter((text) => !!text)
    .join('\n')}
}
`;

const generateThemeCode = (data: any) =>
  `
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme(${JSON.stringify(
    data,
    (k, v) => (v === undefined ? '__undefined' : v),
    2,
  ).replace(/"__undefined"/g, 'undefined')})
  
export default theme;`;

const CodeBlockResult = ({ data, onClose }: { data: any; onClose: () => void }) => {
  const [lang, setLang] = React.useState('js');
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: '16px 16px 0 0',
        '& pre': { maxHeight: 'initial', minHeight: 450, borderRadius: 0, margin: 0 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tabs
          value={lang}
          onChange={(event, newValue) => setLang(newValue as string)}
          sx={{ bgcolor: 'transparent' }}
        >
          <TabList
            variant="plain"
            size="sm"
            sx={{
              flexGrow: 0,
              '--List-radius': '0px',
              '--List-padding': '0px',
              '--List-gap': '0px',
              '--List-item-minHeight': '48px',
              '--List-item-paddingX': '16px',
              [`& .${tabClasses.root}`]: {
                bgcolor: 'transparent',
                color: 'text.tertiary',
                flexGrow: 0,
                '&:hover, &:active': {
                  bgcolor: 'transparent',
                },
              },
              [`& .${tabClasses.selected}`]: {
                boxShadow: 'none',
                fontWeight: 'lg',
                color: 'text.primary',
                '&::after': {
                  content: '""',
                  display: 'block',
                  height: 3,
                  bgcolor: 'primary.500',
                  position: 'absolute',
                  insetInline: 0,
                  bottom: 0,
                },
              },
            }}
          >
            <Tab value="js">
              <ListItemDecorator>
                <DescriptionOutlinedIcon />
              </ListItemDecorator>
              theme.js
            </Tab>
            <Tab
              value="ts"
              sx={{ [`&.${tabClasses.selected}`]: { '--List-decorator-color': '#007acc' } }}
            >
              <ListItemDecorator>
                <TypeScriptIcon />
              </ListItemDecorator>
              theme.d.ts
            </Tab>
          </TabList>
        </Tabs>
        <IconButton
          size="sm"
          variant="soft"
          color="neutral"
          onClick={onClose}
          sx={{ ml: 'auto', mr: 1, borderRadius: '50%' }}
        >
          <Close />
        </IconButton>
      </Box>
      <BrandingProvider mode="dark">
        <HighlightedCode
          language={lang}
          code={lang === 'ts' ? generateThemeAugmentation(data) : generateThemeCode(data)}
        />
      </BrandingProvider>
    </Sheet>
  );
};

const ColorInput = ({
  value = '',
  onValidColor,
  onEmptyColor,
  ...props
}: InputProps & {
  onValidColor: (color: string) => void;
  onEmptyColor: () => void;
  value: string;
}) => {
  const [internalValue, setInternalValue] = React.useState(value);
  const [isError, setIsError] = React.useState(false);
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
      error={isError}
      endDecorator={
        !isError ? (
          <Sheet
            variant="outlined"
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              mr: -0.5,
              bgcolor: internalValue || props.placeholder,
            }}
          />
        ) : null
      }
      value={internalValue}
      onFocus={(event) => {
        (event.target as HTMLInputElement).select();
        focused.current = true;
      }}
      onBlur={() => {
        focused.current = false;
      }}
      onChange={(event) => {
        const { value: inputValue } = event.target;
        setInternalValue(inputValue);
        if (inputValue === '') {
          onEmptyColor();
          setIsError(false);
        } else {
          try {
            decomposeColor(inputValue); // if inputValue is not a valid color, it throws an error
            onValidColor(inputValue);
            setIsError(false);
          } catch (error) {
            console.log('error', error);
            setIsError(true);
          }
        }
      }}
    />
  );
};

const PaletteImport = ({ onSelect }: { onSelect: (palette: Record<string, string>) => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  return (
    <React.Fragment>
      <Link
        level="body2"
        component="button"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        }}
        variant="soft"
        color="neutral"
        startDecorator={<Search />}
      >
        Browse
      </Link>
      <Menu
        size="sm"
        component="div"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        placement="bottom-start"
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

const ColorTokenCreator = ({ onChange }: { onChange: (name: string, value: string) => void }) => {
  const [open, setOpen] = React.useState(false);
  const nameRef = React.useRef<HTMLInputElement | null>(null);
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState('');
  if (!open) {
    return (
      <Button
        size="sm"
        variant="soft"
        color="neutral"
        startDecorator={<Add />}
        sx={{ my: 1 }}
        onClick={() => {
          setOpen(true);
          nameRef.current?.focus();
        }}
      >
        Add token
      </Button>
    );
  }
  return (
    <Sheet
      variant="soft"
      color="neutral"
      sx={{ borderRadius: 'sm', my: 1, p: 1, display: 'flex', gap: 1, alignItems: 'center' }}
    >
      <Input
        size="sm"
        placeholder="token"
        slotProps={{
          input: { ref: nameRef },
        }}
        sx={{ width: 64 }}
        onChange={(event) => setName(event.target.value)}
      />{' '}
      <b>:</b>{' '}
      <Input
        size="sm"
        placeholder="Type a valid CSS color"
        value={color}
        onChange={(event) => setColor(event.target.value)}
      />
      <IconButton
        variant="solid"
        color="neutral"
        size="sm"
        onClick={() => {
          if (!name) {
            nameRef.current?.focus();
          } else {
            onChange(name, color);
            setOpen(false);
          }
        }}
      >
        <Check />
      </IconButton>
    </Sheet>
  );
};

const ColorPaletteForm = ({
  themeDefaultValue = {},
  value = {},
  onChange,
}: {
  themeDefaultValue: any;
  value: any;
  onChange: (newValue: any) => void;
}) => {
  const mergedValue = { ...themeDefaultValue, ...value };
  const primitives = Object.keys(mergedValue)
    .filter((k) => !k.match(/Channel$/) && !k.match(/^(plain|outlined|soft|solid)/))
    .filter((k) => mergedValue[k] !== undefined);
  return (
    <Box sx={{ flex: 1, px: 3, py: 2, maxWidth: 343 }}>
      <Typography
        fontWeight="lg"
        mb={1}
        endDecorator={
          <PaletteImport
            onSelect={(tokens) => {
              onChange({ ...value, ...tokens });
            }}
          />
        }
        sx={{ justifyContent: 'space-between' }}
      >
        Primitive tokens
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'min-content min-content 1fr',
          alignItems: 'center',
          gap: '6px 12px',
          '& > div': {
            display: 'contents',
            '--FormLabel-alignSelf': 'center',
            '--FormLabel-margin': '0px',
          },
        }}
      >
        {primitives.map((item) => (
          <FormControl key={item} size="sm">
            <IconButton
              tabIndex={-1}
              variant="outlined"
              color="danger"
              size="sm"
              sx={{ borderRadius: '50%', '--IconButton-size': '24px' }}
              onClick={() => {
                onChange({ ...value, [item]: undefined });
              }}
            >
              <Remove />
            </IconButton>
            <FormLabel>{item}:</FormLabel>
            <ColorInput
              value={value[item] ?? ''}
              placeholder={themeDefaultValue[item]}
              onEmptyColor={() => {
                const newValue = { ...value };
                delete newValue[item];
                onChange(newValue);
              }}
              onValidColor={(color) => {
                onChange({ ...value, [item]: color });
              }}
            />
          </FormControl>
        ))}
      </Box>
      <ColorTokenCreator
        onChange={(name, color) => {
          onChange({ ...value, [name]: color });
        }}
      />

      {/* <Typography fontWeight="lg" mb={1} mt={5}>
        Global variant tokens
      </Typography>

      <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
        Solid variant
      </Typography>
      <Sheet
        sx={{
          bgcolor: 'background.level1',
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button variant="solid" color="primary" sx={{ minWidth: 120 }}>
          solid
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Checkbox
            size="sm"
            label=":hover"
            slotProps={{
              checkbox: (ownerState) => ({
                sx: { bgcolor: !ownerState.checked ? 'background.surface' : null },
              }),
            }}
          />
          <Checkbox
            size="sm"
            label=":active"
            slotProps={{
              checkbox: (ownerState) => ({
                sx: { bgcolor: !ownerState.checked ? 'background.surface' : null },
              }),
            }}
          />
          <Checkbox
            size="sm"
            label=":focus-visible"
            slotProps={{
              checkbox: (ownerState) => ({
                sx: { bgcolor: !ownerState.checked ? 'background.surface' : null },
              }),
            }}
          />
        </Box>
      </Sheet>
      <Box
        sx={{
          my: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, max-content)',
          alignItems: 'center',
          gap: '6px 12px',
          '& > div': {
            display: 'contents',
            '--FormLabel-alignSelf': 'center',
            '--FormLabel-margin': '0px',
          },
        }}
      >
        {['solidBg', 'outlinedActiveBorder'].map((item) => (
          <FormControl key={item} size="sm">
            <IconButton
              tabIndex={-1}
              variant="outlined"
              color="danger"
              size="sm"
              sx={{ borderRadius: '50%', '--IconButton-size': '24px' }}
            >
              <Remove />
            </IconButton>
            <FormLabel>{item}:</FormLabel>
            <Input
              placeholder="#F4FAFF"
              endDecorator={
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: `primary.${item}`,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
              }
            />
          </FormControl>
        ))}
      </Box>
      <Button size="sm" variant="soft" color="neutral" startDecorator={<Add />} sx={{ my: 1 }}>
        Add token
      </Button> */}
    </Box>
  );
};

export default function JoyThemeBuilder() {
  const [showCode, setShowCode] = React.useState(false);
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>('light');
  const [lightPalette, setLightPalette] = React.useState<Record<string, any>>({});
  const [darkPalette, setDarkPalette] = React.useState<Record<string, any>>({});
  const [selectedPalette, setSelectedPalette] = React.useState('primary');
  const theme = React.useMemo(
    () =>
      extendTheme({
        colorSchemes: {
          light: {
            palette: lightPalette,
          },
          dark: {
            palette: darkPalette,
          },
        },
      }),
    [lightPalette, darkPalette],
  );
  const data = {
    colorSchemes: {
      light: {
        palette: lightPalette,
      },
      dark: {
        palette: darkPalette,
      },
    },
  };
  return (
    <CssVarsProvider theme={theme}>
      {showCode && <CodeBlockResult data={data} onClose={() => setShowCode(false)} />}
      {!showCode && (
        <Box
          sx={{
            p: 1,
            border: '1px solid',
            borderBottomWidth: 0,
            borderColor: 'divider',
            display: 'flex',
            gap: 1,
            borderRadius: '16px 16px 0 0',
          }}
        >
          <Tabs
            size="sm"
            value={colorMode}
            onChange={(event, newValue) => setColorMode(newValue as 'light' | 'dark')}
          >
            <TabList>
              <Tab value="light">
                <ListItemDecorator>
                  <LightMode />
                </ListItemDecorator>{' '}
                Light
              </Tab>
              <Tab value="dark">
                <ListItemDecorator>
                  <DarkMode />
                </ListItemDecorator>{' '}
                Dark
              </Tab>
            </TabList>
          </Tabs>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            startDecorator="🚀"
            sx={{ ml: 'auto' }}
            onClick={() => setShowCode(true)}
          >
            Show me the code
          </Button>
          <Button
            variant="solid"
            color="neutral"
            startDecorator={
              <SvgIcon viewBox="0 0 1080 1080">
                <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
              </SvgIcon>
            }
            onClick={() => {
              const { result } = extractTemplates({
                './result/App.tsx': `import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CssBaseline from "@mui/joy/CssBaseline";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import Link from "@mui/joy/Link";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import theme from "./theme";

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="outlined" color="primary" />;
  }
  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  );
};

export default function App() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <Card
        size="lg"
        variant="solid"
        color="primary"
        invertedColors
        sx={{
          borderRadius: "sm",
          m: 1,
          fontSize: "lg",
          background: (theme) =>
            \`linear-gradient(-10deg, \${theme.vars.palette.primary[900]} -10%, \${theme.vars.palette.primary[700]}, \${theme.vars.palette.primary[500]} 70%, \${theme.vars.palette.primary[400]})\`
        }}
      >
        <Box sx={{ position: "absolute", top: "1.5rem", right: "1.5rem" }}>
          <ColorSchemeToggle />
        </Box>
        <Typography level="h1" fontWeight="xl" sx={{ mt: -1 }}>
          Joy UI
        </Typography>
        <Typography sx={{ mt: 0.5 }}>
          Hand-crafted React components with fresh design. Focus on developer
          experience and customizability.
        </Typography>
        <Divider sx={{ mt: 2 }} />
        <List sx={{ mx: -1 }}>
          <ListSubheader>documentation</ListSubheader>
          <ListItem>
            <ListItemButton
              component="a"
              href="https://mui.com/joy-ui/main-features/global-variants/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Main features &nbsp; <span role="img">↗</span>️
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              component="a"
              href="https://mui.com/joy-ui/react-autocomplete/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse components &nbsp; <span role="img">↗</span>️
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              component="a"
              href="https://mui.com/joy-ui/customization/approaches/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Check out theming and customization &nbsp;{" "}
              <span role="img">↗</span>️
            </ListItemButton>
          </ListItem>
        </List>
      </Card>
      <Typography textAlign="center" level="body2">
        Developed by{" "}
        <Link
          underline="always"
          href="https://mui.com/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          MUI
        </Link>{" "}
        team.
      </Typography>
    </CssVarsProvider>
  );
}
            `,
                './result/theme.ts': generateThemeCode(data),
                './result/themeAugmentation.ts': generateThemeAugmentation(data),
              });
              const { files } = codeSandbox.createJoyTemplate({
                ...result,
                githubLocation: '',
                title: `Joy UI - Custom theme`,
                codeVariant: 'TS',
              });
              const parameters = compress({ files });

              // ref: https://codesandbox.io/docs/api/#define-api
              const form = document.createElement('form');
              form.method = 'POST';
              form.target = '_blank';
              form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
              addHiddenInput(form, 'parameters', parameters);
              addHiddenInput(form, 'query', 'file=/App.tsx');
              document.body.appendChild(form);
              form.submit();
              document.body.removeChild(form);
            }}
          >
            Open sandbox
          </Button>
        </Box>
      )}
      {!showCode && (
        <Sheet data-joy-color-scheme={colorMode} variant="outlined" sx={{ display: 'flex' }}>
          <List
            sx={{
              flexBasis: 256,
              flexGrow: 0,
              '--List-divider-gap': '0px',
              '--List-item-minHeight': '56px',
            }}
          >
            <ListSubheader sx={{ minHeight: 40 }}>Palette</ListSubheader>
            {(['primary', 'neutral', 'danger', 'info', 'success', 'warning'] as const).map(
              (colorProp) => (
                <React.Fragment key={colorProp}>
                  <ListItem>
                    <ListItemButton
                      {...(colorProp === selectedPalette && {
                        variant: 'soft',
                        selected: true,
                        color: colorProp,
                      })}
                      onClick={() => setSelectedPalette(colorProp)}
                    >
                      <ListItemDecorator>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: `${colorProp}.500`,
                          }}
                        />
                      </ListItemDecorator>
                      <ListItemContent>{colorProp}</ListItemContent>
                      <KeyboardArrowRight />
                    </ListItemButton>
                  </ListItem>
                  <ListDivider />
                </React.Fragment>
              ),
            )}
            {/* <ListDivider />
            <ListItem>
              <ListItemButton>
                <ListItemContent>text, background, etc.</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ListItem>
              <ListItemButton>
                <ListItemDecorator sx={{ minWidth: 28 }}>
                  <Add />
                </ListItemDecorator>
                <ListItemContent>New palette</ListItemContent>
              </ListItemButton>
            </ListItem> */}
          </List>
          <Divider orientation="vertical" />
          <ColorPaletteForm
            themeDefaultValue={defaultTheme.colorSchemes[colorMode].palette.primary}
            value={{ light: lightPalette, dark: darkPalette }[colorMode][selectedPalette]}
            onChange={(newValue) => {
              const setter = { light: setLightPalette, dark: setDarkPalette }[colorMode];
              setter((prev) => ({ ...prev, [selectedPalette]: newValue }));
            }}
          />
        </Sheet>
      )}
    </CssVarsProvider>
  );
}
