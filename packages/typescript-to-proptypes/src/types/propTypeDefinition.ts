import { PropType } from './props';

export interface PropTypeDefinition {
  name: string;
  jsDoc: string | undefined;
  propType: PropType;
  filenames: Set<string>;
  /**
   * @internal
   */
  $$id: number | undefined;
}

export function createPropTypeDefinition(
  name: string,
  jsDoc: string | undefined,
  propType: PropType,
  filenames: Set<string>,
  id: number | undefined,
): PropTypeDefinition {
  return {
    name,
    jsDoc,
    propType,
    filenames,
    $$id: id,
  };
}
