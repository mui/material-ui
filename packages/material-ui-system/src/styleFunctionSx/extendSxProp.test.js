import { expect } from 'chai';
import extendSxProp from './extendSxProp';

describe('extendSxProp', () => {
  it('should add system props in the sx prop', () => {
    expect(extendSxProp({ mb: 2, mt: [1, 2, 3] })).to.deep.equal({
      sx: {
        mb: 2,
        mt: [1, 2, 3],
      },
    });
  });

  it('should merge system props with the sx prop', () => {
    expect(extendSxProp({ mb: 2, mt: [1, 2, 3], sx: { mr: 2, mb: 1 } })).to.deep.equal({
      sx: {
        mb: 1,
        mt: [1, 2, 3],
        mr: 2,
      },
    });
  });

  it('should not process non system props', () => {
    expect(extendSxProp({ ariaLabel: 'label', sx: { mr: 2, mb: 1 } })).to.deep.equal({
      sx: {
        mr: 2,
        mb: 1,
      },
      ariaLabel: 'label',
    });
  });
});
