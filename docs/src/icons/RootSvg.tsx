import type { Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

export type RootSvgProps<P = unknown> = Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
  sx?: SxProps<Theme>;
  ref?: React.Ref<SVGSVGElement>;
} & P;

const Svg = styled('svg')({
  verticalAlign: 'bottom',
});

export default Svg;
