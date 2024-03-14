import * as React from 'react';

const LicenseModel = React.createContext<any>({});

if (process.env.NODE_ENV !== 'production') {
  LicenseModel.displayName = 'LicenseModel';
}

export function LicensingModelProvider(props: any) {
  const [licensingModel, setLicensingModel] = React.useState<string>('annual');
  const value = React.useMemo(
    () => ({ licensingModel, setLicensingModel }),
    [licensingModel, setLicensingModel],
  );
  return <LicenseModel.Provider value={value}>{props.children}</LicenseModel.Provider>;
}

export function useLicensingModel() {
  return React.useContext(LicenseModel);
}
