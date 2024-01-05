import {
  BaseProcessor as LinariaBaseProcessor,
  toValidCSSIdentifier,
  buildSlug,
} from '@linaria/tags';
import { slugify, type IVariableContext } from '@linaria/utils';

export default abstract class BaseProcessor extends LinariaBaseProcessor {
  variableIdx = 0;

  // Implementation taken from Linaria - https://github.com/callstack/linaria/blob/master/packages/react/src/processors/styled.ts#L284
  protected getCustomVariableId(cssKey: string, source: string, hasUnit: boolean) {
    const context = this.getVariableContext(cssKey, source, hasUnit);
    const customSlugFn = this.options.variableNameSlug;
    if (!customSlugFn) {
      return toValidCSSIdentifier(`${this.slug}-${context.index}`);
    }

    return typeof customSlugFn === 'function'
      ? customSlugFn(context)
      : buildSlug(customSlugFn, { ...context });
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
}
