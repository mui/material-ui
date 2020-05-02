import { expect } from 'chai';
import createSpacing from './createSpacing';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('createSpacing', () => {
  it('should work as expected', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing(1)).to.equal(8);
    spacing = createSpacing(10);
    expect(spacing(1)).to.equal(10);
    spacing = createSpacing([0, 8, 16]);
    expect(spacing(2)).to.equal(16);
    spacing = createSpacing((factor) => factor ** 2);
    expect(spacing(2)).to.equal(4);
    spacing = createSpacing((factor) => `${0.25 * factor}rem`);
    expect(spacing(2)).to.equal('0.5rem');
  });

  it('should support recursion', () => {
    const spacing = createSpacing();
    createSpacing(spacing);
  });

  it('should support a default value when no arguments are provided', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing()).to.equal(8);
    spacing = createSpacing((factor) => `${0.25 * factor}rem`);
    expect(spacing()).to.equal('0.25rem');
  });

  it('should support multiple arguments', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing(1, 2)).to.equal('8px 16px');
    spacing = createSpacing((factor) => `${0.25 * factor}rem`);
    expect(spacing(1, 2)).to.equal('0.25rem 0.5rem');
  });

  it('should support string arguments', () => {
    let spacing;
    spacing = createSpacing();
    expect(spacing(1, 'auto')).to.equal('8px auto');
    spacing = createSpacing((factor) => `${0.25 * factor}rem`);
    expect(spacing(1, 'auto', 2, 3)).to.equal('0.25rem auto 0.5rem 0.75rem');
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    // TODO v5: remove
    it('should warn for the deprecated API', () => {
      const spacing = createSpacing(11);
      expect(spacing.unit).to.equal(11);
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'theme.spacing.unit usage has been deprecated',
      );
    });

    it('should warn for wrong input', () => {
      createSpacing({
        unit: 4,
      });
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.include(
        'Material-UI: The `theme.spacing` value ([object Object]) is invalid',
      );
    });
  });
});
