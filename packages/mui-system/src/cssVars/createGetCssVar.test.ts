import { expect } from 'chai';
import createGetCssVar from './createGetCssVar';

describe('createGetCssVar', () => {
  describe('default without prefix', () => {
    const getThemeVar = createGetCssVar();
    it('should return correct CSS var with default prefix', () => {
      expect(getThemeVar('palette-primary-500')).to.equal('var(--palette-primary-500)');
    });

    it('should return correct CSS var with prefix', () => {
      expect(getThemeVar('palette-primary-500')).to.equal('var(--palette-primary-500)');
    });

    it('support default value', () => {
      expect(getThemeVar('palette-primary-500', 'palette-background-body')).to.equal(
        'var(--palette-primary-500, var(--palette-background-body))',
      );
    });

    it('support nested values', () => {
      expect(
        getThemeVar('palette-primary-500', 'palette-primary-600', 'palette-text-primary'),
      ).to.equal(
        'var(--palette-primary-500, var(--palette-primary-600, var(--palette-text-primary)))',
      );
    });
  });

  it('able to custom prefix', () => {
    const getThemeVar = createGetCssVar('custom');
    expect(getThemeVar('shadow-xs')).to.equal('var(--custom-shadow-xs)');
  });
});
