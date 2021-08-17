import { styled, Theme } from '@material-ui/core/styles';
import { SxProps } from '@material-ui/system';

export type RootSvgProps<P = unknown> = React.SVGProps<SVGSVGElement> & { sx?: SxProps<Theme> } & P;

const Svg = styled('svg')({
  verticalAlign: 'bottom',
});

export default Svg;
