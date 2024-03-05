import { Expression } from '@babel/types';
import {
  type Params,
  type TailProcessorParams,
  type ValueCache,
  validateParams,
} from '@wyw-in-js/processor-utils';
import { ValueType, type ExpressionValue, type Replacements, type Rules } from '@wyw-in-js/shared';

import { CSSInterpolation } from '@emotion/css';
import BaseProcessor from './base-processor';
import type { IOptions } from './styled';
import {
  convertAtomicsToCss,
  type Atomics,
  type RuntimeConfig,
} from '../utils/convertAtomicsToCss';
import { css, cache } from '../utils/emotion';
import { valueToLiteral } from '../utils/valueToLiteral';

export class GenerateAtomicsProcessor extends BaseProcessor {
  callParam: ExpressionValue;

  runtimeConfig?: RuntimeConfig;

  constructor(params: Params, ...args: TailProcessorParams) {
    super([params[0]], ...args);
    validateParams(params, ['callee', ['call']], `Invalid use of ${this.tagSource.imported} tag.`);
    const [, callParam] = params;
    const [, callParamArgument] = callParam;
    this.dependencies.push(callParamArgument);
    this.callParam = callParamArgument;
  }

  // eslint-disable-next-line class-methods-use-this
  get asSelector(): string {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line class-methods-use-this
  get value(): Expression {
    throw new Error('Method not implemented.');
  }

  doEvaltimeReplacement(): void {
    this.replacer(this.astService.nullLiteral(), true);
  }

  build(values: ValueCache): void {
    const { themeArgs = {} } = this.options as IOptions;
    const param = this.callParam;
    if (param.kind !== ValueType.CONST) {
      const value =
        param.kind === ValueType.FUNCTION
          ? (values.get(param.ex.name) as (config: unknown) => unknown)(themeArgs)
          : values.get(param.ex.name);
      const { classes, runtimeConfig } = convertAtomicsToCss(
        value as Atomics,
        this.className,
        false,
        this.options.displayName,
      );
      this.runtimeConfig = runtimeConfig;

      classes.forEach(({ className, css: cssObject }) => {
        const emotionClass = css(cssObject as CSSInterpolation);
        const cssText = cache.registered[emotionClass];

        const rules: Rules = {
          [`.${className}`]: {
            cssText,
            className: this.className,
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
      });
    }
  }

  doRuntimeReplacement(): void {
    if (!this.runtimeConfig) {
      this.doEvaltimeReplacement();
      return;
    }
    const { astService: t } = this;
    const importName = t.addNamedImport('atomics', process.env.PACKAGE_NAME as string);
    this.replacer(t.callExpression(importName, [valueToLiteral(this.runtimeConfig)]), true);
  }
}
