import type { Expression } from '@babel/types';
import { validateParams } from '@linaria/tags';
import type {
  CallParam,
  TemplateParam,
  Params,
  TailProcessorParams,
  ValueCache,
} from '@linaria/tags';
import type { Replacements, Rules } from '@linaria/utils';
import { ValueType } from '@linaria/utils';
import type { CSSInterpolation } from '@emotion/css';
import BaseProcessor from './base-processor';
import type { IOptions } from './styled';
import { cache, keyframes } from '../utils/emotion';

type Primitive = string | number | boolean | null | undefined;

export class KeyframesProcessor extends BaseProcessor {
  callParam: CallParam | TemplateParam;

  constructor(params: Params, ...args: TailProcessorParams) {
    super(params, ...args);
    if (params.length < 2) {
      throw BaseProcessor.SKIP;
    }
    validateParams(
      params,
      ['callee', ['call', 'template']],
      `Invalid use of ${this.tagSource.imported} tag.`,
    );

    const [, callParams] = params;
    if (callParams[0] === 'call') {
      this.dependencies.push(callParams[1]);
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
    const templateExpressions: Primitive[] = [];
    callArgs.forEach((item) => {
      if ('kind' in item) {
        switch (item.kind) {
          case ValueType.FUNCTION:
            throw item.buildCodeFrameError(
              'Functions are not allowed to be interpolated in keyframes tag.',
            );
          case ValueType.CONST:
            templateExpressions.push(item.value);
            break;
          case ValueType.LAZY: {
            const evaluatedValue = values.get(item.ex.name);
            if (typeof evaluatedValue === 'function') {
              throw item.buildCodeFrameError(
                'Functions are not allowed to be interpolated in keyframes tag.',
              );
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
      }
    });
    this.generateArtifacts(templateStrs, ...templateExpressions);
  }

  generateArtifacts(styleObjOrTaggged: CSSInterpolation | string[], ...args: Primitive[]) {
    const keyframeName = keyframes(styleObjOrTaggged, ...args);
    const cacheCssText = cache.inserted[keyframeName.replace('animation-', '')] as string;
    const cssText = cacheCssText.replaceAll(keyframeName, '');

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

  private handleCall([, callArg]: CallParam, values: ValueCache) {
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
      this.generateArtifacts(styleObj);
    }
  }

  doEvaltimeReplacement() {
    this.replacer(this.value, false);
  }

  doRuntimeReplacement() {
    this.doEvaltimeReplacement();
  }

  get asSelector() {
    return this.className;
  }

  get value(): Expression {
    return this.astService.stringLiteral(this.className);
  }
}
