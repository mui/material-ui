/**
 *  This is a temporary support for `call` that has tagged template literal as first argument
 *  It's likely come from bundled code, e.g. `@mui/material` stable build.
 *  We can remove this once we updated the browserslist.rc in v6
 */
import type { TemplateElement } from '@babel/types';
import { ValueType, type ExpressionValue } from '@wyw-in-js/shared';
import { ValueCache } from '@wyw-in-js/processor-utils';

type Primitive = string | number | boolean | null | undefined;

type TemplateCallback = (params: Record<string, unknown> | undefined) => string | number;

export function isTaggedTemplateCall(
  styleArgs:
    | ExpressionValue[]
    | (TemplateElement | ExpressionValue)[]
    | [(TemplateElement | ExpressionValue)[]],
  values: ValueCache,
) {
  const [firstArg] = styleArgs.flat();
  if (!('kind' in firstArg) || firstArg.kind !== ValueType.LAZY) {
    return false;
  }
  const firstValue = values.get(firstArg.ex.name);
  return Array.isArray(firstValue) && firstValue.every((val) => typeof val === 'string');
}

export function resolveTaggedTemplate(
  styleArgs:
    | ExpressionValue[]
    | (TemplateElement | ExpressionValue)[]
    | [(TemplateElement | ExpressionValue)[]],
  values: ValueCache,
  themeArgs: { theme?: unknown } | undefined,
) {
  const [firstArg, ...exArgs] = styleArgs.flat();
  if ('kind' in firstArg && firstArg.kind === ValueType.LAZY) {
    const templateExpressions: Primitive[] = [];
    const taggedTemplate = firstArg.source.trim().match(/`([^`]+)`/)?.[1] || '';

    exArgs.forEach((item) => {
      if ('kind' in item) {
        switch (item.kind) {
          case ValueType.FUNCTION: {
            const value = values.get(item.ex.name) as TemplateCallback;
            templateExpressions.push(value(themeArgs));
            break;
          }
          case ValueType.CONST:
            templateExpressions.push(item.value);
            break;
          case ValueType.LAZY: {
            const evaluatedValue = values.get(item.ex.name);
            if (typeof evaluatedValue === 'function') {
              templateExpressions.push(evaluatedValue(themeArgs));
            } else {
              templateExpressions.push(evaluatedValue as Primitive);
            }
            break;
          }
          default:
            break;
        }
      }
    });

    return taggedTemplate.replace(/\$\{[^}]+\}/gm, () => String(templateExpressions.shift()));
  }
  return ``;
}
