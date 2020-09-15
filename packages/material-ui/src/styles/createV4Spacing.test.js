import { expect } from 'chai';
import createV4Spacing from './createV4Spacing';

describe('createV4Spacing', () => {
  it('should work as expected', () => {
    let spacing;
    spacing = createV4Spacing();
    expect(spacing(1)).to.equal(8);
    spacing = createV4Spacing(10);
    expect(spacing(1)).to.equal(10);
    spacing = createV4Spacing([0, 8, 16]);
    expect(spacing(2)).to.equal(16);
    spacing = createV4Spacing((factor) => factor ** 2);
    expect(spacing(2)).to.equal(4);
    spacing = createV4Spacing((factor) => `${0.25 * factor}rem`);
    expect(spacing(2)).to.equal('0.5rem');
  });

  it('should support recursion', () => {
    const spacing = createV4Spacing();
    createV4Spacing(spacing);
  });

  it('should support a default value when no arguments are provided', () => {
    let spacing;
    spacing = createV4Spacing();
    expect(spacing()).to.equal(8);
    spacing = createV4Spacing((factor) => `${0.25 * factor}rem`);
    expect(spacing()).to.equal('0.25rem');
  });

  it('should support multiple arguments', () => {
    let spacing;
    spacing = createV4Spacing();
    expect(spacing(1, 2)).to.equal('8px 16px');
    spacing = createV4Spacing((factor) => `${0.25 * factor}rem`);
    expect(spacing(1, 2)).to.equal('0.25rem 0.5rem');
  });

  it('should support string arguments', () => {
    let spacing;
    spacing = createV4Spacing();
    expect(spacing(1, 'auto')).to.equal('8px auto');
    spacing = createV4Spacing((factor) => `${0.25 * factor}rem`);
    expect(spacing(1, 'auto', 2, 3)).to.equal('0.25rem auto 0.5rem 0.75rem');
  });

  describe('warnings', () => {
    it('should warn for wrong input', () => {
      expect(() => {
        createV4Spacing({
          unit: 4,
        });
      }).toErrorDev('Material-UI: The `theme.spacing` value ([object Object]) is invalid');
    });
  });
});
