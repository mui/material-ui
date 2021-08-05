import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';

type IconImageProps = {
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
    | 'time';
} & JSX.IntrinsicElements['img'];

export default function IconImage({ name, ...props }: IconImageProps) {
  const theme = useTheme();
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
  if (name === 'yes' || name === 'no' || name === 'time') {
    category = 'pricing/';
    width = '18';
    height = '18';
  }
  return (
    <img
      src={`/static/branding/${category}${name}${mode}.svg`}
      alt=""
      width={width}
      height={height}
      {...props}
    />
  );
}
