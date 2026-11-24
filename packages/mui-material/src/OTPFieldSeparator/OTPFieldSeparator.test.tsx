import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import OTPField, {
  OTPFieldInput,
  OTPFieldSeparator,
  otpFieldClasses as classes,
} from '@mui/material/OTPField';

describe('<OTPFieldSeparator />', () => {
  const { render } = createRenderer();

  it.each([
    { children: undefined, text: '-' },
    { children: ':', text: ':' },
  ])('renders "$text" as a decorative separator between the inputs', ({ children, text }) => {
    render(
      <OTPField length={2} label="Code" classes={{ separator: 'custom-separator' }}>
        <OTPFieldInput />
        <OTPFieldSeparator>{children}</OTPFieldSeparator>
        <OTPFieldInput />
      </OTPField>,
    );
    const separator = screen.getByText(text);
    expect(separator).to.have.attribute('aria-hidden', 'true');
    expect(separator).to.have.class(classes.separator).and.have.class('custom-separator');
    expect(screen.getByRole('textbox', { name: 'Code' }).nextElementSibling).to.equal(separator);
  });
});
