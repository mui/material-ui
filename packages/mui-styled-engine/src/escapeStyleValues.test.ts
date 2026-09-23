import { describe, it, expect } from 'vitest';
import { keyframes } from '@emotion/react';
import escapeStyleValues from './escapeStyleValues';

describe('escapeStyleValues', () => {
  it('escapes braces and semicolons in a property value', () => {
    expect(escapeStyleValues({ color: 'red;} body{color:blue} .x{' })).to.deep.equal({
      color: 'red\\3b \\7d  body\\7b color:blue\\7d  .x\\7b ',
    });
  });

  it('escapes values in nested selectors and media queries', () => {
    expect(
      escapeStyleValues({
        '&:hover': { color: 'red}' },
        '@media (min-width: 600px)': { color: 'blue{' },
      }),
    ).to.deep.equal({
      '&:hover': { color: 'red\\7d ' },
      '@media (min-width: 600px)': { color: 'blue\\7b ' },
    });
  });

  it('escapes fallback values', () => {
    expect(escapeStyleValues({ display: ['flex', 'grid}'] })).to.deep.equal({
      display: ['flex', 'grid\\7d '],
    });
  });

  it('escapes the styles in an array', () => {
    expect(escapeStyleValues([{ color: 'red}' }, { margin: 0 }])).to.deep.equal([
      { color: 'red\\7d ' },
      { margin: 0 },
    ]);
  });

  it('leaves a string used as a whole style alone', () => {
    expect(escapeStyleValues('body { color: red; }')).to.equal('body { color: red; }');
    expect(escapeStyleValues(['body { color: red; }'])).to.deep.equal(['body { color: red; }']);
  });

  it('leaves serialized styles alone', () => {
    const serialized = { name: 'x', styles: 'color:red;}body{color:blue;' };
    expect(escapeStyleValues(serialized)).to.equal(serialized);
  });

  it('keeps keyframes interpolated into a value', () => {
    const spin = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });
    const style = { animation: `${spin} 1s linear infinite` };
    expect(escapeStyleValues(style)).to.equal(style);
  });

  it('escapes the part of a value around interpolated keyframes', () => {
    const spin = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });
    const embedded = `${spin}`;
    expect(escapeStyleValues({ animation: `${embedded} 1s} body{color:blue` })).to.deep.equal({
      animation: `${embedded} 1s\\7d  body\\7b color:blue`,
    });
  });

  it('drops a trailing semicolon', () => {
    expect(escapeStyleValues({ backgroundImage: 'url("a.png");' })).to.deep.equal({
      backgroundImage: 'url("a.png")',
    });
  });

  it('returns the same object when nothing needs escaping', () => {
    const style = { color: 'red', '&:hover': { color: 'blue' }, display: ['flex', 'grid'] };
    expect(escapeStyleValues(style)).to.equal(style);
  });

  it('does not mutate the input', () => {
    const style = { color: 'red}', '&:hover': { color: 'blue}' } };
    escapeStyleValues(style);
    expect(style).to.deep.equal({ color: 'red}', '&:hover': { color: 'blue}' } });
  });
});
