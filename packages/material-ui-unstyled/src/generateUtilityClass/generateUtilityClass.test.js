import { expect } from 'chai';
import generateUtilityClass from './generateUtilityClass';

describe('generateUtilityClass', () => {
  it('should generate the class correctly', () => {
    expect(generateUtilityClass('MuiTest', 'slot')).to.equal('MuiTest-slot');
  });

  it('should consider if slot should generate pseudo class', () => {
    expect(generateUtilityClass('MuiTest', 'active')).to.equal('Mui-active');
    expect(generateUtilityClass('MuiTest', 'checked')).to.equal('Mui-checked');
    expect(generateUtilityClass('MuiTest', 'disabled')).to.equal('Mui-disabled');
    expect(generateUtilityClass('MuiTest', 'error')).to.equal('Mui-error');
    expect(generateUtilityClass('MuiTest', 'focused')).to.equal('Mui-focused');
    expect(generateUtilityClass('MuiTest', 'focusVisible')).to.equal('Mui-focusVisible');
    expect(generateUtilityClass('MuiTest', 'required')).to.equal('Mui-required');
    expect(generateUtilityClass('MuiTest', 'expanded')).to.equal('Mui-expanded');
    expect(generateUtilityClass('MuiTest', 'selected')).to.equal('Mui-selected');
  });
});
