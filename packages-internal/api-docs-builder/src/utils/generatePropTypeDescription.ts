import { escapeCell, escapeEntities, joinUnionTypes } from '../buildApi';
import type { DocsPropType } from './getComponentProps';

export default function generatePropTypeDescription(
  type: DocsPropType | undefined,
): string | undefined {
  if (!type) {
    return undefined;
  }
  switch (type.name) {
    case 'custom':
      return (type as Extract<DocsPropType, { name: 'custom' }>).description;

    case 'shape': {
      const shapeValue = (type as Extract<DocsPropType, { name: 'shape' }>).value;
      return `{ ${Object.keys(shapeValue)
        .map((subValue) => {
          const subType = shapeValue[subValue];
          return `${subValue}${subType.required ? '' : '?'}: ${generatePropTypeDescription(
            subType,
          )}`;
        })
        .join(', ')} }`;
    }

    case 'union': {
      const unionValue = (type as Extract<DocsPropType, { name: 'union' }>).value;
      return joinUnionTypes(
        unionValue.map((type2) => {
          return generatePropTypeDescription(type2) ?? '';
        }),
      );
    }

    case 'enum': {
      const enumValue = (type as Extract<DocsPropType, { name: 'enum' }>).value;
      return joinUnionTypes(enumValue.map((value) => escapeCell(value)));
    }

    case 'arrayOf': {
      const arrayValue = (type as Extract<DocsPropType, { name: 'arrayOf' }>).value;
      return `Array${escapeEntities('<')}${generatePropTypeDescription(arrayValue)}${escapeEntities('>')}`;
    }

    case 'instanceOf':
      return (type as Extract<DocsPropType, { name: 'instanceOf' }>).value;

    default:
      return type.name;
  }
}
