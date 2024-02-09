import { TestOptions } from '../types';

const options: TestOptions = {
  injector: {
    getSortLiteralUnions: (component, propTypeDefinition) => {
      if (component.name === 'Hidden' && propTypeDefinition.name === 'only') {
        return (a, b) => {
          // descending here to check that we actually change the order of the typings
          // It's unclear why TypeScript changes order of union members sometimes so we need to be sure
          const breakpointOrder: unknown[] = ['"xl"', '"md"', '"xs"'];

          return breakpointOrder.indexOf(a.value) - breakpointOrder.indexOf(b.value);
        };
      }
      // default sort
      return undefined;
    },
  },
};

export default options;
