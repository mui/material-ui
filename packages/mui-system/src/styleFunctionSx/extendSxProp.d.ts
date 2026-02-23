import { SxProps } from './styleFunctionSx';

export default function extendSxProp<Props extends { sx?: SxProps<any> | undefined } = {}>(
  props: Props,
): Props;
