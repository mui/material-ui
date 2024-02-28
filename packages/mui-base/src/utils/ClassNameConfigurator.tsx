'use client';
import * as React from 'react';

type ClassNameConfiguration = {
  /**
   * If `true`, the components within the context will not have built-in classes applied.
   */
  disableDefaultClasses: boolean;
};

const defaultContextValue: ClassNameConfiguration = {
  disableDefaultClasses: false,
};

const ClassNameConfiguratorContext =
  React.createContext<ClassNameConfiguration>(defaultContextValue);

if (process.env.NODE_ENV !== 'production') {
  ClassNameConfiguratorContext.displayName = 'ClassNameConfiguratorContext';
}

export interface ClassNameConfiguratorProps extends Partial<ClassNameConfiguration> {
  children?: React.ReactNode;
}

/**
 * @ignore - internal hook.
 *
 * Wraps the `generateUtilityClass` function and controls how the classes are generated.
 * Currently it only affects whether the classes are applied or not.
 *
 * @returns Function to be called with the `generateUtilityClass` function specific to a component to generate the classes.
 */
export function useClassNamesOverride(generateUtilityClass: (slot: string) => string) {
  const { disableDefaultClasses } = React.useContext(ClassNameConfiguratorContext);

  return (slot: string) => {
    if (disableDefaultClasses) {
      return '';
    }

    return generateUtilityClass(slot);
  };
}

/**
 * Allows to configure the components within to not apply any built-in classes.
 */
export function ClassNameConfigurator(props: ClassNameConfiguratorProps) {
  const { disableDefaultClasses, children } = props;

  const contextValue = React.useMemo(
    () => ({ disableDefaultClasses: disableDefaultClasses ?? false }),
    [disableDefaultClasses],
  );

  return (
    <ClassNameConfiguratorContext.Provider value={contextValue}>
      {children}
    </ClassNameConfiguratorContext.Provider>
  );
}
