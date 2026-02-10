import type { Element } from 'stylis';
import { serialize, compile, stringify, middleware } from 'stylis';

function globalSelector(element: Element) {
  switch (element.type) {
    case 'rule':
      element.props = (element.props as string[]).map((value) => {
        if (value.match(/(:where|:is)\(/)) {
          value = value.replace(/\.[^:]+(:where|:is)/, '$1');
          return value;
        }
        return value;
      });
      break;
    default:
      break;
  }
}

const serializer = middleware([globalSelector, stringify]);

const stylis = (css: string) => serialize(compile(css), serializer);

export function preprocessor(selector: string, cssText: string) {
  if (cssText.startsWith('@keyframes')) {
    return stylis(cssText.replace('@keyframes', `@keyframes ${selector}`));
  }
  return stylis(`${selector}{${cssText}}`);
}
