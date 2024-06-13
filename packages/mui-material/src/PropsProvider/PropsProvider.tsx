import * as React from 'react';
import SystemPropsProvider, {
  useDefaultProps as useSystemDefaultProps,
} from '@mui/system/PropsProvider';
import type { ComponentsPropsList } from '../styles/props';

export default function PropsProvider(
  props: React.PropsWithChildren<{
    value: { [P in keyof ComponentsPropsList]?: { defaultProps: Partial<ComponentsPropsList[P]> } };
  }>,
) {
  return <SystemPropsProvider {...props} />;
}

export function useDefaultProps<Props extends Record<string, any>>(params: {
  props: Props;
  name: string;
}) {
  return useSystemDefaultProps(params) as Props;
}
