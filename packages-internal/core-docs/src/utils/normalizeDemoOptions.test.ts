import { expect } from 'chai';
import { normalizeDemoOptions } from './normalizeDemoOptions';

describe('normalizeDemoOptions', () => {
  it('maps defaultCodeOpen=true to initialExpanded', () => {
    expect(normalizeDemoOptions({ defaultCodeOpen: true, bg: 'inline' })).to.deep.equal({
      initialExpanded: true,
      bg: 'inline',
    });
  });

  it('maps defaultCodeOpen=false to collapseToEmpty', () => {
    expect(normalizeDemoOptions({ defaultCodeOpen: false, bg: 'inline' })).to.deep.equal({
      collapseToEmpty: true,
      bg: 'inline',
    });
  });

  it('leaves modern display options unchanged when defaultCodeOpen is unset', () => {
    expect(normalizeDemoOptions({ initialExpanded: true, collapseToEmpty: false })).to.deep.equal({
      initialExpanded: true,
      collapseToEmpty: false,
    });
  });
});
