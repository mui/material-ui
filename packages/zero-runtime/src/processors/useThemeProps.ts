import { validateParams, BaseProcessor } from '@linaria/tags';
import type { Expression, Params, TailProcessorParams } from '@linaria/tags';

export class UseThemePropsProcessor extends BaseProcessor {
  constructor(params: Params, ...args: TailProcessorParams) {
    super(params, ...args);
    validateParams(params, ['callee', 'call'], BaseProcessor.SKIP);
  }

  build(): void {}

  doEvaltimeReplacement(): void {}

  get value(): Expression {
    return this.astService.nullLiteral();
  }

  /**
   * Add `theme` config to the `createUseThemeProps` call argument:
   *
   * ```diff
   * - const useThemeProps = createUseThemeProps();
   * + const useThemeProps = createUseThemeProps(theme);
   * ```
   */
  doRuntimeReplacement(): void {
    const t = this.astService;

    const useThemePropsImportIdentifier = t.addNamedImport(
      this.tagSource.imported,
      process.env.PACKAGE_NAME as string,
    );
    console.log('useThemePropsImportIdentifier', useThemePropsImportIdentifier);

    const themeImportIdentifier = this.astService.addDefaultImport(
      `${process.env.PACKAGE_NAME}/theme`,
      'theme',
    );

    console.log('themeImportIdentifier', themeImportIdentifier);

    this.replacer(
      t.callExpression(useThemePropsImportIdentifier, [t.identifier(themeImportIdentifier.name)]),
      true,
    );
    console.log(this.tagSourceCode());
  }

  public override get asSelector(): string {
    return `.${this.className}`;
  }
}
