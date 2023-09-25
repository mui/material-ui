import * as React from 'react';
import dynamic from 'next/dynamic';
import colors from '@mui/joy/colors';
import defaultTheme from '@mui/joy/styles/defaultTheme';
import { CssVarsProvider, THEME_ID, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Option from '@mui/joy/Option';
import ToggleButtonGroup, { ToggleButtonGroupStaticProps } from '@mui/joy/ToggleButtonGroup';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Select, { SelectStaticProps } from '@mui/joy/Select';
import SvgIcon from '@mui/joy/SvgIcon';
import TextFieldsIcon from '@mui/icons-material/TextFields';

function Placeholder() {
  return (
    <Box
      sx={{
        transform: 'scale(0.9)',
        overflow: 'hidden',
        position: 'relative',
        transformOrigin: 'top left',
        bgcolor: 'background.level1',
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

const joyColors = {
  blue: {
    50: '#EDF5FD',
    100: '#E3EFFB',
    200: '#C7DFF7',
    300: '#97C3F0',
    400: '#4393E4',
    500: '#0B6BCB',
    600: '#185EA5',
    700: '#12467B',
    800: '#0A2744',
    900: '#051423',
  },
  yellow: {
    50: '#FEFAF6',
    100: '#FDF0E1',
    200: '#FCE1C2',
    300: '#F3C896',
    400: '#EA9A3E',
    500: '#9A5B13',
    600: '#72430D',
    700: '#492B08',
    800: '#2E1B05',
    900: '#1D1002',
  },
  red: {
    50: '#FEF6F6',
    100: '#FCE4E4',
    200: '#F7C5C5',
    300: '#F09898',
    400: '#E47474',
    500: '#C41C1C',
    600: '#A51818',
    700: '#7D1212',
    800: '#430A0A',
    900: '#240505',
  },
  green: {
    50: '#F6FEF6',
    100: '#E3FBE3',
    200: '#C7F7C7',
    300: '#A1E8A1',
    400: '#51BC51',
    500: '#1F7A1F',
    600: '#136C13',
    700: '#0A470A',
    800: '#042F04',
    900: '#021D02',
  },
} as const;

const tailwindNeutrals = {
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
    xs: '20px',
    sm: '22px',
    md: '24px',
    lg: '26px',
    xl: '28px',
  },
};

const familyOptions = ['Inter', 'General Sans', 'IBM Plex Sans', 'Menlo'];

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
        <Option value="default">
          <PalettePreview range={colors.blue} />
        </Option>
        {(Object.keys(joyColors) as Array<keyof typeof joyColors>).map((color) => (
          <Option key={color} value={color}>
            <PalettePreview range={joyColors[color]} />
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
        <Option value="default">
          <PalettePreview range={colors.grey} />
        </Option>
        {(Object.keys(tailwindNeutrals) as Array<keyof typeof tailwindNeutrals>).map((color) => (
          <Option key={color} value={color}>
            <PalettePreview range={tailwindNeutrals[color]} />
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
  } = useFamilySelector();
  const customTheme = React.useMemo(
    () => ({
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
      }),
    }),
    [primary, neutral, radius, bgSwap, family],
  );
  return (
    <CssVarsProvider theme={{ [THEME_ID]: defaultTheme }}>
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
          transform: { xs: 'scale(1)', md: 'scale(0.84)' },
          overflow: 'auto',
          position: 'relative',
          transformOrigin: 'top left',
          bgcolor: 'var(--template-palette-background-body)',
          borderRadius: 'sm',
          border: '1px solid',
          borderColor: 'var(--template-palette-primary-outlinedBorder)',
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
      </Card>
    </CssVarsProvider>
  );
}
