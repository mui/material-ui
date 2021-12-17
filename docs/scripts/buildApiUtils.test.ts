import { expect } from 'chai';
import { findComponentDemos, getMuiName } from './buildApiUtils';

describe('buildApiUtils', () => {
  it('findComponentDemos return matched component', () => {
    expect(
      findComponentDemos('Accordion', [
        {
          pathname: '/material/components/accordion',
          components: ['Accordion', 'AccordionDetails'],
        },
        {
          pathname: '/material/components/accordion-details',
          components: ['Accordion', 'AccordionDetails'],
        },
      ]),
    ).to.deep.equal(['/material/components/accordion', '/material/components/accordion-details']);
  });

  it('getMuiName return name without Unstyled', () => {
    expect(getMuiName('ButtonUnstyled')).to.equal('MuiButton');
  });

  it('getMuiName return name without Styled', () => {
    expect(getMuiName('StyledInputBase')).to.equal('MuiInputBase');
  });
});
