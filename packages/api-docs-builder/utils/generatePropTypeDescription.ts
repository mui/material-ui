import * as recast from 'recast';
import { parse as docgenParse, PropTypeDescriptor } from 'react-docgen';
import { escapeCell, escapeEntities, joinUnionTypes } from '../buildApi';

function getDeprecatedInfo(type: PropTypeDescriptor) {
  const { raw = '' } = type;
  const marker = /deprecatedPropType\((\r*\n)*\s*PropTypes\./g;
  const match = raw.match(marker);
  const startIndex = raw.search(marker);
  if (match) {
    const offset = match[0].length;

    return {
      propTypes: raw.substring(startIndex + offset, raw.indexOf(',')),
      explanation: recast.parse(raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

export function getChained(type: PropTypeDescriptor) {
  if (type.raw) {
    const marker = 'chainPropTypes';
    const indexStart = type.raw.indexOf(marker);

    if (indexStart !== -1) {
      const parsed = docgenParse(
        `
        import PropTypes from 'prop-types';
        const Foo = () => <div />
        Foo.propTypes = {
          bar: ${recast.print(recast.parse(type.raw).program.body[0].expression.arguments[0]).code}
        }
        export default Foo
      `,
        {
          // helps react-docgen pickup babel.config.js
          filename: './',
        },
      )[0];
      return {
        type: parsed.props?.bar.type,
        required: parsed.props?.bar.required,
      };
    }
  }

  return false;
}

export function isElementTypeAcceptingRefProp(type: PropTypeDescriptor): boolean {
  return type.raw === 'elementTypeAcceptingRef';
}

function isRefType(type: PropTypeDescriptor): boolean {
  return type.raw === 'refType';
}

function isIntegerType(type: PropTypeDescriptor): boolean {
  return !!type.raw && type.raw.startsWith('integerPropType');
}

export function isElementAcceptingRefProp(type: PropTypeDescriptor): boolean {
  return !!type.raw && /^elementAcceptingRef/.test(type.raw);
}

export default function generatePropTypeDescription(type: PropTypeDescriptor): string | undefined {
  switch (type.name) {
    case 'custom': {
      if (isElementTypeAcceptingRefProp(type)) {
        return 'element type';
      }
      if (isElementAcceptingRefProp(type)) {
        return 'element';
      }
      if (isIntegerType(type)) {
        return 'integer';
      }
      if (isRefType(type)) {
        return 'ref';
      }
      if (type.raw === 'HTMLElementType') {
        return 'HTML element';
      }
      if (type.raw === '() => null') {
        return 'any';
      }

      const deprecatedInfo = getDeprecatedInfo(type);
      if (deprecatedInfo !== false) {
        return generatePropTypeDescription({
          // eslint-disable-next-line react/forbid-foreign-prop-types
          name: deprecatedInfo.propTypes,
        } as any);
      }

      const chained = getChained(type);
      if (chained !== false && chained.type) {
        return generatePropTypeDescription(chained.type);
      }

      return type.raw;
    }

    case 'shape':
      return `{ ${Object.keys(type.value as Record<string, PropTypeDescriptor>)
        .map((subValue) => {
          const subType = (type.value as Record<string, PropTypeDescriptor>)[subValue];
          return `${subValue}${subType.required ? '' : '?'}: ${generatePropTypeDescription(
            subType,
          )}`;
        })
        .join(', ')} }`;

    case 'union':
      return joinUnionTypes(
        (type.value as readonly PropTypeDescriptor[]).map((type2) => {
          return generatePropTypeDescription(type2) ?? '';
        }),
      );
    case 'enum':
      return joinUnionTypes(
        (type.value as readonly { name: 'string'; value: string }[]).map((type2) => {
          return escapeCell(type2.value);
        }),
      );

    case 'arrayOf': {
      return `Array${escapeEntities('<')}${generatePropTypeDescription(type.value as PropTypeDescriptor)}${escapeEntities('>')}`;
    }

    case 'instanceOf': {
      if ((type.value as string).startsWith('typeof')) {
        return /typeof (.*) ===/.exec(type.value as string)![1];
      }
      return type.value as string | undefined;
    }

    default:
      return type.name;
  }
}
