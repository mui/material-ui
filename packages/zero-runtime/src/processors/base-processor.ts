import { slugify, IVariableContext } from '@wyw-in-js/shared';
import {
  buildSlug,
  BaseProcessor as WywBaseProcessor,
  toValidCSSIdentifier,
} from '@wyw-in-js/processor-utils';

export default abstract class BaseProcessor extends WywBaseProcessor {
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
      const id = this.variableIdx;
      this.variableIdx += 1;
      return id;
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
