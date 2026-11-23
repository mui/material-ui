import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, screen, within } from '@mui/internal-test-utils';
import OTPField, {
  OTPFieldInput,
  OTPFieldSeparator,
  otpFieldClasses as classes,
} from '@mui/material/OTPField';

describe('<OTPFieldInput />', () => {
  const { render } = createRenderer();

  it('keeps the first input ref attached while editing and releases it when replaced', async () => {
    const cleanup = vi.fn();
    const inputRef = vi.fn(() => cleanup);
    const nextRef = React.createRef<HTMLInputElement>();
    const { user, rerender, unmount } = render(<OTPField label="Code" inputRef={inputRef} />);
    const first = screen.getByRole('textbox', { name: 'Code' });
    inputRef.mockClear();
    cleanup.mockClear();

    await user.click(first);
    await user.keyboard('01');
    expect(inputRef).not.toHaveBeenCalled();
    expect(cleanup).not.toHaveBeenCalled();

    rerender(<OTPField label="Code" inputRef={nextRef} />);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(nextRef.current).to.equal(first);
    unmount();
    expect(nextRef.current).to.equal(null);
  });

  it('keeps one code and navigates across a decorative separator and a nested input', async () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const firstRef = React.createRef<HTMLInputElement>();
    const lastRef = React.createRef<HTMLInputElement>();
    const onComplete = vi.fn();
    function LastDigit() {
      return <OTPFieldInput ref={lastRef} aria-label="Check digit" />;
    }
    const { user } = render(
      <form aria-label="Sign in">
        <OTPField
          label="Code"
          length={3}
          name="code"
          inputRef={inputRef}
          onValueComplete={onComplete}
          classes={{ separator: 'custom-separator' }}
        >
          <OTPFieldInput ref={firstRef} />
          <OTPFieldInput />
          <OTPFieldSeparator />
          <LastDigit />
        </OTPField>
      </form>,
    );

    const group = screen.getByRole('group', { name: 'Code' });
    const [first, second, last] = within(group).getAllByRole('textbox');
    expect(first).to.equal(firstRef.current).and.equal(inputRef.current);
    expect(second).toHaveAccessibleName('Character 2 of 3');
    expect(last).toHaveAccessibleName('Check digit');
    expect(last).to.equal(lastRef.current);
    expect(screen.getByText('-'))
      .to.have.class(classes.separator)
      .and.have.class('custom-separator');
    expect(within(group).queryByRole('separator')).to.equal(null);
    expect(second.nextElementSibling).to.equal(screen.getByText('-'));

    await user.click(screen.getByText('Code'));
    await user.keyboard('01');
    expect(last).toHaveFocus();
    await user.keyboard('2{ArrowLeft}');
    expect(second).toHaveFocus();
    expect(onComplete.mock.calls.map(([code]) => code)).to.deep.equal(['012']);
    expect(new FormData(screen.getByRole<HTMLFormElement>('form')).getAll('code')).to.deep.equal([
      '012',
    ]);
  });
});
