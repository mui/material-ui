import { expect } from 'chai';
import composeClasses from './composeClasses';

describe('composeClasses', () => {
  it('should generate the classes based on the slots', () => {
    expect(
      composeClasses(
        {
          root: ['root', 'standard'],
          slot: ['slot'],
        },
        (slot) => `MuiTest-${slot}`,
        undefined,
      ),
    ).to.deep.equal({
      root: 'MuiTest-root MuiTest-standard',
      slot: 'MuiTest-slot',
    });
  });

  it('should consider classes if available', () => {
    expect(
      composeClasses(
        {
          root: ['root', 'standard'],
          slot: ['slot'],
        },
        (slot) => `MuiTest-${slot}`,
        {
          standard: 'standardOverride',
          slot: 'slotOverride',
        },
      ),
    ).to.deep.equal({
      root: 'MuiTest-root standardOverride MuiTest-standard',
      slot: 'slotOverride MuiTest-slot',
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
        {
          standard: 'standardOverride',
          slot: 'slotOverride',
        },
      ),
    ).to.deep.equal({
      root: 'MuiTest-root standardOverride MuiTest-standard',
      slot: 'slotOverride MuiTest-slot',
    });
  });
});
