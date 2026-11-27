import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, screen } from '@mui/internal-test-utils';
import OTPField, { OTPFieldInput } from '@mui/material/OTPField';

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

  it('forwards autofocus, refs, and character state through a custom input render', async () => {
    const inputRef = React.createRef<HTMLInputElement>();
    const firstRef = React.createRef<HTMLInputElement>();
    const { user } = render(
      <form aria-label="Sign in">
        <OTPField label="Code" length={2} name="code" inputRef={inputRef} autoFocus>
          <OTPFieldInput
            ref={firstRef}
            render={(props, state) => <input {...props} data-has-character={state.filled} />}
          />
          <OTPFieldInput />
        </OTPField>
      </form>,
    );

    const first = screen.getByRole('textbox', { name: 'Code' });
    expect(first).to.equal(firstRef.current).and.equal(inputRef.current);
    expect(first).toHaveFocus();

    await user.keyboard('01');
    expect(first).to.have.attribute('data-has-character', 'true');
    expect(first).not.to.have.attribute('data-value');
    expect(new FormData(screen.getByRole<HTMLFormElement>('form')).getAll('code')).to.deep.equal([
      '01',
    ]);
  });
});
