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
    { children: undefined, text: '-', orientation: undefined },
    { children: ':', text: ':', orientation: 'horizontal' as const },
  ])('renders "$text" as a decorative separator', ({ children, text, orientation }) => {
    render(
      <OTPField length={2} label="Code" classes={{ separator: 'custom-separator' }}>
        <OTPFieldInput />
        <OTPFieldSeparator orientation={orientation} className={(state) => state.orientation}>
          {children}
        </OTPFieldSeparator>
        <OTPFieldInput />
      </OTPField>,
    );
    const separator = screen.getByText(text);
    expect(separator).to.have.attribute('aria-hidden', 'true');
    expect(separator).to.have.class(classes.separator).and.have.class('custom-separator');
    expect(separator).to.have.class(orientation ?? 'vertical');
  });
});
