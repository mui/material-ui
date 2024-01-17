import { validateParams, BaseProcessor } from '@linaria/tags';
import type { Expression, Params, TailProcessorParams } from '@linaria/tags';
import { parseExpression } from '@babel/parser';
import { ObjectExpression } from '@babel/types';

export class UseThemePropsProcessor extends BaseProcessor {
  tagParams: ObjectExpression;

  constructor(params: Params, ...args: TailProcessorParams) {
    super(params, ...args);
    validateParams(params, ['callee', 'call'], `Invalid use of ${this.tagSource.imported} tag.`);
    const [, [, tagParams]] = params;
    console.log('tagParams.source', tagParams.source);
    this.tagParams = parseExpression(tagParams.source) as ObjectExpression;
  }

  build(): void {}

  doEvaltimeReplacement(): void {}

  get value(): Expression {
    return this.astService.nullLiteral();
  }

  /**
   * ```js
   * const props = useThemeProps({
   *   theme: themeConfig,
   *   props,
   *
   * })
   * ```
   */
  doRuntimeReplacement(): void {
    const t = this.astService;

    const useThemePropsImportIdentifier = t.addNamedImport(
      this.tagSource.imported,
      process.env.PACKAGE_NAME as string,
    );

    const themeImportIdentifier = this.astService.addDefaultImport(
      `${process.env.PACKAGE_NAME}/theme`,
      'theme',
    );

    this.tagParams.properties.push(t.objectProperty(t.identifier('theme'), themeImportIdentifier));

    this.replacer(t.callExpression(useThemePropsImportIdentifier, [this.tagParams]), true);
  }

  public override get asSelector(): string {
    return `.${this.className}`;
  }
}
