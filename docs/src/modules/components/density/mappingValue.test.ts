import { expect } from 'chai';
import {
  SCALE_KEYS,
  isDensityKey,
  tokenize,
  resolveValue,
  parseMapping,
  previewText,
  shortenDensityVars,
} from './mappingValue';

describe('mappingValue', () => {
  it('exposes the 7-step scale', () => {
    expect(SCALE_KEYS).to.deep.equal([
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large',
    ]);
  });

  it('isDensityKey accepts scale keys only', () => {
    expect(isDensityKey('x-small')).to.equal(true);
    expect(isDensityKey('xx-large')).to.equal(true);
    expect(isDensityKey('12px')).to.equal(false);
    expect(isDensityKey('')).to.equal(false);
  });

  it('tokenize splits on whitespace and drops empties', () => {
    expect(tokenize('  x-small   12px ')).to.deep.equal(['x-small', '12px']);
    expect(tokenize('')).to.deep.equal([]);
  });

  it('resolveValue maps density keys to vars, passes raw CSS through', () => {
    expect(resolveValue('x-small')).to.equal('var(--mui-density-x-small)');
    expect(resolveValue('x-small 12px')).to.equal('var(--mui-density-x-small) 12px');
    expect(resolveValue('2rem')).to.equal('2rem');
  });

  it('resolveValue negates keys with a leading minus', () => {
    expect(resolveValue('-x-small')).to.equal('calc(var(--mui-density-x-small) * -1)');
    expect(resolveValue('-xx-small -small')).to.equal(
      'calc(var(--mui-density-xx-small) * -1) calc(var(--mui-density-small) * -1)',
    );
    expect(resolveValue('-12px')).to.equal('-12px'); // raw negative length untouched
    expect(resolveValue('-foo')).to.equal('-foo'); // not a key → verbatim
  });

  it('parseMapping: empty inert, anything else trusted', () => {
    expect(parseMapping('').state).to.equal('empty');
    expect(parseMapping('x-small').state).to.equal('ok');
    expect(parseMapping('x-small 12px').state).to.equal('ok');
    expect(parseMapping('0px 12px 12px').state).to.equal('ok');
    expect(parseMapping('1px 2px 3px 4px').state).to.equal('ok');
  });

  it('previewText resolves keys AND var refs to px off the scale', () => {
    const scale = { 'x-small': '4px', small: '8px' };
    expect(previewText('x-small small', scale)).to.equal('4px 8px');
    expect(previewText('var(--mui-density-x-small)', scale)).to.equal('4px');
    expect(previewText('var(--mui-density-x-small) var(--mui-density-small)', scale)).to.equal(
      '4px 8px',
    );
    expect(previewText('12px', scale)).to.equal('12px');
    expect(previewText('x-small', null)).to.equal('x-small');
    expect(previewText('var(--mui-density-x-small)', null)).to.equal('x-small');
  });

  it('previewText resolves negated keys and emitted negative calcs', () => {
    const scale = { 'xx-small': '2px', 'x-small': '4px' };
    expect(previewText('-x-small', scale)).to.equal('-4px');
    expect(previewText('calc(var(--mui-density-xx-small) * -1)', scale)).to.equal('-2px');
    expect(previewText('-x-small', null)).to.equal('-x-small');
    expect(previewText('-12px', scale)).to.equal('-12px');
  });

  it('shortenDensityVars shortens var refs to bare step names for placeholders', () => {
    expect(shortenDensityVars('var(--mui-density-x-small) var(--mui-density-large)')).to.equal(
      'x-small large',
    );
    expect(shortenDensityVars('calc(-2px - var(--mui-density-small))')).to.equal(
      'calc(-2px - small)',
    );
    expect(shortenDensityVars('40px')).to.equal('40px');
    expect(shortenDensityVars('')).to.equal('');
  });

  it('shortenDensityVars shortens emitted negative calcs to -<step>', () => {
    expect(shortenDensityVars('calc(var(--mui-density-xx-small) * -1)')).to.equal('-xx-small');
    expect(
      shortenDensityVars('calc(var(--mui-density-x-small) * -1) var(--mui-density-small)'),
    ).to.equal('-x-small small');
  });
});
