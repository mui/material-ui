import { expect } from 'chai';
import { unstable_composeClasses as composeClasses } from '@mui/utils';

describe('composeClasses', () => {
  it('should generate the classes based on the slots', () => {
    expect(
      composeClasses(
        {
          root: ['root', 'standard'],
          slot: ['slot'],
        },
        (slot) => `MuiTest-${slot}`,
      ),
    ).to.deep.equal({
      root: 'MuiTest-root MuiTest-standard',
      slot: 'MuiTest-slot',
    });
  });

  it('should ignore false values', () => {
    expect(
      composeClasses(
        {
          root: ['root', false, 'standard'],
          slot: ['slot'],
        },
        (slot) => `MuiTest-${slot}`,
      ),
    ).to.deep.equal({
      root: 'MuiTest-root MuiTest-standard',
      slot: 'MuiTest-slot',
    });
  });
});
