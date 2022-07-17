import * as React from 'react';
import { useTheme, styled, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

export type IconImageProps = {
  name:
    | 'product-core'
    | 'product-advanced'
    | 'product-templates'
    | 'product-designkits'
    | 'block-green'
    | 'block-blue'
    | 'block-gold'
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
  sx?: SxProps<Theme>;
  ref?: React.Ref<HTMLImageElement>;
  title?: string;
} & Omit<JSX.IntrinsicElements['img'], 'ref'>;

const Img = styled('img')({ display: 'inline-block', verticalAlign: 'bottom' });

export default function IconImage(props: IconImageProps) {
  const { name, title, ...other } = props;
  const theme = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  let width = '';
  let height = '';
  let category = '';
  let mode = `-${theme.palette.mode}`;
  if (name.startsWith('product-')) {
    width = '36';
    height = '36';
  }
  if (name.startsWith('block-')) {
    category = 'pricing/';
    mode = '';
    width = '13';
    height = '15';
  }
  if (['yes', 'no', 'time'].indexOf(name) !== -1) {
    category = 'pricing/';
    width = '18';
    height = '18';
  }
  if (
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
  if (!mounted && !!theme.vars) {
    // Prevent hydration mismatch
    return <Box sx={{ width, height, display: 'inline-block', verticalAlign: 'bottom' }} />;
  }
  const element = (
    <Img
      src={`/static/branding/${category}${name}${mode}.svg`}
      alt=""
      loading="lazy"
      width={width}
      height={height}
      {...other}
    />
  );
  if (!title) {
    return element;
  }
  return <Tooltip title={title}>{element}</Tooltip>;
}
