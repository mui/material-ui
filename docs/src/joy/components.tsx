import * as React from 'react';
import { Box } from '@mui/system';
import {
  useColorScheme,
  styled,
  JoyTheme,
  TypographySystem,
  VariantProp,
  ColorPaletteProp,
  BorderRadius,
  Elevation,
} from '@mui/joy/styles';
import { Moon, Sun, System } from 'docs/src/joy/icons';

interface DemoProps {
  variant?: VariantProp;
  color?: ColorPaletteProp;
  size?: 'small' | 'default' | 'large';
  roundness?: keyof BorderRadius;
  elevation?: keyof Elevation;
}

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'elevation' &&
  prop !== 'square' &&
  prop !== 'roundness' &&
  prop !== 'ownerState' &&
  prop !== 'size' &&
  prop !== 'sx';

export const Button = styled('button', {
  shouldForwardProp,
})<DemoProps & { square?: boolean }>(
  ({
    theme,
    variant = 'contained',
    color = 'primary',
    elevation,
    square,
    size,
    roundness = 'default',
  }) => [
    {
      ...(size === 'small' && {
        '--Button-minHeight': '2rem',
      }),
      ...(size === 'large' && {
        '--Button-minHeight': '3rem',
      }),
      borderRadius: theme.vars.borderRadius[roundness],
      padding: size === 'small' ? '0.25rem 1rem' : '0.25rem 2rem',
      minHeight: 'var(--Button-minHeight, 2.5rem)',
      ...(square && {
        minWidth: 'var(--Button-minHeight, 2.5rem)',
        padding: '0.25rem',
      }),
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      '&:focus-visible': theme.focus.default,
      ...(elevation && {
        boxShadow: theme.vars.elevation[elevation],
      }),
    },
    size === 'small' ? theme.typography.body2 : theme.typography.body1,
    {
      fontWeight: 'bold',
    },
    theme.variants[variant]?.[color],
    theme.variants[`${variant}Hover`]?.[color],
    theme.variants[`${variant}Active`]?.[color],
  ],
);

export const List = styled('ul', {
  shouldForwardProp,
})<DemoProps>(({ theme, variant = 'outlined', color = 'neutral', roundness, elevation }) => [
  {
    position: 'relative',
    listStyle: 'none',
    padding: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    margin: 0,
    ...(roundness && {
      borderRadius: theme.vars.borderRadius[roundness],
    }),
    ...(elevation && {
      boxShadow: theme.vars.elevation[elevation],
    }),
    '& > li': {
      margin: 0,
    },
  },
  theme.variants[variant]?.[color],
  variant === 'contained' && theme.variants.containedOverrides?.[color],
]);

export const ListItemButton = styled('button', {
  shouldForwardProp,
})<DemoProps>(({ theme, variant = 'text', color = 'neutral', roundness, elevation }) => [
  {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
    padding: '0.5rem 1rem',
    width: '100%',
    textAlign: 'initial',
    border: 0,
    ...(roundness && {
      borderRadius: theme.vars.borderRadius[roundness],
    }),
    ...(elevation && {
      boxShadow: theme.vars.elevation[elevation],
    }),
    '&:focus-visible': theme.focus.default,
  },
  theme.typography.body1,
  theme.variants[variant]?.[color],
  theme.variants[`${variant}Hover`]?.[color],
]);

export const Badge = styled('span', {
  shouldForwardProp,
})<DemoProps>(
  ({ theme, variant = 'contained', color = 'primary', roundness = 'default', elevation }) => [
    {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0 0.5rem',
      borderRadius: theme.vars.borderRadius[roundness],
      ...(elevation && {
        boxShadow: theme.vars.elevation[elevation],
      }),
    },
    theme.typography.body3,
    theme.variants[variant]?.[color],
  ],
);

export const Typography = styled('p', { shouldForwardProp })<{
  level?: keyof TypographySystem;
  color?: ColorPaletteProp;
}>(({ theme, level = 'body1', color }) => [
  { margin: 0 },
  theme.typography[level],
  color && {
    color:
      color === 'context'
        ? `var(--joy-variant-textColor)`
        : `var(--joy-palette-${color}-textColor)`,
  },
]);

export const Input = styled('input', {
  shouldForwardProp,
})<{
  ownerState?: DemoProps;
}>(
  ({
    theme,
    ownerState: {
      variant = 'outlined',
      color = 'neutral',
      roundness = 'default',
      size,
      elevation,
    } = {},
  }) => [
    {
      border: 0,
    },
    size === 'small' ? theme.typography.body2 : theme.typography.body1,
    theme.variants[variant]?.[color],
    {
      ...(size === 'small' && {
        '--Input-minHeight': '2rem',
      }),
      ...(size === 'large' && {
        '--Input-minHeight': '3rem',
      }),
      borderRadius: theme.vars.borderRadius[roundness],
      minHeight: 'var(--Input-minHeight, 2.5rem)',
      padding: size === 'small' ? '0.25rem 0.75rem' : '0.25rem 1rem',
      '&:focus-visible': theme.focus.default,
      '&::placeholder': {
        color: theme.vars.palette[color === 'context' ? 'neutral' : color]?.textColor,
        opacity: 0.4,
      },
      ...((variant === 'text' || variant === 'outlined') && {
        backgroundColor: `var(--joy-variant-${variant}Bg, ${theme.vars.palette.background.level1})`,
      }),
      ...(elevation && {
        boxShadow: theme.vars.elevation[elevation],
      }),
    },
  ],
);

type InputPropsWithoutSize = Omit<JSX.IntrinsicElements['input'], 'size' | 'ref'>;

export const TextField = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<InputPropsWithoutSize & DemoProps>
>(({ children, placeholder, variant, size, color, roundness, elevation, ...props }, ref) => {
  return (
    <Box ref={ref} {...props} sx={{ position: 'relative' }}>
      {children}
      <Input
        placeholder={placeholder}
        ownerState={{ variant, size, color, roundness, elevation }}
      />
    </Box>
  );
});

export const GradientText = styled('span', { shouldForwardProp })(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.vars.palette.gradient.text})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

export const FormLabel = styled('label')(({ theme }) => [
  theme.typography.body2,
  {
    fontWeight: theme.vars.fontWeight.lg,
    marginBottom: '0.25rem',
  },
]);

export const Select = styled('select')(({ theme, value }) => [
  {
    width: '100%',
    display: 'flex',
    padding: '0.5rem',
    borderRadius: theme.vars.borderRadius.xs,
    border: 0,
    boxShadow: 'none',
    '-webkit-appearance': 'none',
    '&:focus-visible': theme.focus.default,
  },
  theme.typography.body1,
  theme.variants.light.neutral,
  value === 'none' && {
    color: theme.vars.palette.neutral[400],
  },
]);

export const Tabs = styled('div', { shouldForwardProp })<DemoProps>(
  ({ theme, variant = 'outlined', color = 'neutral', roundness = 'default', elevation }) => [
    {
      padding: '0.375rem',
      display: 'flex',
      gap: '0.5rem',
      ...(roundness && {
        borderRadius: theme.vars.borderRadius[roundness],
      }),
      ...(elevation && {
        boxShadow: theme.vars.elevation[elevation],
      }),
    },
    theme.variants[variant]?.[color],
    variant === 'contained' && theme.variants.containedOverrides[color],
  ],
);

export const Header = styled('header', { shouldForwardProp: (prop) => prop !== 'translucent' })<{
  translucent?: boolean;
}>(({ theme, translucent }) => ({
  minHeight: 112,
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid',
  borderColor: 'transparent',
  transition: '0.3s',
  ...(translucent && {
    minHeight: 64,
    backgroundColor: theme.vars.palette.background.translucent1,
    backdropFilter: 'blur(8px)',
    borderColor: theme.vars.palette.background.level1,
  }),
}));

export const Widget = ({ children, label }: React.PropsWithChildren<{ label: string }>) => {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'var(--joy-palette-background-level1)',
        width: 280,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--joy-borderRadius-md)',
        boxShadow: 'var(--joy-elevation-md)',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          p: 2,
          bgcolor: 'var(--joy-palette-background-level1)',
          borderBottomLeftRadius: 'var(--joy-borderRadius-sm)',
          borderBottomRightRadius: 'var(--joy-borderRadius-sm)',
        }}
      >
        <Typography>{label}</Typography>
      </Box>
    </Box>
  );
};

export const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Box
      // @ts-ignore
      sx={(theme: JoyTheme) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '24px',
        ...theme.variants.outlined.primary,
      })}
    >
      <Box sx={{ display: 'flex', gap: '8px', p: 0.5 }}>
        {(['system', 'light', 'dark'] as const).map((modeId) => {
          const icons = {
            system: System,
            light: Sun,
            dark: Moon,
          };
          const Icon = icons[modeId];
          return (
            <Button
              key={modeId}
              square
              variant={mode === modeId ? 'contained' : 'text'}
              size="small"
              onClick={() => {
                setMode(modeId);
              }}
            >
              <Icon fontSize="lg" />
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export const IconWrapper = ({ children }: React.PropsWithChildren<{}>) => (
  <Box
    sx={{
      p: 1,
      borderRadius: 1,
      alignSelf: 'flex-start',
      position: 'relative',
      overflow: 'hidden',
      lineHeight: 0,
      border: '1px solid',
      borderColor: 'var(--joy-palette-neutral-outlinedBorder)',
      color: 'var(--joy-palette-primary-textColor)',
    }}
  >
    <Box
      sx={{
        background: 'var(--joy-palette-gradient-bg)',
        position: 'absolute',
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.2,
      }}
    />
    {children}
  </Box>
);
