import * as React from 'react';

export type MuiStateClassKey =
  | 'active'
  | 'checked'
  | 'completed'
  | 'disabled'
  | 'error'
  | 'expanded'
  | 'focused'
  | 'focusVisible'
  | 'required'
  | 'selected';

export const muiStateClasses: Record<MuiStateClassKey, string> = {
  active: 'Mui-active',
  checked: 'Mui-checked',
  completed: 'Mui-completed',
  disabled: 'Mui-disabled',
  error: 'Mui-error',
  expanded: 'Mui-expanded',
  focused: 'Mui-focused',
  focusVisible: 'Mui-focusVisible',
  required: 'Mui-required',
  selected: 'Mui-selected',
};

const defaultGenerator = (componentName: string) => componentName;

const createClassNameGenerator = () => {
  let generate = defaultGenerator;
  return {
    configure(generator: typeof generate) {
      generate = generator;
    },
    generate(componentName: string) {
      return generate(componentName);
    },
    reset() {
      generate = defaultGenerator;
    },
  };
};

const ClassNameGenerator = createClassNameGenerator();

const ClassNameContext = React.createContext({
  generateClassName: defaultGenerator,
});

export const useClassNameGenerator = <ClassKey extends string>({ name }: { name: string }) => {
  const { generateClassName } = React.useContext(ClassNameContext);

  return (slot: ClassKey) => {
    const globalStateClass = muiStateClasses[slot as MuiStateClassKey];
    return globalStateClass || `${generateClassName(name)}-${slot}`;
  };
};

export interface ClassNameProviderProps {
  children: React.ReactElement;
  generateClassName: typeof defaultGenerator;
}

/**
 * A react context provider component for controlling MUI component public className, eg. MuiButton-root, MuiListItem-dense.
 * Using react context allow one or multiple scope(s) of the application to have different className.
 *
 * Note: the className does not related to Mui-{state} global className and hashed className from styled-engine
 */
export const ClassNameProvider = ({ children, generateClassName }: ClassNameProviderProps) => {
  const value = React.useMemo(() => ({ generateClassName }), [generateClassName]);
  return <ClassNameContext.Provider value={value}>{children}</ClassNameContext.Provider>;
};

export default ClassNameGenerator;
