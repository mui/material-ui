import { expect } from 'chai';
import {
  SCALE_KEYS,
  isDensityKey,
  tokenize,
  resolveValue,
  parseMapping,
  previewText,
} from './mappingValue';

describe('mappingValue', () => {
  it('exposes the 7-step scale', () => {
    expect(SCALE_KEYS).to.deep.equal(['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
  });

  it('isDensityKey accepts scale keys only', () => {
    expect(isDensityKey('xs')).to.equal(true);
    expect(isDensityKey('xxl')).to.equal(true);
    expect(isDensityKey('12px')).to.equal(false);
    expect(isDensityKey('')).to.equal(false);
  });

  it('tokenize splits on whitespace and drops empties', () => {
    expect(tokenize('  xs   12px ')).to.deep.equal(['xs', '12px']);
    expect(tokenize('')).to.deep.equal([]);
  });

  it('resolveValue maps density keys to vars, passes raw CSS through', () => {
    expect(resolveValue('xs')).to.equal('var(--mui-density-xs)');
    expect(resolveValue('xs 12px')).to.equal('var(--mui-density-xs) 12px');
    expect(resolveValue('2rem')).to.equal('2rem');
  });

  it('parseMapping: empty inert, 1-2 tokens ok, >2 error', () => {
    expect(parseMapping('').state).to.equal('empty');
    expect(parseMapping('xs').state).to.equal('ok');
    expect(parseMapping('xs 12px').state).to.equal('ok');
    const bad = parseMapping('a b c');
    expect(bad.state).to.equal('error');
    expect(bad.error).to.equal('max 2 values (block inline)');
  });

  it('previewText resolves keys to px off the scale and shortens var refs', () => {
    const scale = { xs: '4px', sm: '6px' };
    expect(previewText('xs sm', scale)).to.equal('4px 6px');
    expect(previewText('var(--mui-density-xs)', scale)).to.equal('density.xs');
    expect(previewText('12px', scale)).to.equal('12px');
    expect(previewText('xs', null)).to.equal('xs');
  });
});
