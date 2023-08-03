import * as React from 'react';
import { useTheme, styled, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

export type IconImageProps = {
  name:
    | 'product-core'
    | 'product-advanced'
    | 'product-toolpad'
    | 'product-templates'
    | 'product-designkits'
    | 'x-plan-pro'
    | 'x-plan-premium'
    | 'x-plan-community'
    | 'yes'
    | 'no'
    | 'time'
    | 'spotify'
    | 'amazon'
    | 'nasa'
    | 'netflix'
    | 'unity'
    | 'shutterstock'
    | 'southwest'
    | 'boeing'
    | 'siemens'
    | 'deloitte'
    | 'apple'
    | 'twitter'
    | 'salesforce'
    | 'verizon'
    | 'atandt'
    | 'patreon'
    | 'ebay'
    | 'samsung'
    | 'volvo';
  height?: number;
  ref?: React.Ref<HTMLImageElement>;
  sx?: SxProps<Theme>;
  title?: string;
  width?: number;
} & Omit<JSX.IntrinsicElements['img'], 'ref'>;

const Img = styled('img')({ display: 'inline-block', verticalAlign: 'bottom' });

let neverHydrated = true;

export default function IconImage(props: IconImageProps) {
  const { height: heightProp, name, title, width: widthProp, ...other } = props;
  const theme = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    neverHydrated = false;
    setMounted(true);
  }, []);
  let defaultWidth;
  let defaultHeight;
  let category = '';
  let mode = `-${theme.palette.mode}`;

  if (name.startsWith('product-')) {
    defaultWidth = 36;
    defaultHeight = 36;
  } else if (name.startsWith('x-plan-')) {
    category = 'pricing/';
    mode = '';
    defaultWidth = 13;
    defaultHeight = 15;
  } else if (['yes', 'no', 'time'].indexOf(name) !== -1) {
    category = 'pricing/';
    defaultWidth = 18;
    defaultHeight = 18;
  } else if (
    [
      'spotify',
      'amazon',
      'nasa',
      'netflix',
      'unity',
      'shutterstock',
      'southwest',
      'boeing',
      'siemens',
      'deloitte',
      'apple',
      'twitter',
      'salesforce',
      'volvo',
      'verizon',
      'atandt',
      'patreon',
      'ebay',
      'samsung',
    ].indexOf(name) !== -1
  ) {
    category = 'companies/';
  }

  const width = widthProp ?? defaultWidth;
  const height = heightProp ?? defaultHeight;

  if (!mounted && neverHydrated && !!theme.vars && mode !== '') {
    // Prevent hydration mismatch between the light and dark mode image source.
    return <Box component="span" sx={{ width, height, display: 'inline-block' }} />;
  }

  const child = (
    <Img
      src={`/static/branding/${category}${name}${mode}.svg`}
      alt=""
      loading="lazy"
      width={width}
      height={height}
      {...other}
    />
  );

  if (title) {
    return <Tooltip title={title}>{child}</Tooltip>;
  }

  return child;
}
