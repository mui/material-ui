'use client';
import * as React from 'react';
import getThemeProps from '../useThemeProps/getThemeProps';

const PropsContext = React.createContext<Record<string, any> | undefined>(undefined);

function PropsProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: Record<string, any> | undefined }>) {
  return <PropsContext.Provider value={value}>{children}</PropsContext.Provider>;
}

export const useDefaultProps = ({ props, name }: { props: Record<string, any>; name: string }) => {
  const ctx = React.useContext(PropsContext);
  return getThemeProps({ props, name, theme: { components: ctx } });
};

export default PropsProvider;
