import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ThemeViewer, {
  useNodeIdsLazy,
} from 'docs/src/modules/components/ThemeViewer';

function DefaultTheme() {
  const [checked, setChecked] = React.useState(false);
  const [expandPaths, setExpandPaths] = React.useState(null);
  const t = useTranslate();
  const [darkTheme, setDarkTheme] = React.useState(false);

  React.useEffect(() => {
    let expandPath;
    decodeURI(document.location.search.slice(1))
      .split('&')
      .forEach((param) => {
        const [name, value] = param.split('=');
        if (name === 'expand-path') {
          expandPath = value;
        }
      });

    if (!expandPath) {
      return;
    }

    setExpandPaths(
      expandPath
        .replace('$.', '')
        .split('.')
        .reduce((acc, path) => {
          const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
          acc.push(last + path);
          return acc;
        }, []),
    );
  }, []);

  const data = React.useMemo(() => {
    return createTheme({
      palette: { mode: darkTheme ? 'dark' : 'light' },
    });
  }, [darkTheme]);

  const allNodeIds = useNodeIdsLazy(data);
  React.useDebugValue(allNodeIds);
  React.useEffect(() => {
    if (checked) {
      // in case during the event handler allNodeIds wasn't computed yet
      setExpandPaths(allNodeIds);
    }
  }, [checked, allNodeIds]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControlLabel
          label={t('expandAll')}
          sx={{
            m: 0,
            flexDirection: 'row-reverse',
            gap: 1,
            '&.MuiFormControlLabel-root': {
              fontFamily: 'IBM Plex Sans',
              color: 'text.secondary',
            },
          }}
          control={
            <Switch
              size="small"
              checked={checked}
              onChange={(event) => {
                setChecked(event.target.checked);
                setExpandPaths(event.target.checked ? allNodeIds : []);
              }}
            />
          }
        />
        <Divider orientation="vertical" flexItem />
        <FormControlLabel
          label={t('useDarkTheme')}
          sx={{
            m: 0,
            flexDirection: 'row-reverse',
            gap: 1,
            fontFamily: 'IBM Plex Sans',
            color: 'text.secondary',
          }}
          control={
            <Switch
              size="small"
              checked={darkTheme}
              onChange={(event) => {
                setDarkTheme(event.target.checked);
              }}
            />
          }
        />
      </Box>
      <ThemeViewer data={data} expandPaths={expandPaths} />
    </Box>
  );
}

export default DefaultTheme;
