import * as React from 'react';
import { GlobalStyles, decomposeColor } from '@mui/system';
import { CssVarsProvider, extendTheme, styled, useColorScheme, useTheme } from '@mui/joy/styles';
import type { Theme, ColorPaletteProp, VariantProp, PaletteRange } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import Switch from '@mui/joy/Switch';
import SvgIcon from '@mui/joy/SvgIcon';
import TextField, { TextFieldProps } from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import RadioGroup from '@mui/joy/RadioGroup';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import CheckIcon from '@mui/icons-material/Check';

const studioTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          body: 'var(--joy-palette-neutral-50)',
        },
      },
    },
  },
});

export default function Playground() {
  return (
    <CssVarsProvider theme={studioTheme}>
      <GlobalStyles
        styles={(theme: Theme) => ({
          body: {
            backgroundColor: theme.vars.palette.background.body,
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
            fontSize: theme.vars.fontSize.md,
          },
          '*': {
            boxSizing: 'border-box',
          },
        })}
      />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Box
          sx={{
            flex: 1,
            borderRight: '1px solid',
            borderColor: 'divider',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography fontSize="xl" fontWeight="lg" mb={1}>
            Theme Editor
          </Typography>
          <Sheet sx={{ flexGrow: 1, boxShadow: 'sm', borderRadius: 'xs' }}></Sheet>
        </Box>
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography fontSize="xl" fontWeight="lg" mb={1}>
            Preview
          </Typography>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
