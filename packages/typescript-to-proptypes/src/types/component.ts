import { PropTypeDefinition } from './propTypeDefinition';

export interface Component {
  name: string;
  propsFilename?: string;
  types: PropTypeDefinition[];
}

export function createComponent(
  name: string,
  types: PropTypeDefinition[],
  propsFilename: string | undefined,
): Component {
  return {
    name,
    types,
    propsFilename,
  };
}
