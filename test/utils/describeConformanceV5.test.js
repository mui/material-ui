import { expect } from 'chai';
import { validateOptions } from './describeConformanceV5';

describe('Conformance V5', () => {
  it('should throw error if run the tests without required property', () => {
    expect(() => validateOptions({}, ['themeVariants'])).to.throw();
    expect(() => validateOptions({}, ['themeStyleOverrides'])).to.throw();
    expect(() => validateOptions({}, ['themeDefaultProps'])).to.throw();
  });

  it('should not throw error if provided required properties (does not care the type)', () => {
    expect(() =>
      validateOptions({ render: () => {}, muiName: 'Mui' }, [
        'themeVariants',
        'themeStyleOverrides',
        'themeDefaultProps',
      ]),
    ).not.to.throw();
  });

  it('should not throw error if the tests does not need required property (does not care the type)', () => {
    expect(() => validateOptions({}, ['propsSpread'])).not.to.throw();
  });
});
