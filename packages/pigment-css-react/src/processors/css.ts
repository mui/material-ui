import type { Expression } from '@babel/types';
import { validateParams } from '@wyw-in-js/processor-utils';
import type {
  CallParam,
  TemplateParam,
  Params,
  TailProcessorParams,
  ValueCache,
} from '@wyw-in-js/processor-utils';
import type { Replacements, Rules } from '@wyw-in-js/shared';
import { ValueType } from '@wyw-in-js/shared';
import type { CSSInterpolation } from '@emotion/css';
import deepMerge from 'lodash/merge';
import BaseProcessor from './base-processor';
import type { IOptions } from './styled';
import { cache, css } from '../utils/emotion';
import type { Primitive, TemplateCallback } from './keyframes';

/**
 * @description Scope css class generation similar to css from emotion.
 *
 * @example
 * ```ts
 * import { css } from '@pigment-css/react';
 *
 * const class1 = css(({theme}) => ({
 *  color: (theme.vars || theme).palette.primary.main,
 * }))
 * ```
 *
 * <html className={class1} />
 */
export class CssProcessor extends BaseProcessor {
  callParam: CallParam | TemplateParam;

  constructor(params: Params, ...args: TailProcessorParams) {
    if (params.length < 2) {
      throw BaseProcessor.SKIP;
    }
    super([params[0]], ...args);
    validateParams(
      params,
      ['callee', ['call', 'template']],
      `Invalid use of ${this.tagSource.imported} tag.`,
    );

    const [, callParams] = params;
    if (callParams[0] === 'call') {
      const [, ...callArgs] = callParams;
      this.dependencies.push(...callArgs);
    } else if (callParams[0] === 'template') {
      callParams[1].forEach((element) => {
        if ('kind' in element && element.kind !== ValueType.CONST) {
          this.dependencies.push(element);
        }
      });
    }
    this.callParam = callParams;
  }

  build(values: ValueCache) {
    if (this.artifacts.length > 0) {
      throw new Error(`MUI: "${this.tagSource.imported}" is already built`);
    }

    const [callType] = this.callParam;

    if (callType === 'template') {
      this.handleTemplate(this.callParam, values);
    } else {
      this.handleCall(this.callParam, values);
    }
  }

  private handleTemplate([, callArgs]: TemplateParam, values: ValueCache) {
    const templateStrs: string[] = [];
    // @ts-ignore @TODO - Fix this. No idea how to initialize a Tagged String array.
    templateStrs.raw = [];
    const templateExpressions: Primitive[] = [];
    const { themeArgs } = this.options as IOptions;

    callArgs.forEach((item) => {
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
      } else if (item.type === 'TemplateElement') {
        templateStrs.push(item.value.cooked as string);
        // @ts-ignore
        templateStrs.raw.push(item.value.raw);
      }
    });
    this.generateArtifacts(templateStrs, ...templateExpressions);
  }

  generateArtifacts(styleObjOrTaggged: CSSInterpolation | string[], ...args: Primitive[]) {
    const cssClassName = css(styleObjOrTaggged, ...args);
    const cssText = cache.registered[cssClassName] as string;

    const rules: Rules = {
      [this.asSelector]: {
        className: this.className,
        cssText,
        displayName: this.displayName,
        start: this.location?.start ?? null,
      },
    };
    const sourceMapReplacements: Replacements = [
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
    this.artifacts.push(['css', [rules, sourceMapReplacements]]);
  }

  private handleCall([, ...callArgs]: CallParam, values: ValueCache) {
    const mergedStyleObj: CSSInterpolation = {};

    callArgs.forEach((callArg) => {
      let styleObj: CSSInterpolation;
      if (callArg.kind === ValueType.LAZY) {
        styleObj = values.get(callArg.ex.name) as CSSInterpolation;
      } else if (callArg.kind === ValueType.FUNCTION) {
        const { themeArgs } = this.options as IOptions;
        const value = values.get(callArg.ex.name) as (
          args: Record<string, unknown> | undefined,
        ) => CSSInterpolation;
        styleObj = value(themeArgs);
      }

      if (styleObj) {
        deepMerge(mergedStyleObj, styleObj);
      }
    });
    if (Object.keys(mergedStyleObj).length > 0) {
      this.generateArtifacts(mergedStyleObj);
    }
  }

  doEvaltimeReplacement() {
    this.replacer(this.value, false);
  }

  doRuntimeReplacement() {
    this.doEvaltimeReplacement();
  }

  get asSelector() {
    return `.${this.className}`;
  }

  get value(): Expression {
    return this.astService.stringLiteral(this.className);
  }
}
