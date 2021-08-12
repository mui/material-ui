import * as React from 'react';
import { useTheme, styled, Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

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
    | 'give-feedback'
    | 'join-community'
    | 'support-us';
  sx?: SxProps<Theme>;
} & JSX.IntrinsicElements['img'];

const Img = styled('img')({ display: 'inline-block', verticalAlign: 'bottom' });

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
  if (['yes', 'no', 'time'].indexOf(name) !== -1) {
    category = 'pricing/';
    width = '18';
    height = '18';
  }
  if (['give-feedback', 'join-community', 'support-us'].indexOf(name) !== -1) {
    category = 'about/';
    mode = '';
    width = '28';
    height = '28';
  }
  return (
    <Img
      src={`/static/branding/${category}${name}${mode}.svg`}
      alt=""
      loading="lazy"
      width={width}
      height={height}
      {...props}
    />
  );
}
