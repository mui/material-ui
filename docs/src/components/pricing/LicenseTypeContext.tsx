import * as React from 'react';

const LicenseType = React.createContext<any>({});

if (process.env.NODE_ENV !== 'production') {
  LicenseType.displayName = 'LicenseType';
}

export function LicenseTypeProvider(props: any) {
  const [licenseType, setLicenseType] = React.useState<string>('Annual');
  const value = React.useMemo(
    () => ({ licenseType, setLicenseType }),
    [licenseType, setLicenseType],
  );
  return <LicenseType.Provider value={value}>{props.children}</LicenseType.Provider>;
}

export function useLicenseType() {
  return React.useContext(LicenseType);
}
