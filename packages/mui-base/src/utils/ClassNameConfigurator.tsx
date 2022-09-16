import * as React from 'react';

type ClassNameConfiguration = {
  /**
   * If `true`, the components within the context will not have built-in classes applied.
   */
  disableClasses: boolean;
};

const defaultContextValue: ClassNameConfiguration = {
  disableClasses: false,
};

const ClassNameConfiguratorContext =
  React.createContext<ClassNameConfiguration>(defaultContextValue);

export interface ClassNameConfiguratorProps extends Partial<ClassNameConfiguration> {
  children?: React.ReactNode;
}

/**
 * Creates a function that controls how the component classes are generated.
 * Currently it only controls whether the classes are applied or not.
 *
 * @param disableClassesOverride Allows to override the setting from the context.
 * @returns Function to be called with the `generateUtilityClass` function to generate the classes.
 */
export function useClassNameGenerator(disableClassesOverride?: boolean) {
  const { disableClasses } = React.useContext(ClassNameConfiguratorContext);

  let disable = disableClasses;
  if (disableClassesOverride !== undefined) {
    disable = disableClassesOverride;
  }

  return React.useCallback(
    function overrideClasses(generateUtilityClass: (slot: string) => string) {
      return (slot: string) => {
        if (disable) {
          return '';
        }

        return generateUtilityClass(slot);
      };
    },
    [disable],
  );
}

/**
 * Allows to configure the components within to not apply any built-in classes.
 */
export default function ClassNameConfigurator(props: ClassNameConfiguratorProps) {
  const { disableClasses, children } = props;

  const contextValue = React.useMemo(
    () => ({ disableClasses: disableClasses ?? false }),
    [disableClasses],
  );

  return (
    <ClassNameConfiguratorContext.Provider value={contextValue}>
      {children}
    </ClassNameConfiguratorContext.Provider>
  );
}
