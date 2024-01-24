import { validateParams, IOptions as IBaseOptions } from '@linaria/tags';
import type { Expression, Params, TailProcessorParams } from '@linaria/tags';
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
    super(params, ...args);
    if (params.length > 2) {
      // no need to do any processing if it is an already transformed call or just a reference.
      throw BaseProcessor.SKIP;
    }
    validateParams(params, ['callee', 'call'], `Invalid use of ${this.tagSource.imported} tag.`);
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
    if (!theme?.components?.[this.componentName]?.defaultProps) {
      return;
    }

    const useThemePropsImportIdentifier = t.addNamedImport(
      this.tagSource.imported,
      process.env.PACKAGE_NAME as string,
    );

    this.replacer(
      t.callExpression(useThemePropsImportIdentifier, [
        valueToLiteral(theme.components[this.componentName].defaultProps),
      ]),
      true,
    );
  }

  public override get asSelector(): string {
    // For completeness, this is not intended to be used.
    return `.${this.className}`;
  }
}
