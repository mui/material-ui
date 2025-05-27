import * as React from 'react';

const LicenseModel = React.createContext<any>({});

export function LicenseModelProvider(props: any) {
  const [licenseModel, setLicenseModel] = React.useState<string>('annual');
  const value = React.useMemo(
    () => ({ licenseModel, setLicenseModel }),
    [licenseModel, setLicenseModel],
  );
  return <LicenseModel.Provider value={value}>{props.children}</LicenseModel.Provider>;
}

export function useLicenseModel() {
  return React.useContext(LicenseModel);
}
