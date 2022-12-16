import * as React from 'react';
import { useTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import Frame from './Frame';

function ColorSwatch({
  name,
  rawLight,
  rawDark,
  cssVar,
}: {
  name: string;
  rawLight: string;
  rawDark: string;
  cssVar: string;
}) {
  return (
    <Frame name={name}>
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
    </Frame>
  );
}

export default function ColorSystem() {
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
}
