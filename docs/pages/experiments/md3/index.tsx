import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DarkIcon from '@mui/icons-material/DarkModeOutlined';
import LightIcon from '@mui/icons-material/LightModeOutlined';
import { useColorScheme } from '@mui/material-next/styles';

export const customPalette = {
  primary: {
    '0': '#000000',
    '10': '#3e001f',
    '20': '#640036',
    '30': '#8d004e',
    '40': '#b70b68',
    '50': '#d83181',
    '60': '#fa4d9b',
    '70': '#ff83b3',
    '80': '#ffb0ca',
    '90': '#ffd9e3',
    '95': '#ffecf0',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  secondary: {
    '0': '#000000',
    '10': '#2b151d',
    '20': '#422932',
    '30': '#5a3f48',
    '40': '#74565f',
    '50': '#8e6f78',
    '60': '#a98892',
    '70': '#c5a2ac',
    '80': '#e2bdc7',
    '90': '#ffd9e3',
    '95': '#ffecf0',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  tertiary: {
    '0': '#000000',
    '10': '#2f1500',
    '20': '#48290c',
    '30': '#623f21',
    '40': '#7d5636',
    '50': '#996e4c',
    '60': '#b58763',
    '70': '#d2a17c',
    '80': '#f0bc95',
    '90': '#ffdcc3',
    '95': '#ffede3',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  neutral: {
    '0': '#000000',
    '10': '#201a1c',
    '17': '#2e282a',
    '20': '#352f30',
    '22': '#393335',
    '30': '#4c4546',
    '40': '#645c5e',
    '50': '#7e7577',
    '60': '#988e90',
    '70': '#b3a9aa',
    '80': '#cfc4c5',
    '90': '#ebe0e1',
    '92': '#f1e5e6',
    '95': '#faeef0',
    '96': '#f7f2fa',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  neutralVariant: {
    '0': '#000000',
    '10': '#23191c',
    '20': '#392d31',
    '30': '#514347',
    '40': '#695b5e',
    '50': '#837377',
    '60': '#9e8c91',
    '70': '#b9a7ab',
    '80': '#d5c2c6',
    '90': '#f2dde2',
    '95': '#ffecf0',
    '99': '#fffbff',
    '100': '#ffffff',
  },
  error: {
    '0': '#000000',
    '10': '#410002',
    '20': '#690005',
    '30': '#93000a',
    '40': '#ba1a1a',
    '50': '#de3730',
    '60': '#ff5449',
    '70': '#ff897d',
    '80': '#ffb4ab',
    '90': '#ffdad6',
    '95': '#ffedea',
    '99': '#fffbff',
    '100': '#ffffff',
  },
};

export function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip title={`Change to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <DarkIcon /> : <LightIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Page() {
  return <div>Empty</div>;
}
