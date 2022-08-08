/* eslint-disable default-case */
import createCache from '@emotion/cache';
import { Element, RULESET } from 'stylis';

function globalSelector(element: Element) {
  switch (element.type) {
    case RULESET:
      element.props = (element.props as string[]).map((value: any) => {
        if (value.match(/(:where|:has)\(/)) {
          value = value.replace(/\.[^:]+(:where|:has)/, '$1');
          return value;
        }
        return value;
      });
  }
}

export default function createEmotionCache() {
  // TODO remove prepend: true once JSS is out
  return createCache({ key: 'css', prepend: true, stylisPlugins: [globalSelector] });
}
