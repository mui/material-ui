import * as React from 'react';
import { expect } from 'chai';
import { createMount, createRenderer, describeConformanceUnstyled, act } from 'test/utils';
import InputUnstyled, { inputUnstyledClasses } from '@mui/base/InputUnstyled';
import FormControlUnstyled, { FormControlUnstyledContext } from '@mui/base/FormControlUnstyled';

describe('<InputUnstyled />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<InputUnstyled />, () => ({
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    muiName: 'MuiInput',
    slots: {
      root: {
        expectedClassName: inputUnstyledClasses.root,
      },
      input: {
        expectedClassName: inputUnstyledClasses.input,
        testWithElement: 'input',
      },
    },
  }));

  it('inherit focused from FormControl', () => {
    const { container } = render(
      <FormControlUnstyled focused>
        <InputUnstyled />
      </FormControlUnstyled>,
    );
    expect(container.firstChild?.firstChild).to.have.class(inputUnstyledClasses.focused);
  });

  describe('Custom form control', () => {
    const FormField = ({
      children,
      error,
      disabled,
      required,
    }: React.PropsWithChildren<{ error?: boolean; disabled?: boolean; required?: boolean }>) => {
      const [focused, setFocused] = React.useState(false);
      return (
        <FormControlUnstyledContext.Provider
          value={{
            error,
            disabled,
            required,
            focused,
            onFocus: () => setFocused(true),
            onBlur: () => setFocused(false),
          }}
        >
          {children}
          {focused && <span data-testid="focused" />}
        </FormControlUnstyledContext.Provider>
      );
    };

    it('context: error', () => {
      const { container } = render(
        <FormField error>
          <InputUnstyled />
        </FormField>,
      );
      expect(container.firstChild).to.have.class(inputUnstyledClasses.error);
    });

    it('context: disabled', () => {
      const { container } = render(
        <FormField disabled>
          <InputUnstyled />
        </FormField>,
      );
      expect(container.firstChild).to.have.class(inputUnstyledClasses.disabled);
    });

    it('context: required', () => {
      const { getByRole } = render(
        <FormField required>
          <InputUnstyled />
        </FormField>,
      );
      expect(getByRole('textbox')).to.have.attribute('required');
    });

    it('context: focused', () => {
      const { getByTestId, getByRole, queryByTestId } = render(
        <FormField>
          <InputUnstyled />
        </FormField>,
      );
      act(() => {
        getByRole('textbox').focus();
      });
      expect(getByTestId('focused')).toBeVisible();

      act(() => {
        getByRole('textbox').blur();
      });
      expect(queryByTestId('focused')).to.equal(null);
    });
  });
});
