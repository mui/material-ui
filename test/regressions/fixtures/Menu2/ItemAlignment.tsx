import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cacheRtl = createCache({
  key: 'menu2-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const wideIndicator = (
  <svg width="56" height="20" viewBox="0 0 56 20" aria-hidden="true">
    <rect width="56" height="20" rx="3" fill="currentColor" />
  </svg>
);

interface MixedMenuProps {
  direction: 'ltr' | 'rtl';
  dense: boolean;
}

function MixedMenu({ direction, dense }: MixedMenuProps) {
  const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const theme = React.useMemo(
    () =>
      createTheme({
        direction,
        spacing: dense ? 12 : 8,
        palette: { mode: dense ? 'dark' : 'light' },
      }),
    [direction, dense],
  );

  const menu = (
    <ThemeProvider theme={theme}>
      <Box
        ref={setContainer}
        dir={direction}
        sx={{ width: 240, height: 400, bgcolor: 'background.default', color: 'text.primary' }}
      >
        <Box ref={setAnchor} sx={{ mx: '8px', pt: '8px', width: 224, typography: 'caption' }}>
          {direction.toUpperCase()} / {dense ? 'dense / dark' : 'regular / light'}
        </Box>
        <Menu2
          open={Boolean(anchor && container)}
          anchor={anchor}
          container={container}
          modal={false}
          sideOffset={8}
          slots={{ transition: null }}
          slotProps={{ paper: { sx: { width: 224 } }, list: { dense } }}
        >
          <Menu2Item>
            <ListItemIcon>
              <FormatPaintIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paint format</ListItemText>
          </Menu2Item>
          <Menu2CheckboxItem defaultChecked>
            <ListItemText>Show labels</ListItemText>
          </Menu2CheckboxItem>
          <Menu2CheckboxItem>
            <ListItemText>Show guide lines</ListItemText>
          </Menu2CheckboxItem>
          <Menu2RadioGroup defaultValue="list">
            <Menu2RadioItem value="list">
              <ListItemText>List view</ListItemText>
            </Menu2RadioItem>
            <Menu2RadioItem value="grid">
              <ListItemText>Grid view</ListItemText>
            </Menu2RadioItem>
            <Menu2RadioItem value="wide" slotProps={{ indicator: { children: wideIndicator } }}>
              <ListItemText slotProps={{ primary: { noWrap: true } }}>
                Keep this wide radio indicator at its full size
              </ListItemText>
            </Menu2RadioItem>
          </Menu2RadioGroup>
          <Menu2Item>
            <ListItemText inset>Reset layout</ListItemText>
          </Menu2Item>
          <Menu2CheckboxItem defaultChecked>
            <ListItemText slotProps={{ primary: { noWrap: true } }}>
              Keep this long menu label on one line
            </ListItemText>
          </Menu2CheckboxItem>
          <Menu2CheckboxItem defaultChecked slotProps={{ indicator: { children: wideIndicator } }}>
            <ListItemText slotProps={{ primary: { noWrap: true } }}>
              Keep this wide custom indicator at its full size
            </ListItemText>
          </Menu2CheckboxItem>
        </Menu2>
      </Box>
    </ThemeProvider>
  );

  if (direction === 'rtl') {
    return (
      <StyleSheetManager stylisPlugins={[rtlPlugin]}>
        <CacheProvider value={cacheRtl}>{menu}</CacheProvider>
      </StyleSheetManager>
    );
  }

  return menu;
}

export default function ItemAlignment() {
  return (
    <Box sx={{ display: 'flex', width: 960 }}>
      {(['ltr', 'rtl'] as const).flatMap((direction) =>
        [false, true].map((dense) => (
          <MixedMenu key={`${direction}-${dense}`} direction={direction} dense={dense} />
        )),
      )}
    </Box>
  );
}
