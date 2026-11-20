import * as React from 'react';
import { describe, expect, it } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import OTPField, { OTPFieldInput, OTPFieldSeparator } from '@mui/material/OTPField';

describe('<OTPFieldSeparator />', () => {
  const { render } = createRenderer();

  it('renders explicit separator content in place of the default hyphen', () => {
    render(
      <OTPField length={2} label="Code">
        <OTPFieldInput />
        <OTPFieldSeparator>:</OTPFieldSeparator>
        <OTPFieldInput />
      </OTPField>,
    );
    expect(screen.getByText(':')).to.have.attribute('aria-hidden', 'true');
    expect(screen.queryByText('-')).to.equal(null);
  });
});
