import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import TextField from '@material-ui/core/TextField';
import Autocomplete from './Autocomplete';

describe('<Autocomplete />', () => {
  let mount;
  let classes;
  const render = createClientRender({ strict: true });
  const defaultProps = {
    renderInput: params => <TextField {...params} label="defaultProps" />,
  };

  before(() => {
    classes = getClasses(<Autocomplete {...defaultProps} />);
    mount = createMount({ strict: true });
  });

  describeConformance(<Autocomplete {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    after: () => mount.cleanUp(),
  }));

  describe('combobox', () => {
    it('should clear the input when blur', () => {
      const { container } = render(<Autocomplete {...defaultProps} />);
      const input = container.querySelector('input');
      input.focus();
      fireEvent.change(input, { target: { value: 'a' } });
      expect(input.value).to.equal('a');
      document.activeElement.blur();
      expect(input.value).to.equal('');
    });
  });

  describe('multiple', () => {
    it('should not crash', () => {
      const { container } = render(<Autocomplete {...defaultProps} multiple />);
      const input = container.querySelector('input');
      input.focus();
      document.activeElement.blur();
      input.focus();
    });
  });
});
