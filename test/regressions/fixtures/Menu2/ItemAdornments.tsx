import * as React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { prefixer } from 'stylis';
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import Box from '@mui/material/Box';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2SubmenuTrigger from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const cacheRtl = createCache({
  key: 'menu2-adornments-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

interface AdornmentMenuProps {
  direction: 'ltr' | 'rtl';
}

function AdornmentMenu({ direction }: AdornmentMenuProps) {
  const [anchor, setAnchor] = React.useState<HTMLDivElement | null>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const theme = React.useMemo(() => createTheme({ direction }), [direction]);

  const menu = (
    <ThemeProvider theme={theme}>
      <Box ref={setContainer} dir={direction} sx={{ width: 240, height: 300 }}>
        <Box ref={setAnchor} sx={{ mx: '8px', pt: '8px', width: 224, typography: 'caption' }}>
          {direction.toUpperCase()}
        </Box>
        <Menu2 open={Boolean(anchor && container)} modal={false}>
          <Menu2Popup
            anchor={anchor}
            container={container}
            sideOffset={8}
            slots={{ transition: null }}
            slotProps={{ root: { sx: { width: 224 } } }}
          >
            <Menu2Item startAdornment={<ContentCutIcon fontSize="small" />} endAdornment="⌘X">
              Cut
            </Menu2Item>
            <Menu2Item inset endAdornment="⇧⌘V">
              Paste as text
            </Menu2Item>
            <Menu2CheckboxItem
              defaultChecked
              startAdornment={<FormatPaintIcon fontSize="small" />}
              endAdornment="⌘B"
            >
              Bold
            </Menu2CheckboxItem>
            <Menu2CheckboxItem inset>Italic</Menu2CheckboxItem>
            <Menu2Submenu>
              <Menu2SubmenuTrigger
                startAdornment={<FormatPaintIcon fontSize="small" />}
                endAdornment="3"
              >
                Recent
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Compact layout</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
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

export default function ItemAdornments() {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 240px)', width: 480 }}>
      {(['ltr', 'rtl'] as const).map((direction) => (
        <AdornmentMenu key={direction} direction={direction} />
      ))}
    </Box>
  );
}
