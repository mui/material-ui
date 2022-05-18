import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider, ColorPaletteProp, VariantProp, useColorScheme } from '@mui/joy/styles';
import CodeRounded from '@mui/icons-material/CodeRounded';
import ScheduleRounded from '@mui/icons-material/ScheduleRounded';
import DeleteForeverRounded from '@mui/icons-material/DeleteForeverRounded';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';

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

// how to add more color and use with variants
const Tile = ({
  children,
  variant = 'soft',
  color = 'primary',
  sx = [],
  ...props
}: {
  variant?: 'soft' | 'solid';
  color?: ColorPaletteProp | 'secondary' | 'alternate';
} & Omit<BoxProps, 'color'>) => {
  return (
    <Box
      sx={[
        { display: 'inline-flex', p: 0.75, borderRadius: '4px' },
        // @ts-ignore
        (theme) => theme.variants[variant][color],
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </Box>
  );
};

export default function JoyVariant() {
  const renderContent = (variant: VariantProp, color: ColorPaletteProp) => (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ScheduleRounded fontSize="md" />
        <Typography level="body3" sx={{ ml: 0.5, mt: '1px', fontWeight: 500 }}>
          March 25th
        </Typography>
      </Box>
      <Box sx={{ my: 'auto' }}>
        <Tile
          variant={variant.match(/(solid)/) ? 'soft' : 'solid'}
          color={color}
          sx={{
            ...(variant.match(/(solid)/) && {
              bgcolor: 'background.body',
            }),
            boxShadow: 'md',
          }}
        >
          <CodeRounded />
        </Tile>
        <Typography level="h6" component="div" sx={{ mt: 1.5, fontWeight: 500 }}>
          Check the docs for getting every component API
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box
          component="img"
          aria-labelledby="demo-task-card-assigne-name"
          src="/static/images/avatar/1-sm.jpeg"
          sx={{ borderRadius: 'sm', width: 40, height: 40 }}
        />
        <Box>
          <Typography level="body2" sx={{ fontWeight: 500 }}>
            Assigned to
          </Typography>
          <Typography id="demo-task-card-assigne-name" sx={{ fontWeight: 500 }}>
            Michael Scott
          </Typography>
        </Box>
        <Button color={variant === 'solid' ? undefined : color} sx={{ ml: 'auto' }}>
          Check
        </Button>
        <IconButton color={variant.match(/(solid)/) ? undefined : color}>
          <DeleteForeverRounded />
        </IconButton>
      </Box>
    </React.Fragment>
  );
  return (
    <CssVarsProvider>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <ColorSchemePicker />
      </Box>
      <Box
        sx={{
          maxWidth: { md: 1152, xl: 1536 },
          py: 3,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
        }}
      >
        <Box
          sx={(theme) => ({
            '--shadow-channel': '0 0 0',
            minWidth: 280,
            maxWidth: 360,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            p: 2.5,
            boxShadow: 'md',
            borderRadius: 'sm',
            ...theme.variants.solid.primary,
            ...theme.variants.solidOverrides.primary,
          })}
        >
          {renderContent('solid', 'primary')}
        </Box>
        <Box
          sx={(theme) => ({
            minWidth: 280,
            maxWidth: 360,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            p: 2.5,
            boxShadow: 'md',
            borderRadius: 'sm',
            ...theme.variants.plain.info,
            ...theme.variants.plainOverrides.info,
          })}
        >
          {renderContent('plain', 'info')}
        </Box>
        <Box
          sx={(theme) => ({
            minWidth: 280,
            maxWidth: 360,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            p: 2.5,
            boxShadow: 'md',
            borderRadius: 'sm',
            ...theme.variants.outlined.neutral,
            ...theme.variants.outlinedOverrides.neutral,
          })}
        >
          {renderContent('outlined', 'neutral')}
        </Box>
        <Box
          sx={(theme) => ({
            minWidth: 280,
            maxWidth: 360,
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            p: 2.5,
            boxShadow: 'md',
            borderRadius: 'sm',
            ...theme.variants.soft.success,
            ...theme.variants.softOverrides.success,
          })}
        >
          {renderContent('soft', 'success')}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
