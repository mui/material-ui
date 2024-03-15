import { validateParams, IOptions as IBaseOptions } from '@wyw-in-js/processor-utils';
import type { Expression, Params, TailProcessorParams } from '@wyw-in-js/processor-utils';
import BaseProcessor from './base-processor';
import { valueToLiteral } from '../utils/valueToLiteral';

type IOptions = IBaseOptions & {
  themeArgs: {
    theme: { components?: Record<string, { defaultProps?: Record<string, unknown> }> };
  };
};

export class CreateUseThemePropsProcessor extends BaseProcessor {
  componentName: string;

  constructor(params: Params, ...args: TailProcessorParams) {
    // this is already transformed if there is an extra argument
    if (params.length > 2) {
      throw BaseProcessor.SKIP;
    }
    validateParams(params, ['callee', 'call'], 'Invalid use of createUseThemeProps tag.');

    super([params[0]], ...args);
    const [, callParam] = params;
    const [, callArg] = callParam;
    if (!callArg || callArg.ex.type !== 'StringLiteral') {
      throw new Error(
        `Invalid usage of \`createUseThemeProps\` tag, expected one string literal argument but got ${callArg?.ex.type}.`,
      );
    }
    this.componentName = callArg.ex.value;
  }

  // eslint-disable-next-line class-methods-use-this
  build(): void {}

  doEvaltimeReplacement(): void {
    this.replacer(this.value, false);
  }

  get value(): Expression {
    return this.astService.nullLiteral();
  }

  doRuntimeReplacement(): void {
    const t = this.astService;

    const { themeArgs: { theme } = {} } = this.options as IOptions;

    const useThemePropsImportIdentifier = t.addNamedImport(
      this.tagSource.imported,
      process.env.PACKAGE_NAME as string,
    );

    let replacement: Expression = t.stringLiteral(this.componentName);
    if (theme?.components?.[this.componentName]?.defaultProps) {
      replacement = valueToLiteral(theme.components[this.componentName].defaultProps);
    }
    this.replacer(t.callExpression(useThemePropsImportIdentifier, [replacement]), true);
  }

  public override get asSelector(): string {
    // For completeness, this is not intended to be used.
    return `.${this.className}`;
  }
}
