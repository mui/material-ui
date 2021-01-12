import { expect } from 'chai';
import composeClasses from './composeClasses';

describe('composeClasses', () => {
  it('should generate the classes based on the slots', () => {
    expect(
      composeClasses({
        slots: {
          root: ['root', 'standard'],
          slot: ['slot'],
        },
        getUtilityClass: (slot) => `MuiTest-${slot}`,
      }),
    ).to.deep.equal({
      root: 'MuiTest-root MuiTest-standard',
      slot: 'MuiTest-slot',
    });
  });

  it('should consider classes if available', () => {
    expect(
      composeClasses({
        slots: {
          root: ['root', 'standard'],
          slot: ['slot'],
        },
        getUtilityClass: (slot) => `MuiTest-${slot}`,
        classes: {
          standard: 'standardOverride',
          slot: 'slotOverride',
        },
      }),
    ).to.deep.equal({
      root: 'MuiTest-root standardOverride MuiTest-standard',
      slot: 'slotOverride MuiTest-slot',
    });
  });

  it('should ignore false values', () => {
    expect(
      composeClasses({
        slots: {
          root: ['root', false, 'standard'],
          slot: ['slot'],
        },
        getUtilityClass: (slot) => `MuiTest-${slot}`,
        classes: {
          standard: 'standardOverride',
          slot: 'slotOverride',
        },
      }),
    ).to.deep.equal({
      root: 'MuiTest-root standardOverride MuiTest-standard',
      slot: 'slotOverride MuiTest-slot',
    });
  });
});
