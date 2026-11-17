import { escapeCell, escapeEntities, joinUnionTypes } from '../buildApi';
import type { DocsPropType } from './getComponentProps';

export default function generatePropTypeDescription(type: DocsPropType): string {
  switch (type.name) {
    case 'custom':
      return type.description;

    case 'shape':
      return `{ ${Object.entries(type.value)
        .map(
          ([name, subType]) =>
            `${name}${subType.required ? '' : '?'}: ${generatePropTypeDescription(subType)}`,
        )
        .join(', ')} }`;

    case 'union':
      return joinUnionTypes(type.value.map(generatePropTypeDescription));

    case 'enum':
      return joinUnionTypes(type.value.map((value) => escapeCell(value)));

    case 'arrayOf':
      return `Array${escapeEntities('<')}${generatePropTypeDescription(type.value)}${escapeEntities('>')}`;

    case 'instanceOf':
      return type.value;

    default:
      return type.name;
  }
}
