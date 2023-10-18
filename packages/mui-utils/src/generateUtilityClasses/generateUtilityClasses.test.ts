import { expect } from 'chai';
import { unstable_generateUtilityClasses as generateUtilityClasses } from '@mui/utils';

describe('generateUtilityClasses', () => {
  it('should generate the classes correctly', () => {
    expect(generateUtilityClasses('MuiTest', ['slot1', 'slot2'])).to.deep.equal({
      slot1: 'MuiTest-slot1',
      slot2: 'MuiTest-slot2',
    });
  });

  it('should consider if slot should generate state class', () => {
    expect(
      generateUtilityClasses('MuiTest', [
        'slot',
        'active',
        'checked',
        'disabled',
        'error',
        'focused',
        'focusVisible',
        'required',
        'expanded',
        'selected',
      ]),
    ).to.deep.equal({
      slot: 'MuiTest-slot',
      active: 'Mui-active',
      checked: 'Mui-checked',
      disabled: 'Mui-disabled',
      error: 'Mui-error',
      focused: 'Mui-focused',
      focusVisible: 'Mui-focusVisible',
      required: 'Mui-required',
      expanded: 'Mui-expanded',
      selected: 'Mui-selected',
    });
  });
});
