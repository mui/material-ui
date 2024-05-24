import { expect } from 'chai';
import createSpacing, { Spacing } from './createSpacing';

describe('createSpacing', () => {
  it('should be configurable', () => {
    let spacing: Spacing;
    spacing = createSpacing();
    expect(spacing(1)).to.equal('8px');
    spacing = createSpacing(10);
    expect(spacing(1)).to.equal('10px');
    spacing = createSpacing([0, 8, 16]);
    expect(spacing(2)).to.equal('16px');
    spacing = createSpacing(['0rem', '8rem', '16rem']);
    expect(spacing(2)).to.equal('16rem');
    spacing = createSpacing((factor: number) => factor ** 2);
    expect(spacing(2)).to.equal('4px');
    spacing = createSpacing((factor: number) => `${0.25 * factor}rem`);
    expect(spacing(2)).to.equal('0.5rem');
    spacing = createSpacing('0.5rem');
    expect(spacing(2)).to.equal('calc(2 * 0.5rem)');
  });

  it('should support recursion', () => {
    const spacing = createSpacing();
    createSpacing(spacing);
  });

  it('should support a default value when no arguments are provided', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing()).to.equal('8px');
    spacing = createSpacing((factor: number) => `${0.25 * factor}rem`);
    expect(spacing()).to.equal('0.25rem');
  });

  it('should support multiple arguments', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing(1, 2)).to.equal('8px 16px');
    spacing = createSpacing((factor: number) => `${0.25 * factor}rem`);
    expect(spacing(1, 2)).to.equal('0.25rem 0.5rem');
  });

  it('should support string arguments', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing(1, 'auto')).to.equal('8px auto');
    spacing = createSpacing((factor: number | string) =>
      typeof factor === 'string' ? factor : `${0.25 * factor}rem`,
    );
    expect(spacing(1, 'auto', 2, 3)).to.equal('0.25rem auto 0.5rem 0.75rem');
  });

  describe('warnings', () => {
    it('should warn for wrong input', () => {
      expect(() => {
        createSpacing({
          // @ts-expect-error
          unit: 4,
        });
      }).toErrorDev('MUI: The `theme.spacing` value ([object Object]) is invalid');
    });
  });
});
