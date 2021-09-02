import { styled, Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

export type RootSvgProps<P = unknown> = React.SVGProps<SVGSVGElement> & { sx?: SxProps<Theme> } & P;

const Svg = styled('svg')({
  verticalAlign: 'bottom',
});

export default Svg;
