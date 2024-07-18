import * as React from 'react';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import {
  CssVarsProvider,
  useColorScheme,
  useTheme,
  TypographySystem,
  createGetCssVar,
} from '@mui/joy/styles';

const getCssVar = createGetCssVar();

const rgb2hex = (rgb: string) =>
  `#${(rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/) || [])
    .slice(1)
    .map((n) => parseInt(n, 10).toString(16).padStart(2, '0'))
    .join('')}`;

function ColorSchemePicker() {
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
      sx={(theme) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid',
        borderRadius: theme.vars.radius.md,
        ...theme.variants.outlined.neutral,
      })}
    >
      <Box sx={{ display: 'flex', gap: '8px', p: '4px' }}>
        {(['light', 'dark'] as const).map((modeId) => {
          return (
            <Button
              key={modeId}
              size="sm"
              variant={mode === modeId ? 'solid' : 'plain'}
              onClick={() => {
                setMode(modeId);
              }}
            >
              {modeId}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}

function ColorToken({ name, value }: { name: string; value: string }) {
  const [color, setColor] = React.useState('');
  const ref = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    if (ref.current && typeof window !== 'undefined') {
      const style = window.getComputedStyle(ref.current);
      setColor(rgb2hex(style.backgroundColor));
    }
  }, []);
  return (
    <div>
      <Box
        ref={ref}
        sx={{ borderRadius: 'sm', bgcolor: value, width: 64, height: 64, mb: 1, boxShadow: 'sm' }}
      />
      <Typography level="body-xs">{name}</Typography>
      <Typography level="body-xs">{color}</Typography>
    </div>
  );
}

function PaletteTokens() {
  const { colorScheme } = useColorScheme();
  const { palette } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <React.Fragment>
      {mounted && (
        <Typography level="title-md" sx={{ mb: 1 }}>
          Palette ({colorScheme})
        </Typography>
      )}
      <div>
        {Object.entries(palette).map(([key, nestedObj]) => {
          if (typeof nestedObj === 'string' && mounted) {
            return <ColorToken key={key} name={key} value={nestedObj} />;
          }
          return (
            <details key={key} style={{ padding: '0.5rem 0' }}>
              <summary
                style={{
                  marginBottom: '0.5rem',
                  fontFamily: getCssVar('fontFamily-body'),
                  cursor: 'pointer',
                }}
              >
                {key}
              </summary>

              {key !== 'mode' && key !== 'colorScheme' && (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                    gap: 2,
                  }}
                >
                  {Object.entries(nestedObj).map(([nestedKey, value]) => (
                    <ColorToken key={nestedKey} name={nestedKey} value={value as string} />
                  ))}
                </Box>
              )}
            </details>
          );
        })}
      </div>
    </React.Fragment>
  );
}

function TypographyScale() {
  const { typography } = useTheme();
  return (
    <React.Fragment>
      <Typography level="title-md" sx={{ mb: 1 }}>
        Typography
      </Typography>

      {(Object.keys(typography) as Array<keyof TypographySystem>).map((level) => {
        return (
          <Typography key={level} level={level}>
            {level}
          </Typography>
        );
      })}
    </React.Fragment>
  );
}

export default function JoyStyleGuide() {
  return (
    <CssVarsProvider>
      <Container>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            minHeight: 56,
            borderBottom: '1px solid',
            borderColor: 'neutral.outlinedBorder',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.body',
          }}
        >
          <ColorSchemePicker />
        </Box>
        <Box sx={{ p: 2 }}>
          <PaletteTokens />
        </Box>
        <Box sx={{ p: 2, display: 'flex', gap: 3 }}>
          <Box sx={{ minWidth: 300 }}>
            <TypographyScale />
          </Box>
          <div>
            <Typography level="title-md" sx={{ mb: 1 }}>
              UI Patterns
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ width: 48, height: 48, bgcolor: 'background.level2' }} />
              <div>
                <Typography>List item title</Typography>
                <Typography level="body-sm">Secondary text.</Typography>
              </div>
            </Box>
            <hr />
            <Box sx={{ display: 'flex', gap: 2, minWidth: 300 }}>
              <Box sx={{ width: 48, height: 48, bgcolor: 'background.level2' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography>List item title</Typography>
                <Typography level="body-sm">Secondary text.</Typography>
              </Box>
              <Typography level="body-xs">metadata</Typography>
            </Box>
            <hr />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ width: 64, height: 64, bgcolor: 'background.level2' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography>List item title</Typography>
                <Typography level="body-sm">Secondary text.</Typography>
                <Typography level="body-xs">metadata</Typography>
              </Box>
            </Box>
          </div>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
