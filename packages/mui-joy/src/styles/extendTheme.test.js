import { expect } from 'chai';
import extendTheme from './extendTheme';

describe('extendTheme', () => {
  it('the output contains required fields', () => {
    const result = extendTheme();
    Object.keys(result).forEach((field) => {
      expect([
        'breakpoints',
        'components',
        'colorSchemes',
        'focus',
        'fontSize',
        'fontFamily',
        'fontWeight',
        'letterSpacing',
        'lineHeight',
        'getCssVar',
        'spacing',
        'radius',
        'shadow',
        'typography',
        'variants',
      ]).to.includes(field);
    });
  });
});
