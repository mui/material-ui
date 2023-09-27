import * as React from 'react';
import dynamic from 'next/dynamic';
import colors from '@mui/joy/colors';
import defaultTheme from '@mui/joy/styles/defaultTheme';
import { CssVarsThemeOptions, CssVarsProvider, THEME_ID, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Option from '@mui/joy/Option';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio, { radioClasses } from '@mui/joy/Radio';
import ToggleButtonGroup, { ToggleButtonGroupStaticProps } from '@mui/joy/ToggleButtonGroup';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Select, { SelectStaticProps } from '@mui/joy/Select';
import SvgIcon from '@mui/joy/SvgIcon';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { unstable_capitalize as capitalize } from '@mui/utils';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadlineOutlined';
import TableRowsIcon from '@mui/icons-material/TableRowsOutlined';
import ViewStreamIcon from '@mui/icons-material/ViewStreamOutlined';

const SCALE = { xs: 'scale(1)', md: 'scale(0.84)' };

function Placeholder() {
  return (
    <Box
      sx={{
        transform: SCALE,
        overflow: 'hidden',
        position: 'relative',
        transformOrigin: 'top left',
        height: 1080,
      }}
    />
  );
}

const OrderDashboardApp = dynamic(
  () => import('docs/data/joy/getting-started/templates/order-dashboard/App'),
  {
    ssr: false,
    loading: Placeholder,
  },
);

const ProfileDashboardApp = dynamic(
  () => import('docs/data/joy/getting-started/templates/profile-dashboard/App'),
  {
    ssr: false,
    loading: Placeholder,
  },
);

const MessagesApp = dynamic(() => import('docs/data/joy/getting-started/templates/messages/App'), {
  ssr: false,
  loading: Placeholder,
});

const SignInApp = dynamic(
  () => import('docs/data/joy/getting-started/templates/sign-in-side/App'),
  {
    ssr: false,
    loading: Placeholder,
  },
);

const tailwindColors = {
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

const tailwindNeutrals = {
  default: colors.grey,
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
} as const;

const joyColors = {
  default: colors.blue,
  ...tailwindColors,
} as const;

const radiusOptions = {
  sharp: {
    xs: '0px',
    sm: '0px',
    md: '0px',
    lg: '0px',
    xl: '0px',
  },
  smooth: {
    xs: '3px',
    sm: '5px',
    md: '7px',
    lg: '11px',
    xl: '15px',
  },
  round: {
    xs: '18px',
    sm: '20px',
    md: '23px',
    lg: '26px',
    xl: '30px',
  },
};

const familyOptions = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Noto Sans JP',
  'Montserrat',
  'Lato',
  'Poppins',
  'Oswald',
  'Raleway',
  'Noto Sans',
];

function randomValue<T>(array: Array<T>) {
  return array[Math.floor(Math.random() * array.length)];
}

function PalettePreview({ range }: { range: Record<string | number, string> }) {
  return Object.entries(range).map(([key, value]) => (
    <Box
      key={key}
      sx={{
        mr: -1,
        width: 16,
        height: 16,
        borderRadius: '50%',
        bgcolor: value,
      }}
    />
  ));
}

function usePrimarySelector() {
  const [primary, setPrimary] = React.useState<keyof typeof joyColors | 'default'>('default');
  return {
    primary,
    setPrimary,
    randomValue: () =>
      setPrimary(randomValue(Object.keys(joyColors) as Array<keyof typeof joyColors>)),
    renderSelector: (props?: SelectStaticProps) => (
      <Select
        size="sm"
        placeholder="primary"
        value={primary}
        onChange={(event, newValue) => setPrimary(newValue as keyof typeof joyColors)}
        renderValue={(selectedOption) => (
          <React.Fragment>
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: primary === 'default' ? colors.blue[500] : joyColors[primary][500],
                mr: 1,
              }}
            />
            {selectedOption?.value}
          </React.Fragment>
        )}
        {...props}
        sx={{ minWidth: { xs: 'auto', sm: 140 } }}
      >
        {(Object.keys(joyColors) as Array<keyof typeof joyColors>).map((color) => (
          <Option key={color} value={color}>
            <PalettePreview range={joyColors[color]} />
            <Typography level="body-sm" textColor="text.primary" sx={{ ml: 2 }}>
              {capitalize(color)}
            </Typography>
          </Option>
        ))}
      </Select>
    ),
  };
}

function useNeutralSelector() {
  const [neutral, setNeutral] = React.useState<keyof typeof tailwindNeutrals | 'default'>(
    'default',
  );
  return {
    neutral,
    setNeutral,
    randomValue: () =>
      setNeutral(
        randomValue(Object.keys(tailwindNeutrals) as Array<keyof typeof tailwindNeutrals>),
      ),
    renderSelector: (props?: SelectStaticProps) => (
      <Select
        size="sm"
        placeholder="neutral"
        value={neutral}
        onChange={(event, newValue) => setNeutral(newValue as keyof typeof tailwindNeutrals)}
        renderValue={(selectedOption) => (
          <React.Fragment>
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: neutral === 'default' ? colors.grey[500] : tailwindNeutrals[neutral][500],
                mr: 1,
              }}
            />
            {selectedOption?.value}
          </React.Fragment>
        )}
        {...props}
        sx={{ minWidth: { xs: 'auto', sm: 140 } }}
      >
        {(Object.keys(tailwindNeutrals) as Array<keyof typeof tailwindNeutrals>).map((color) => (
          <Option key={color} value={color}>
            <PalettePreview range={tailwindNeutrals[color]} />
            <Typography level="body-sm" textColor="text.primary" sx={{ ml: 2 }}>
              {capitalize(color)}
            </Typography>
          </Option>
        ))}
      </Select>
    ),
  };
}

function useBgSwap() {
  const [bgSwap, setBgSwap] = React.useState(false);
  return {
    bgSwap,
    setBgSwap,
    randomValue: () => setBgSwap(Math.random() > 0.5),
    renderSelector: ({ sx, ...props }: ToggleButtonGroupStaticProps = {}) => (
      <ToggleButtonGroup
        size="sm"
        value={bgSwap ? '1' : '0'}
        onChange={(event, newValue) => setBgSwap(Boolean(Number(newValue)))}
        {...props}
        sx={[{ bgcolor: 'background.surface' }, ...(Array.isArray(sx) ? sx : [])]}
      >
        <IconButton aria-label="use brighter surface" value="0">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="8" y="8" width="8" height="8" rx="2" />
              <path d="M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" />
              <path d="M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" />
            </svg>
          </SvgIcon>
        </IconButton>
        <IconButton aria-label="use black surface" value="1">
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="14" y="14" width="8" height="8" rx="2" />
              <rect x="2" y="2" width="8" height="8" rx="2" />
              <path d="M7 14v1a2 2 0 0 0 2 2h1" />
              <path d="M14 7h1a2 2 0 0 1 2 2v1" />
            </svg>
          </SvgIcon>
        </IconButton>
      </ToggleButtonGroup>
    ),
  };
}

function useRadiusSelector() {
  const [radius, setRadius] = React.useState<keyof typeof radiusOptions>('smooth');
  return {
    radius,
    setRadius,
    randomValue: () =>
      setRadius(randomValue(Object.keys(radiusOptions) as Array<keyof typeof radiusOptions>)),
    renderSelector: (props?: SelectStaticProps) => (
      <Select
        size="sm"
        placeholder="radius"
        value={radius}
        onChange={(event, newValue) => setRadius(newValue as keyof typeof radiusOptions)}
        renderValue={(selectedOption) => (
          <React.Fragment>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderTop: '2px solid',
                borderLeft: '2px solid',
                borderColor: 'neutral.500',
                borderTopLeftRadius: radiusOptions[radius!].md,
                mr: 1,
                bgcolor: 'neutral.softBg',
              }}
            />
            {selectedOption?.label}
          </React.Fragment>
        )}
        {...props}
        sx={{ minWidth: { xs: 'auto', sm: 140 } }}
      >
        {Object.keys(radiusOptions).map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    ),
  };
}

function useFamilySelector() {
  const [family, setFamily] = React.useState<string>(familyOptions[0]);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return {
    family,
    setFamily,
    randomValue: () => setFamily(randomValue(familyOptions)),
    renderSelector: (props?: SelectStaticProps) => (
      <Select
        size="sm"
        placeholder="font family"
        value={family}
        onChange={(event, newValue) => setFamily(newValue as string)}
        renderValue={(selectedOption) => (
          <React.Fragment>
            <TextFieldsIcon sx={{ mr: 1 }} />
            <span style={{ fontFamily: family! }}>{selectedOption?.label}</span>
          </React.Fragment>
        )}
        {...props}
        sx={{ minWidth: { xs: 'auto', sm: 160 } }}
      >
        {familyOptions.map((item) => (
          <Option key={item} value={item} sx={{ fontFamily: item }}>
            {item}
          </Option>
        ))}
      </Select>
    ),
    importGoogleFont: () =>
      mounted ? (
        <style>
          {`@import url('https://fonts.googleapis.com/css2?${familyOptions
            .map((font) => `family=${font}:wght@300;400;500;600;700`)
            .join('&')}&display=swap');`}
        </style>
      ) : null,
  };
}

const densityOptions = {
  dense: {
    components: {
      JoyList: {
        variants: [
          { props: { size: 'sm' }, style: { '--ThemeList-gap': '4px' } },
          { props: { size: 'md' }, style: { '--ThemeList-gap': '6px' } },
          { props: { size: 'lg' }, style: { '--ThemeList-gap': '8px' } },
        ],
      },
      JoyTable: {
        variants: [
          { props: { size: 'sm' }, style: { '--TableCell-height': '28px' } },
          { props: { size: 'md' }, style: { '--TableCell-height': '32px' } },
          { props: { size: 'lg' }, style: { '--TableCell-height': '40px' } },
        ],
      },
      JoyButton: {
        variants: [
          { props: { size: 'sm' }, style: { '--Button-minHeight': '28px' } },
          { props: { size: 'md' }, style: { '--Button-minHeight': '32px' } },
          { props: { size: 'lg' }, style: { '--Button-minHeight': '40px' } },
        ],
      },
      JoyIconButton: {
        variants: [
          { props: { size: 'sm' }, style: { '--IconButton-size': '28px' } },
          { props: { size: 'md' }, style: { '--IconButton-size': '32px' } },
          { props: { size: 'lg' }, style: { '--IconButton-size': '40px' } },
        ],
      },
      JoyInput: {
        variants: [
          { props: { size: 'sm' }, style: { '--Input-minHeight': '28px' } },
          { props: { size: 'md' }, style: { '--Input-minHeight': '32px' } },
          { props: { size: 'lg' }, style: { '--Input-minHeight': '40px' } },
        ],
      },
      JoySelect: {
        variants: [
          { props: { size: 'sm' }, style: { '--Select-minHeight': '28px' } },
          { props: { size: 'md' }, style: { '--Select-minHeight': '32px' } },
          { props: { size: 'lg' }, style: { '--Select-minHeight': '40px' } },
        ],
      },
      JoyAutocomplete: {
        variants: [
          { props: { size: 'sm' }, style: { '--Input-minHeight': '28px' } },
          { props: { size: 'md' }, style: { '--Input-minHeight': '32px' } },
          { props: { size: 'lg' }, style: { '--Input-minHeight': '40px' } },
        ],
      },
      JoyTextarea: {
        variants: [
          { props: { size: 'sm' }, style: { '--Textarea-minHeight': '28px' } },
          { props: { size: 'md' }, style: { '--Textarea-minHeight': '32px' } },
          { props: { size: 'lg' }, style: { '--Textarea-minHeight': '40px' } },
        ],
      },
    },
    fontSize: {
      xs: '0.6875rem', // 11px
      sm: '0.75rem', // 12px
      md: '0.875rem', // 14px
      lg: '1rem', // 16px
      xl: '1.125rem', // 18px
      xl2: '1.375rem', // 22px
      xl3: '1.875rem', // 30px
      xl4: '2.25rem', // 36px
    },
  } as CssVarsThemeOptions,
  regular: {},
  spacious: {
    components: {
      JoyList: {
        variants: [
          { props: { size: 'sm' }, style: { '--ThemeList-gap': '12px' } },
          { props: { size: 'md' }, style: { '--ThemeList-gap': '16px' } },
          { props: { size: 'lg' }, style: { '--ThemeList-gap': '20px' } },
        ],
      },
    },
    fontSize: {
      xs: '0.8125rem', // 13px
      sm: '0.9375rem', // 15px
      md: '1.0625rem', // 17px
      lg: '1.1875rem', // 19px
      xl: '1.3125rem', // 21px
      xl2: '1.5625rem', // 25px
      xl3: '2rem', // 32px
      xl4: '2.5rem', // 40px
    },
  },
} as const;

const densityIcons = [<ViewHeadlineIcon />, <TableRowsIcon />, <ViewStreamIcon />];
function useDensitySelector() {
  const [density, setDensity] = React.useState<keyof typeof densityOptions>('regular');
  return {
    density,
    setDensity,
    randomValue: () =>
      setDensity(randomValue(Object.keys(densityOptions) as Array<keyof typeof densityOptions>)),
    renderSelectorAsRadio: () => (
      <RadioGroup
        orientation="horizontal"
        value={density}
        onChange={(event) => setDensity(event.target.value as keyof typeof densityOptions)}
        sx={{ gap: 2 }}
      >
        {(Object.keys(densityOptions) as Array<typeof density>).map((item, index) => (
          <Card size="sm" key={item} sx={{ flex: 1, p: 0.5 }}>
            <Radio
              value={item}
              overlay
              disableIcon
              label={
                <React.Fragment>
                  {densityIcons[index]}
                  <Typography
                    component="span"
                    level="inherit"
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      bottom: '-1.5rem',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {capitalize(item)}
                  </Typography>
                </React.Fragment>
              }
              sx={(theme) => ({
                fontSize: 'xs',
                fontWeight: 'lg',
                [`& .${radioClasses.action}.${radioClasses.checked}`]: {
                  boxShadow: theme.shadow.md,
                  bgcolor: theme.vars.palette.primary.softBg,
                  '--joy-shadowOpacity': 0.16,
                  '--joy-shadowChannel': theme.vars.palette.primary.mainChannel,
                },
                [`& .${radioClasses.label}`]: {
                  lineHeight: 0,
                  textAlign: 'center',
                  '--Icon-fontSize': '1.5rem',
                },
              })}
            />
          </Card>
        ))}
      </RadioGroup>
    ),
  };
}

const templateMap = {
  'order-dashboard': (params: any) => <OrderDashboardApp {...params} />,
  'profile-dashboard': (params: any) => <ProfileDashboardApp {...params} />,
  messages: (params: any) => <MessagesApp {...params} />,
  'sign-in': (params: any) => <SignInApp {...params} />,
};

export default function ThemeBuilder() {
  const [templateId, setTemplateId] = React.useState<keyof typeof templateMap>('order-dashboard');
  const {
    primary,
    renderSelector: renderPrimary,
    randomValue: randomPrimary,
    setPrimary,
  } = usePrimarySelector();
  const {
    neutral,
    renderSelector: renderNeutral,
    randomValue: randomNeutral,
    setNeutral,
  } = useNeutralSelector();
  const {
    bgSwap,
    renderSelector: renderBgSwap,
    randomValue: randomBgSwap,
    setBgSwap,
  } = useBgSwap();
  const {
    radius,
    renderSelector: renderRadius,
    randomValue: randomRadius,
    setRadius,
  } = useRadiusSelector();
  const {
    family,
    renderSelector: renderFamily,
    randomValue: randomFamily,
    setFamily,
    importGoogleFont,
  } = useFamilySelector();
  const {
    density,
    renderSelectorAsRadio: renderDensity,
    randomValue: randomDensity,
    setDensity,
  } = useDensitySelector();
  const customTheme = React.useMemo(
    () => ({
      // @ts-ignore TODO Joy should support theme variants
      [THEME_ID]: extendTheme({
        cssVarPrefix: 'template',
        colorSchemes: {
          light: {
            palette: {
              ...(primary &&
                primary !== 'default' && {
                  primary: joyColors[primary],
                }),
              ...(neutral &&
                neutral !== 'default' && {
                  neutral: tailwindNeutrals[neutral],
                }),
              ...(bgSwap && {
                background: {
                  body: 'var(--template-palette-neutral-50)',
                  surface: 'var(--template-palette-common-white)',
                },
              }),
            },
          },
          dark: {
            palette: {
              ...(primary &&
                primary !== 'default' && {
                  primary: joyColors[primary],
                }),
              ...(neutral &&
                neutral !== 'default' && {
                  neutral: tailwindNeutrals[neutral],
                }),
              ...(bgSwap && {
                background: {
                  body: 'var(--template-palette-neutral-900)',
                  surface: 'var(--template-palette-common-black)',
                },
              }),
            },
          },
        },
        ...(family && {
          fontFamily: {
            body: family,
            display: family,
          },
        }),
        ...(radius && {
          radius: radiusOptions[radius],
        }),
        ...(density && densityOptions[density]),
      }),
    }),
    [primary, neutral, radius, bgSwap, family, density],
  );
  return (
    <CssVarsProvider
      attribute="data-mui-color-scheme"
      modeStorageKey="mui-mode"
      colorSchemeStorageKey="mui-color-scheme"
      theme={{ [THEME_ID]: defaultTheme }}
    >
      {importGoogleFont()}
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Select
          size="sm"
          aria-label="Template preview"
          value={templateId}
          onChange={(event, newValue) => {
            setTemplateId(newValue!);
          }}
        >
          {Object.keys(templateMap).map((id) => (
            <Option key={id} value={id}>
              {id}
            </Option>
          ))}
        </Select>
      </Box>
      <Box
        sx={{
          transform: SCALE,
          overflow: 'auto',
          position: 'relative',
          transformOrigin: 'top left',
          bgcolor: 'var(--template-palette-background-body, var(--joy-palette-background-level1))',
          borderRadius: 'sm',
          border: '1px solid',
          borderColor:
            'var(--template-palette-primary-outlinedBorder, var(--joy-palette-neutral-outlinedBorder))',
          boxShadow: `0 0 0 6px rgba(var(--template-palette-primary-mainChannel) / 0.1)`,
        }}
      >
        {templateMap[templateId]({
          theme: customTheme,
          disableCssReset: true,
          disableNestedContext: true,
          attribute: 'data-template-color-scheme',
          modeStorageKey: 'template-mode',
          colorSchemeStorageKey: 'template-color-scheme',
        })}
      </Box>
      <Card
        size="sm"
        sx={{
          gap: '1rem',
          position: 'fixed',
          '--_inset': '1rem',
          bottom: 'var(--_inset)',
          top: 'calc(var(--_inset) + 64px)',
          right: 'var(--_inset)',
          boxShadow: 'lg',
          padding: { xl: '1rem' },
          width: { xs: 256, xl: 360 },
          zIndex: 1000,
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography level="title-md">Theme builder</Typography>
          <IconButton
            variant="outlined"
            size="sm"
            sx={{
              ml: 'auto',
              color: 'primary.outlinedColor',
              '--IconButton-size': '28px',
              '--Icon-color': 'currentColor',
            }}
            onClick={() => {
              randomPrimary();
              randomNeutral();
              randomBgSwap();
              randomRadius();
              randomFamily();
              randomDensity();
            }}
          >
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
                <path d="m14 7 3 3" />
                <path d="M5 6v4" />
                <path d="M19 14v4" />
                <path d="M10 2v2" />
                <path d="M7 8H3" />
                <path d="M21 16h-4" />
                <path d="M11 3H9" />
              </svg>
            </SvgIcon>
          </IconButton>
          <Button
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{ color: 'primary.outlinedColor', minHeight: 28 }}
            onClick={() => {
              setPrimary('default');
              setNeutral('default');
              setBgSwap(false);
              setRadius('smooth');
              setFamily(familyOptions[0]);
              setDensity('regular');
            }}
          >
            Reset
          </Button>
        </Box>
        <FormControl size="sm">
          <FormLabel sx={{ fontWeight: 'lg' }}>Primary palette</FormLabel>
          {renderPrimary()}
        </FormControl>

        <FormControl size="sm">
          <FormLabel sx={{ fontWeight: 'lg' }}>Neutral palette</FormLabel>
          {renderNeutral()}
        </FormControl>

        <FormControl size="sm">
          <FormLabel sx={{ fontWeight: 'lg' }}>Depth</FormLabel>
          {renderBgSwap()}
        </FormControl>

        <FormControl size="sm">
          <FormLabel sx={{ fontWeight: 'lg' }}>Border radius</FormLabel>
          {renderRadius()}
        </FormControl>

        <FormControl size="sm">
          <FormLabel sx={{ fontWeight: 'lg' }}>Font family</FormLabel>
          {renderFamily()}
        </FormControl>

        <FormControl size="sm">
          <FormLabel sx={{ fontWeight: 'lg' }}>Density</FormLabel>
          {renderDensity()}
        </FormControl>
      </Card>
    </CssVarsProvider>
  );
}
