import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import OTPField, { OTPFieldInput, OTPFieldSeparator } from '@mui/material/OTPField';

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

  it('submits one code from composed inputs and forwards their refs', async () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const firstRef = React.createRef<HTMLInputElement>();
    const lastRef = React.createRef<HTMLInputElement>();
    const onValueComplete = vi.fn();
    function LastDigit() {
      return <OTPFieldInput ref={lastRef} aria-label="Check digit" />;
    }
    const { user } = render(
      <form aria-label="Sign in">
        <OTPField
          label="Code"
          length={3}
          name="code"
          defaultValue="01"
          inputRef={inputRef}
          onValueComplete={onValueComplete}
        >
          <OTPFieldInput ref={firstRef} />
          <OTPFieldInput />
          <OTPFieldSeparator />
          <LastDigit />
        </OTPField>
      </form>,
    );

    const [first, second, last] = screen.getAllByRole('textbox');
    expect(first).to.equal(firstRef.current).and.equal(inputRef.current);
    expect(first).to.have.value('0');
    expect(second).to.have.value('1');
    expect(last).toHaveAccessibleName('Check digit');
    expect(last).to.equal(lastRef.current);

    await user.type(last, '2');
    expect(onValueComplete).toHaveBeenCalledWith('012', expect.anything());
    expect(new FormData(screen.getByRole<HTMLFormElement>('form')).getAll('code')).to.deep.equal([
      '012',
    ]);
  });
});
