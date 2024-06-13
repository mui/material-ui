'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import getThemeProps from '../useThemeProps/getThemeProps';

const PropsContext = React.createContext<Record<string, any> | undefined>(undefined);

function PropsProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: Record<string, any> | undefined }>) {
  return <PropsContext.Provider value={value}>{children}</PropsContext.Provider>;
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
  value: PropTypes.object,
} as any;

export const useDefaultProps = ({ props, name }: { props: Record<string, any>; name: string }) => {
  const ctx = React.useContext(PropsContext);
  return getThemeProps({ props, name, theme: { components: ctx } });
};

export default PropsProvider;
