import * as React from 'react';
import { unstable_generateUtilityClass as generalGenerateUtilityClass } from '@mui/utils';
import baseGenerateUtilityClass from '../generateUtilityClass';

type Product = 'Material UI' | 'Joy UI' | 'MUI Base';

export type ClassNameGenerator = (
  componentName: string,
  className: string,
  product: Product,
) => string;

const ClassNameConfiguratorContext = React.createContext<ClassNameGenerator | undefined>(undefined);

type ClassNameConfiguratorProps =
  | {
      children?: React.ReactNode;
      disableClasses?: undefined | false;
      generator: ClassNameGenerator;
    }
  | {
      children?: React.ReactNode;
      disableClasses: true;
      generator?: undefined;
    };

function defaultClassNameGenerator(componentName: string, className: string, product: Product) {
  if (product === 'MUI Base') {
    return baseGenerateUtilityClass(`Mui${componentName}`, className);
  }

  return generalGenerateUtilityClass(`Mui${componentName}`, className);
}

function voidClassNameGenerator() {
  return '';
}

export function useClassNameGenerator() {
  const customGenerator = React.useContext(ClassNameConfiguratorContext);
  if (customGenerator === undefined) {
    return defaultClassNameGenerator;
  }

  return customGenerator;
}

export default function ClassNameConfigurator(props: ClassNameConfiguratorProps) {
  const { generator, disableClasses, children } = props;

  return (
    <ClassNameConfiguratorContext.Provider
      value={disableClasses ? voidClassNameGenerator : generator}
    >
      {children}
    </ClassNameConfiguratorContext.Provider>
  );
}
