import type { Expression, Params, TailProcessorParams, ValueCache } from '@linaria/tags';
import { BaseProcessor, buildSlug, toValidCSSIdentifier, validateParams } from '@linaria/tags';
import { ValueType, slugify } from '@linaria/utils';
import type { IVariableContext, ExpressionValue, Replacements, Rules } from '@linaria/utils';
import type { IOptions } from './styled';
import { processCssObject } from './utils/processCssObject';
import { cssFnValueToVariable } from './utils/cssFnValueToVariable';

export default class SxProcessor extends BaseProcessor {
  sxArguments: ExpressionValue[] = [];

  variableIdx: number = 0;

  collectedVariables: [string, Expression, boolean][] = [];

  constructor(params: Params, ...args: TailProcessorParams) {
    super(params, ...args);
    validateParams(params, ['callee', 'call'], 'Invalid usage of sx call.');
    const [, [, ...sxCallArguments]] = params;
    sxCallArguments.forEach((arg) => {
      if ('kind' in arg) {
        this.dependencies.push(arg);
      }
    });
    this.sxArguments = sxCallArguments;
  }

  build(values: ValueCache) {
    const [sxStyle, elementClassExpression] = this.sxArguments;
    let elementClassName = '';
    if (elementClassExpression.kind === ValueType.LAZY) {
      const elementClassValue = values.get(elementClassExpression.ex.name);
      if (typeof elementClassValue === 'string') {
        elementClassName = elementClassValue;
      }
    }

    let cssText: string = '';
    if (sxStyle.kind === ValueType.CONST) {
      if (sxStyle.ex.type === 'StringLiteral') {
        cssText = sxStyle.ex.value;
      }
    } else {
      const styleObjOrFn = values.get(sxStyle.ex.name);
      cssText = this.processCss(styleObjOrFn, sxStyle);
    }
    const selector = elementClassName ? `.${elementClassName}${this.asSelector}` : this.asSelector;

    if (!cssText) {
      return;
    }

    const rules: Rules = {
      [selector]: {
        className: this.className,
        cssText,
        displayName: this.displayName,
        start: this.location?.start ?? null,
      },
    };
    const replacements: Replacements = [
      {
        length: cssText.length,
        original: {
          start: {
            column: this.location?.start.column ?? 0,
            line: this.location?.start.line ?? 0,
          },
          end: {
            column: this.location?.end.column ?? 0,
            line: this.location?.end.line ?? 0,
          },
        },
      },
    ];
    this.artifacts.push(['css', [rules, replacements]]);
  }

  doEvaltimeReplacement() {
    this.replacer(this.value, false);
  }

  doRuntimeReplacement() {
    const t = this.astService;
    if (this.collectedVariables.length) {
      const varProperties: ReturnType<typeof t.objectProperty>[] = this.collectedVariables.map(
        ([variableId, expression, isUnitLess]) => {
          if (
            expression.type === 'ArrowFunctionExpression' ||
            expression.type === 'FunctionExpression'
          ) {
            return t.objectProperty(
              t.stringLiteral(variableId),
              t.arrayExpression([expression.body as Expression, t.booleanLiteral(isUnitLess)]),
            );
          }
          return t.objectProperty(t.stringLiteral(variableId), t.nullLiteral());
        },
      );

      const obj = t.objectExpression([
        t.objectProperty(t.identifier('className'), t.stringLiteral(this.className)),
        t.objectProperty(t.identifier('vars'), t.objectExpression(varProperties)),
      ]);
      this.replacer(obj, false);
    } else {
      this.replacer(this.value, false);
    }
  }

  get asSelector(): string {
    return `.${this.className}`;
  }

  get value(): Expression {
    return this.astService.stringLiteral(this.className);
  }

  // Implementation taken from Linaria - https://github.com/callstack/linaria/blob/master/packages/react/src/processors/styled.ts#L284
  protected getCustomVariableId(cssKey: string, source: string, hasUnit: boolean) {
    const context = this.getVariableContext(cssKey, source, hasUnit);
    const customSlugFn = this.options.variableNameSlug;
    if (!customSlugFn) {
      return toValidCSSIdentifier(`${this.slug}-${context.index}`);
    }

    return typeof customSlugFn === 'function'
      ? customSlugFn(context)
      : buildSlug(customSlugFn, context);
  }

  // Implementation taken from Linaria - https://github.com/callstack/linaria/blob/master/packages/react/src/processors/styled.ts#L362
  protected getVariableContext(cssKey: string, source: string, hasUnit: boolean): IVariableContext {
    const getIndex = () => {
      // eslint-disable-next-line no-plusplus
      return this.variableIdx++;
    };

    return {
      componentName: this.displayName,
      componentSlug: this.slug,
      get index() {
        return getIndex();
      },
      precedingCss: cssKey,
      processor: this.constructor.name,
      source: '',
      unit: '',
      valueSlug: slugify(`${source}${hasUnit}`),
    };
  }

  private processCss(styleObjOrFn: unknown, expressionValue: ExpressionValue) {
    const { themeArgs } = this.options as IOptions;
    const styleObj = typeof styleObjOrFn === 'function' ? styleObjOrFn(themeArgs) : styleObjOrFn;

    const res = cssFnValueToVariable({
      styleObj,
      expressionValue,
      getVariableName: (cssKey: string, source: string, hasUnit: boolean) =>
        this.getCustomVariableId(cssKey, source, hasUnit),
      filename: this.context.filename,
      options: this.options as IOptions,
    });
    if (res.length) {
      this.collectedVariables.push(...res);
    }

    return processCssObject(styleObj, themeArgs);
  }
}
