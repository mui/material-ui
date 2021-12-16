import { expect } from 'chai';
import { getComponentUrl, getApiUrl, findComponentDemos, getMuiName } from './buildApiUtils';

describe('buildApiUtils', () => {
  it('getProductUrl correctly', () => {
    expect(
      getComponentUrl(
        `/Users/siriwatknp/Personal-Repos/material-ui/docs/products/material/components/menus/menus.md`,
      ),
    ).to.equal(`/material/components/menus`);
    expect(
      getComponentUrl(
        `/Users/siriwatknp/Personal-Repos/material-ui/docs/products/base/components/button-unstyled/button-unstyled.md`,
      ),
    ).to.equal(`/base/components/button-unstyled`);
  });

  it('getApiUrl correctly', () => {
    expect(
      getApiUrl(
        `/Users/siriwatknp/Personal-Repos/material-ui/docs/products/material/components/menus/menus.md`,
      ),
    ).to.equal(`/material/api/menus`);
    expect(
      getApiUrl(
        `/Users/siriwatknp/Personal-Repos/material-ui/docs/products/base/components/button-unstyled/button-unstyled.md`,
      ),
    ).to.equal(`/base/api/button-unstyled`);
  });

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
