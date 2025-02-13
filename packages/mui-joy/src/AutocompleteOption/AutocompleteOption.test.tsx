import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import AutocompleteOption, {
  autocompleteOptionClasses as classes,
} from '@mui/joy/AutocompleteOption';
import describeConformance from '../../test/describeConformance';

describe('Joy <AutocompleteOption />', () => {
  const { render } = createRenderer();

  describeConformance(<AutocompleteOption />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    ThemeProvider,
    muiName: 'JoyAutocompleteOption',
    refInstanceof: window.HTMLLIElement,
    testVariantProps: { color: 'primary' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should have li tag', () => {
    const { getByRole } = render(<AutocompleteOption />);
    expect(getByRole('option')).to.have.tagName('li');
  });

  it('should render with the variant class', () => {
    const { getByRole } = render(<AutocompleteOption variant="outlined" />);
    expect(getByRole('option')).to.have.class(classes.variantOutlined);
  });

  it('should render with primary color class', () => {
    const { getByRole } = render(<AutocompleteOption color="primary" />);
    expect(getByRole('option')).to.have.class(classes.colorPrimary);
  });

  it('should accept className prop', () => {
    const { container } = render(<AutocompleteOption className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });
});
