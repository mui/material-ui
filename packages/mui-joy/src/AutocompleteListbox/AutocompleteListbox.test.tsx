import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import AutocompleteListbox, {
  autocompleteListboxClasses as classes,
} from '@mui/joy/AutocompleteListbox';
import describeConformance from '../../test/describeConformance';

describe('Joy <AutocompleteListbox />', () => {
  const { render } = createRenderer();

  describeConformance(<AutocompleteListbox />, () => ({
    classes,
    inheritComponent: 'ul',
    render,
    ThemeProvider,
    muiName: 'JoyAutocompleteListbox',
    refInstanceof: window.HTMLUListElement,
    testVariantProps: { variant: 'solid' },
    testCustomVariant: true,
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  it('should have ul tag', () => {
    const { container } = render(<AutocompleteListbox />);
    expect(container.firstChild).to.have.tagName('ul');
  });

  it('should have root className', () => {
    const { container } = render(<AutocompleteListbox />);
    expect(container.firstChild).to.have.class(classes.root);
    expect(container.firstChild).to.have.class(classes.sizeMd);
  });

  it('should accept className prop', () => {
    const { container } = render(<AutocompleteListbox className="foo-bar" />);
    expect(container.firstChild).to.have.class('foo-bar');
  });

  it('should have sm classes', () => {
    const { container } = render(<AutocompleteListbox size="sm" />);
    expect(container.firstChild).to.have.class(classes.sizeSm);
  });

  it('should render with the variant class', () => {
    const { container } = render(<AutocompleteListbox variant="outlined" />);
    expect(container.firstChild).to.have.class(classes.variantOutlined);
  });

  it('should render with primary color class', () => {
    const { container } = render(<AutocompleteListbox color="primary" />);
    expect(container.firstChild).to.have.class(classes.colorPrimary);
  });
});
