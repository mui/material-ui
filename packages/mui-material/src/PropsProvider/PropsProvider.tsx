'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import SystemPropsProvider, {
  useDefaultProps as useSystemDefaultProps,
} from '@mui/system/PropsProvider';
import type { ComponentsPropsList } from '../styles/props';

function PropsProvider(
  props: React.PropsWithChildren<{
    value: { [P in keyof ComponentsPropsList]?: { defaultProps: Partial<ComponentsPropsList[P]> } };
  }>,
) {
  return <SystemPropsProvider {...props} />;
}

PropsProvider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  value: PropTypes.object.isRequired,
} as any;

export default PropsProvider;

export function useDefaultProps<Props extends Record<string, any>>(params: {
  props: Props;
  name: string;
}) {
  return useSystemDefaultProps(params) as Props;
}
