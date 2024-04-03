import type { Element } from 'stylis';
import { serialize, compile, stringify, middleware } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { type PluginCustomOptions } from './cssFnValueToVariable';

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

function getSerializer(includeRtl?: boolean) {
  if (!includeRtl) {
    return middleware([globalSelector, stringify]);
  }
  return middleware([globalSelector, rtlPlugin, stringify]);
}

const serializer = getSerializer();
const serializerRtl = getSerializer(true);

const stylis = (css: string, serializerParam = serializer) =>
  serialize(compile(css), serializerParam);

const defaultGetDirSelector = (dir: 'ltr' | 'rtl') => `[dir=${dir}]`;

export function preprocessor(
  selector: string,
  cssText: string,
  options?: PluginCustomOptions['css'],
) {
  const {
    defaultDirection = 'ltr',
    generateForBothDir = false,
    getDirSelector = defaultGetDirSelector,
  } = options || {};
  let css = '';
  if (cssText.startsWith('@keyframes')) {
    css += stylis(cssText.replace('@keyframes', `@keyframes ${selector}`));
    return css;
  }
  css += stylis(`${selector}{${cssText}}`);
  if (generateForBothDir) {
    css += stylis(
      `${getDirSelector(defaultDirection === 'ltr' ? 'rtl' : 'ltr')} ${selector}{${cssText}}`,
      serializerRtl,
    );
  }

  return css;
}
